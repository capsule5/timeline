exports.up = (knex, Promise) =>
  knex.schema
    .createTable('users', t => {
      t.increments('id').primary()
      t.string('firstName')
      t.string('lastName')
      t.string('email')
        .unique()
        .notNullable()
      t.string('password').notNullable()
      t.timestamps(false, true)
    })
    .createTable('timelines', t => {
      t.increments('id').primary()
      t.string('title').notNullable()
      t.string('colorBg', 7)
      t.boolean('isPublic')
      t.integer('usersId').unsigned()
      t.foreign('usersId').references('users.id')
      t.timestamps(false, true)
    })
    .createTable('events', t => {
      t.increments('id').primary()
      t.string('title').notNullable()
      t.integer('dateYear')
      t.integer('dateMonth')
      t.integer('dateDay')
      t.integer('dateReliability')
      t.integer('timelinesId').unsigned()
      t.foreign('timelinesId').references('timelines.id')
      t.timestamps(false, true)
    })

exports.down = (knex, Promise) =>
  knex.schema
    .dropTableIfExists('events')
    .dropTableIfExists('timelines')
    .dropTableIfExists('users')
