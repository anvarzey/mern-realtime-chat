
export default async function logoutController(req, res) {
  const token = req.cookies.jwt

  if (token) {
    res.cookie('jwt', '', { maxAge: 0 })

  } else {
    res.status(500).end()
  }
  res.status(200).end()

}