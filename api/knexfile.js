import dotenv from 'dotenv'
dotenv.config()

module.exports = {
  client: 'mysql',
  connection: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  migrations: {
    directory: './database/migrations',
  },
  seeds: {
    directory: './database/seeds',
  },
}
