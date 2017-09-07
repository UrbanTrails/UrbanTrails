exports.up = function up(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', (table) => {
      table.increments('id')
      table.text('email')
      table.text('phone')
      table.text('password')
      table.text('affirmations')
    }),
    knex.schema.createTableIfNotExists('reports', (table) => {
      table.increments('id')
      table.text('report_type')
      table.text('report_data')
      table.text('coordinates')
      table.timestamp('created_at')
      table.text('userid').references('id').inTable('users')
    })
  ])
}

exports.down = function down(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('reports'),
    knex.schema.dropTableIfExists('mentions')
  ])
}
