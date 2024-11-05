import Chat from "../../models/Chat.js"
import User from "../../models/User.js"

export default async function getUsersWithoutChatController(req, res) {
  const user = req.user

  try {
    const chats = await Chat.find({ participants: user.id }, '-messages')

    const usersWithChat = chats.map((chat) => {
      return chat.participants.find((part) => !part.equals(user.id))
    })


    const usersWithoutChat = await User.find({ _id: { $nin: [...usersWithChat, user.id] } })

    res.status(200).json({
      users: usersWithoutChat
    })


  } catch (error) {
    res.status(500).json({
      error: 'Internal server error'
    })
  }
}
