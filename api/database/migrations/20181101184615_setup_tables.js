exports.up = (knex, Promise) =>
  knex.schema
    .createTable('timelines', t => {
      t.increments('id').primary()
      t.string('title').notNullable()
      t.timestamps(false, true)
    })
    .createTable('events', t => {
      t.increments('id').primary()
      t.string('title').notNullable()
      t.integer('date_year')
      t.integer('date_month')
      t.integer('date_day')
      t.integer('date_reliability')
      t.integer('timelines_id').unsigned()
      t.foreign('timelines_id').references('timelines.id')
      t.timestamps(false, true)
    })
exports.down = (knex, Promise) => knex.schema.dropTableIfExists('events').dropTableIfExists('timelines')
