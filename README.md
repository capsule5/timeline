# QuickStart
#### webapp
Install dependencies
```sh
cd webapp
yarn
```

Launch server
```sh
yarn start
```

#### API 
Install dependencies
```sh
cd api
yarn
```
Launch server
```sh
yarn server
```

#### database 
Run migrations:
```sh
cd api/database
knex migrate:latest  
```
More commands:
```sh
knex --help
```

# Todo Api
- [ ] logger (morgan)
- [ ] seeder
- [ ] handle errors 
- [ ] notFoundController
- [ ] graphQl
- [ ] JWT auth (https://www.youtube.com/watch?v=TcwngmeqLRk)

# Todo Webapp
- [ ] update event
- [ ] flow

# Todo Global
- [ ] continuous integ
- [ ] nginx


# Sources
#### backend
- https://hackernoon.com/setting-up-node-js-with-a-database-part-1-3f2461bdd77f
- https://steemit.com/graphql/@alien35/creating-a-scalable-api-using-node-graphql-mysql-and-knex
- https://devhints.io/knex
- https://github.com/robmclarty/knex-express-project-sample

#### frontend
- https://github.com/maprihoda/react-redux-crud

# HELPERS
```sh
curl -X POST -H "Content-Type: application/json" -d '{"title":"new event"}' http://localhost:3003/api/events
```