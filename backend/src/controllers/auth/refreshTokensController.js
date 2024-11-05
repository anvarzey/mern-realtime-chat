import { forbiddenError } from '../../utils/errors.js'
import { generateToken, verifyToken } from '../../lib/handleTokens.js'
import { REFRESH_TOKEN } from '../../utils/constants.js'

export default async function refreshTokensController(req, res) {
  const token = req.cookies.jwt

  if (!token) {
    forbiddenError(res)

    return
  }

  try {
    const isValidToken = await verifyToken({
      token,
      type: REFRESH_TOKEN
    })

    if (!isValidToken) {
      res.clearCookie('jwt')
      forbiddenError(res)

      return
    }

    const { iat, exp, ...userData } = isValidToken

    const { accessToken, refreshToken } = await generateToken(userData)

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 15,
      secure: true,
      sameSite: 'None'
    })

    res.status(200).json({
      accessToken,
      ...userData
    }).end()

  } catch (error) {

    console.log({ error })

    res.status(500).json({
      error
    })
  }

}
