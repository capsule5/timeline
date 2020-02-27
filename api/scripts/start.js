const { execSync } = require('child_process')
const path = require('path')

const rootPath = path.join(__dirname, '../')
const binPath = path.join(__dirname, '../node_modules/.bin')
const nodemon = binPath+'/nodemon'
const babelnode = binPath+'/babel-node '
const index  = rootPath+'index.js'

console.log({ nodemon,babelnode,index })

execSync(`${nodemon} --exec ${babelnode} ${index}`, { stdio: 'inherit' })