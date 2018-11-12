# What?
A timeline of events

# QuickStart
### Webapp
Install depedencies
```sh
cd webapp && yarn
```
Launch server
```sh
yarn start
```

### API 
Install dependencies
```sh
cd api && yarn
```
Launch server
```sh
yarn start
```

### Database 
MySQL must be installed and running!
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

