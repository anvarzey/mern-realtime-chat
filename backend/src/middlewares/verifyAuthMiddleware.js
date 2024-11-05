import { verifyToken } from '../lib/handleTokens.js'
import { forbiddenError } from '../utils/errors.js'

const verifyAuthMiddleware = async (req, res, next) => {

  const accessToken = req.cookies.jwt

  const payload = await verifyToken(accessToken)


  if (Object.hasOwn(payload, 'error')) {
    forbiddenError(res, payload.error)

    return

  }

  req.user = payload

  next()
}

export default verifyAuthMiddleware