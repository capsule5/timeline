const { execSync } = require('child_process')

execSync('./node_modules/.bin/nodemon ./index.js --exec \"node -r babel-register\"',
{ stdio: 'inherit' })