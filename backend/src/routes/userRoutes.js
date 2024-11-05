import { Router } from "express"
import getUsersWithoutChatController from "../controllers/user/getUsersWithoutChatController.js"
import verifyAuthMiddleware from "../middlewares/verifyAuthMiddleware.js"

const router = Router()

router.get('/no-chat', verifyAuthMiddleware, getUsersWithoutChatController)

export default router
