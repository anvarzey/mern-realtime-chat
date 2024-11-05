
const verifyNotAuthMiddleware = async (req, res, next) => {

  if (Object.hasOwn(req.cookies, 'jwt')) {
    res.status(401).end()
    return
  }

  next()
}

export default verifyNotAuthMiddleware