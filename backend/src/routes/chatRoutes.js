import { Router } from 'express'
import createChatController from '../controllers/chat/createChatController.js'
import verifyAuthMiddleware from '../middlewares/verifyAuthMiddleware.js';
import getAllChatsController from '../controllers/chat/getAllChatsController.js';
import sendMessageController from '../controllers/chat/sendMessageController.js';
import getAllMessagesController from '../controllers/chat/getAllMessagesController.js';

const router = Router()

router.get('/', verifyAuthMiddleware, getAllChatsController)
router.post('/', verifyAuthMiddleware, createChatController)

router.get('/:chatId', verifyAuthMiddleware, getAllMessagesController)
router.post('/:chatId', verifyAuthMiddleware, sendMessageController)


export default router