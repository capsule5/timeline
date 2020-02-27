const { execSync } = require('child_process')

execSync('nodemon ./index.js --exec \"node -r babel-register\"',
{ stdio: 'inherit' })