exports.up = (knex, Promise) =>
  knex.schema
    .createTable('stories', t => {
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
      t.integer('stories_id').unsigned()
      t.foreign('stories_id').references('stories.id')
      t.timestamps(false, true)
    })
exports.down = (knex, Promise) => knex.schema.dropTableIfExists('events').dropTableIfExists('stories')
