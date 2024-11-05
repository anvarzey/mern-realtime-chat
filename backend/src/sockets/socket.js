import { Server } from 'socket.io'
import http from 'http'
import express from 'express'

export const app = express()

export const server = http.createServer(app)

export const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST']
  },
  // connectionStateRecovery: {
  //   // the backup duration of the sessions and the packets
  //   maxDisconnectionDuration: 2 * 60 * 1000,
  //   // whether to skip middlewares upon successful recovery
  //   skipMiddlewares: true,
  // }
  // cookie: {
  //   name: "io",
  //   httpOnly: true,
  //   sameSite: "None"
  // }
})

const userSockets = {}

export const getReceiverSocketId = (receiverId) => {
  return {
    receiverSocketId: userSockets[receiverId],
    userSockets
  }
}

io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId

  if (socket.recovered) {
    console.log('RECONNECTED')
  }


  if (userId !== 'undefined') {
    userSockets[userId] = socket.id
  }

  io.emit('getOnlineUsers', Object.keys(userSockets))

  socket.on('disconnect', () => {

    delete userSockets[userId]

    io.emit('getOnlineUsers', Object.keys(userSockets))
  })
})
