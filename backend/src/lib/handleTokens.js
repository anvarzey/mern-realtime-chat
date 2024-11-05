import jwt from 'jsonwebtoken'

export const generateToken = async (data) => {
  const { ACCESS_TOKEN_SECRET } = process.env

  const accessToken = await jwt.sign(data, ACCESS_TOKEN_SECRET, { expiresIn: '7d' })

  return accessToken
}

export const verifyToken = async (token) => {
  const { ACCESS_TOKEN_SECRET } = process.env

  try {
    const result = await jwt.verify(token, ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        return {
          error: err.message

        }
      }

      return payload
    })

    return result

  } catch (error) {
    return {
      error
    }
  }
}