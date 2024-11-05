import Chat from '../../models/Chat.js'

export default async function getAllChatsController(req, res) {
  const user = req.user

  try {
    const chats = await Chat
      .find({ participants: user.id }, '-messages', { sort: { updatedAt: -1 } })
      .populate({
        path: 'participants',
        match: { _id: { $ne: user.id } },
        select: '-password -chats'
      })


    res.status(200).json({
      chats
    })

  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}
