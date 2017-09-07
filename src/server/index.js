const Hapi = require('hapi')
const path = require('path')
const bcrypt = require('bcryptjs')
const sessions = require('hapi-server-session')


const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './src/urban-trails-info.sqlite3'
  },
  useNullAsDefault: true
})
// Create a server with a host and port
const server = new Hapi.Server()

server.connection({
  host: 'localhost',
  port: 8000,
})


server.register({
  register: sessions,
  options: {
    cookie: {
      isSecure: false,
    },
  },
}, (err) => { if (err) { throw err } })

// Add the route
server.register(require('inert'), (err) => {
  if (err) {
    throw err
  }

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: path.join(__dirname, '../client/')
      }
    }
  })
})

server.route({
  method: 'GET',
  path: '/session',
  handler: (request, reply) => {
    if (request.session.user) {
      reply(request.session.user)
    } else {
      reply(null).code(404)
    }
  }
})

server.route({
  method: 'POST',
  path: '/signup',
  handler: (request, reply) => {
    // check if user exists
    knex('users').where({ email: request.payload.email })
      .then((exist) => {
        if (!exist.length) {
          // add user if it doesn't exist
          const hash = bcrypt.hashSync(request.payload.password, 8)
          knex('users').insert({ email: request.payload.email, phone: request.payload.phone, password: hash })
            .then((num) => {
              // search for user to return
              knex('users').where({ id: num[0] })
                .then((user) => {
                  request.session.user = user[0]
                  reply(request.session.user)
                })
                .catch((error) => {
                  console.log(error)
                })
            })
            .catch((error) => {
              console.log(error)
            })
        } else {
          reply('Email already in use').code(409)
        }
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
})

server.route({
  method: 'POST',
  path: '/signin',
  handler: (request, reply) => {
    // check if user exists
    knex('users').where({ email: request.payload.email })
      .then((user) => {
        if (user.length && bcrypt.compareSync(request.payload.password, user[0].password)) {
          request.session.user = user[0]
          reply(request.session.user)
        } else {
          reply('Email or password doesn\'t match').code(404)
        }
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
})

server.route({
  method: 'GET',
  path: '/logout',
  handler: (request, reply) => {
    request.session = null
    reply(null).code(200)
  }
})

server.route({
  method: 'GET',
  path: '/kiosks',
  handler: {
    file: {
      path: path.join(__dirname, '../client/data/bCycleKiosks.json')
    }
  }
})

server.route({
  method: 'GET',
  path: '/racks',
  handler: {
    file: {
      path: path.join(__dirname, '../client/data/bikeRacks.json')
    }
  }
})

server.route({
  method: 'GET',
  path: '/fixits',
  handler: {
    file: {
      path: path.join(__dirname, '../client/data/fixit.json')
    }
  }
})

server.route({
  method: 'GET',
  path: '/trails',
  handler: {
    file: {
      path: path.join(__dirname, '../client/data/AustinTrails.geojson')
    }
  }
})

server.route({
  method: 'POST',
  path: '/report',
  handler: (request, reply) => {
    knex('reports').insert({ report_type: request.payload.reportType, report_data: request.payload.reportContent, coordinates: request.payload.position, userid: request.payload.userid })
      .then((report) => {
        reply(report)
      })
      .catch((error) => {
        console.log(error)
      })
  }
})

// Start the server
server.start((err) => {
  if (err) {
    throw err
  }
  console.log('Server running at:', server.info.uri)
})
