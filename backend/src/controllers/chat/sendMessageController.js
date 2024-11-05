import Chat from '../../models/Chat.js'
import Message from '../../models/Message.js'
import { getReceiverSocketId, io } from '../../sockets/socket.js'


export default async function sendMessageController(req, res) {
  const { chatId } = req.params

  const data = req.body
  const user = req.user

  if (!Object.hasOwn(data, 'message')) {
    res.status(400).json({
      error: 'Message is missing'
    })

    return
  }

  try {
    const chat = await Chat.findById(chatId).exec()

    if (!chat) {
      res.status(400).json({
        error: 'Chat does not exist'
      })

      return
    }


    const receiverId = chat.participants.find((participant) => !participant.equals(user.id))

    const message = new Message({
      senderId: user.id,
      receiverId,
      content: data.message
    })

    chat.messages.push(message._id)

    await Promise.all([
      chat.save(),
      message.save()
    ])

    const { receiverSocketId, userSockets } = getReceiverSocketId(receiverId.toString())


    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', message)
    }

    res.status(201).json({ message })
  } catch (error) {
    console.error({ error })
    res.status(500).json({ error })
  }



}
