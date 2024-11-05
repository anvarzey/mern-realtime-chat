import { hashPassword } from '../../lib/handleHashing.js'
import { generateToken } from "../../lib/handleTokens.js"
import User from '../../models/User.js'
import createAvatar from '../../utils/createAvatar.js'

const signUpController = async (req, res) => {
  const data = req.body
  const errors = []

  if (!data.name) {
    errors.push('Name is missing')
  }

  if (!data.username) {
    errors.push('Username is missing')
  }

  if (!data.password) {
    errors.push('Password is missing')
  }

  if (!data.confirmPassword) {
    errors.push('Confirm password is missing')
  }

  if (data.password && data.confirmPassword) {
    if (data.password !== data.confirmPassword) {
      errors.push('Passwords must match')
    }
  }

  if (errors.length > 0) {
    res.status(400).json({
      error: errors
    })

    return
  }

  try {
    const hashedPassword = await hashPassword(data.password)

    const usernameExists = await User.findOne({
      username: data.username
    }).exec()

    if (usernameExists !== null) {
      res.status(400).send({
        error: [
          'Username already exists'
        ]
      })

      return
    }

    const avatar = createAvatar(data.name)

    const newUser = await User.create({
      name: data.name,
      username: data.username,
      password: hashedPassword,
      avatar
    })

    const userData = {
      id: newUser._id,
      avatar: newUser.avatar,
      name: newUser.name,
      username: newUser.username
    }

    const accessToken = await generateToken(userData)

    res.cookie('jwt', accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 15,
      secure: true,
      sameSite: 'None'
    })

    res.status(201).json({
      ...userData
    }).end()
  } catch (error) {
    console.log({ error })
    res.status(500).json({
      error
    })
  }
}

export default signUpController
