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

# Todo Api
- [ ] logger (morgan)
- [ ] seeder
- [ ] handle errors 
- [ ] notFoundController
- [ ] ...

# Todo Webapp
- [ ] ...

# Sources
#### backend
- https://hackernoon.com/setting-up-node-js-with-a-database-part-1-3f2461bdd77f
- https://steemit.com/graphql/@alien35/creating-a-scalable-api-using-node-graphql-mysql-and-knex
- https://devhints.io/knex

#### frontend

# HELPERS
```sh
curl -X POST -H "Content-Type: application/json" -d '{"title":"new event"}' http://localhost:3003/api/events
```