# What?
A timeline of events

# How?
- Frontend: React / Redux Saga / Formik
- Backend: Node / Express / Objection / Knex
- DB: MySQL

# QuickStart
#### Webapp
```sh
cd webapp
```
Install dependencies
```sh
yarn
```

Launch server
```sh
yarn start
```

#### API 
```sh
cd api
```
Install dependencies
```sh
yarn
```
Launch server
```sh
yarn server
```

#### Database 
```sh
cd api
```
Run migrations:
```sh
knex migrate:latest  
```

Seed db:
```sh
knex seed:run  
```

More commands:
```sh
knex --help
```
