export const forbiddenError = (res, msg) => {
  if (msg !== undefined) {
    res.status(403).json({
      error: msg
    }).end()
  }

  res.status(403).end()
}