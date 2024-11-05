import Chat from "../../models/Chat.js"
import User from "../../models/User.js"

const createChatController = async (req, res) => {
  if (!Object.hasOwn(req.body, 'userId')) {
    res.status(400).end()
    return
  }

  const recipientId = req.body.userId
  const user = req.user

  try {
    // -------- CHECK IF USER IS SAME AS RECIPIENT --------
    if (user.id === recipientId) {
      res.status(400).end()

      return
    }

    const recipient = await User.findById(recipientId, '-password -chats').exec()

    // -------- CHECK IF RECIPIENT EXISTS --------
    if (!recipient) {
      res.status(400).end()

      return
    }

    // -------- CHECK IF CHAT ALREADY EXISTS --------
    const chatExists = await Chat.findOne({
      participants: {
        $all: [
          user.id,
          recipientId
        ]
      }
    }).exec()

    if (chatExists) {
      res.status(400).end()

      return
    }

    // -------- CREATE CHAT --------
    const newChat = new Chat({
      participants: [
        user.id,
        recipientId
      ]
    })

    await newChat.save()

    newChat.participants = [recipient]

    res.status(200).json({
      chat: newChat
    })

  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}

export default createChatController