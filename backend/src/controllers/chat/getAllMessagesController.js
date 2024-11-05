import Chat from "../../models/Chat.js"

export default async function getAllMessagesController(req, res) {
  const { chatId } = req.params

  try {
    const chat = await Chat
      .findById(chatId)
      .populate('messages')

    if (!chat) {
      res.status(404).json({
        error: 'Chat not found'
      })

      return
    }

    res.status(200).json({
      messages: chat.messages
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}
