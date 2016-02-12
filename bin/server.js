require('babel-register')
var https = require('https')
var fs = require('fs')

const config = require('../config')
const server = require('../server/main')
const debug = require('debug')('app:bin:server')

const port = config.server_port
const host = config.server_host

var options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
}

https.createServer(options, server.callback()).listen(port)
// https(server).listen(port)
debug(`Server is now running at ${host}:${port}.`)
