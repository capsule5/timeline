const { execSync } = require('child_process')
const path = require('path')

console.log('Current directory:', __dirname)
const binPath = path.resolve('./node_modules/.bin')
console.log(binPath)


execSync(binPath+'/nodemon ./index.js --exec \"node -r babel-register\"', { stdio: 'inherit' })