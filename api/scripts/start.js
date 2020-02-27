const { execSync } = require('child_process')
const path = require('path')

const binPath = path.join(__dirname, '../node_modules/.bin')
console.log('binPath:', binPath)


execSync(binPath+'/nodemon ./index.js --exec \"node -r babel-register\"', { stdio: 'inherit' })