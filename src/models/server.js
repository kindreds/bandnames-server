const http = require('http')
const cors = require('cors')
const express = require('express')
const socketio = require('socket.io')
const Sockets = require('./sockets')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT ?? 8080
    this.server = http.createServer(this.app)
    this.io = socketio(this.server, {
      /** configs */
    })
  }

  middlewares() {
    // CORS
    this.app.use(cors())
  }

  configSockets() {
    const sockets = new Sockets(this.io)
    sockets.events()
  }

  start() {
    this.middlewares()
    this.configSockets()
    this.server.listen(this.port, () => {
      console.log('Server running on port: ', this.port)
    })
  }
}

module.exports = Server
