exports.up = (knex, Promise) =>
  knex.schema
    .createTable('users', t => {
      t.increments('id').primary()
      t.string('first_name')
      t.string('last_name')
      t.string('email')
        .unique()
        .notNullable()
      t.string('password')
        .unique()
        .notNullable()
      t.timestamps(false, true)
    })
    .createTable('timelines', t => {
      t.increments('id').primary()
      t.string('title').notNullable()
      t.string('color_bg', 7)
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

exports.down = (knex, Promise) =>
  knex.schema
    .dropTableIfExists('events')
    .dropTableIfExists('timelines')
    .dropTableIfExists('users')
