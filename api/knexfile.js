module.exports = {
  development: {
    client: 'mysql',
    connection: {
      user: 'root',
      password: '',
      database: 'timeline_db',
    },
    migrations:{
      directory:'./database/migrations',
    },
  },
}
