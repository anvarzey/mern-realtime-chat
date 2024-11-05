import User from "../../models/User.js"
import { forbiddenError } from "../../utils/errors.js"

const verifyAccessTokenController = async (req, res) => {
  const user = req.user

  try {

    const userIsInDb = await User.findById(user.id)

    if (!userIsInDb) {
      forbiddenError(res)

      return
    }
    res.status(200).json({
      user
    }).end()
  } catch (error) {
    res.status(500).end()
  }

}

export default verifyAccessTokenController