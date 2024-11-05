import express from 'express'
import { connectToMongo, disconnectToMongo } from './database/mongo.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import chatRoutes from './routes/chatRoutes.js'
import userRoutes from './routes/userRoutes.js'

import { app, server } from './sockets/socket.js'

dotenv.config()

const APP_URL = process.env.APP_URL

app.use(express.json())
app.use(cors({
  origin: APP_URL,
  credentials: true
}))
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/user', userRoutes)

const PORT = process.env.PORT ?? 4000

server.listen(PORT, async () => {
  await connectToMongo()
  console.log(`Server is running on port ${PORT}`)
})

server.on('close', async () => {
  await disconnectToMongo()
})
