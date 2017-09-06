const Hapi = require('hapi')
const path = require('path')

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
  path: '/kiosks',
  handler: {
    file: {
      path: path.join(__dirname, '../client/data/bCycleKiosks.json')
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
  path: '/pothole',
  handler: (request, reply) => {
    console.log('Req body', request.payload)
    knex('reports').insert({ report_type: 'pothole', report_data: 'pothole', coordinates: request.payload.position, userid: request.payload.userid })
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
