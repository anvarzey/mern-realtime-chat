import { Router } from 'express'
import signUpController from '../controllers/auth/signUpController.js'
import loginController from '../controllers/auth/loginController.js';
import logoutController from '../controllers/auth/logoutController.js';
import verifyNotAuthMiddleware from '../middlewares/verifyNotAuthMiddleware.js';
import verifyAuthMiddleware from '../middlewares/verifyAuthMiddleware.js';
import verifyAccessTokenController from '../controllers/auth/verifyAccessTokenController.js';
import refreshTokensController from '../controllers/auth/refreshTokensController.js';

const router = Router();

router.post('/login', verifyNotAuthMiddleware, loginController)
router.post('/signup', verifyNotAuthMiddleware, signUpController);

router.get('/token/verify-access', verifyAuthMiddleware, verifyAccessTokenController)
// router.get('/token/refresh', refreshTokensController)

router.get('/logout', logoutController)

export default router
