import { comparePasswords } from "../../lib/handleHashing.js"
import { generateToken } from "../../lib/handleTokens.js"
import User from "../../models/User.js"

const loginController = async (req, res) => {
  const data = req.body

  if (!data.username || !data.password) {
    res.status(400).json({
      error: [
        'Username or password is missing'
      ]
    }).end()

    return
  }

  const { username, password } = data


  try {
    const user = await User.findOne({
      username
    }).exec()

    if (!user) {
      res.status(400).json({
        error: [
          'Username or password is incorrect'
        ]
      }).end()

      return
    }

    const isCorrectPassword = await comparePasswords(password, user.password)

    if (!isCorrectPassword) {
      res.status(400).json({
        error: [
          'Username or password is incorrect'
        ]
      }).end()

      return
    }

    const userData = {
      id: user._id,
      avatar: user.avatar,
      name: user.name,
      username: user.username
    }

    const accessToken = await generateToken(userData)

    res.cookie('jwt', accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 15,
      secure: true,
      sameSite: 'None'
    })

    res.status(200).json({
      ...userData
    }).end()
  } catch (error) {
    res.status(500).json({
      error
    })
  }
}

export default loginController