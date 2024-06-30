import register from '../../controllers/AUTH/auth';
import login from '../../controllers/AUTH/login';
import { verifyToken, protectedRoute } from '../../middlewares/refresh';
import express from 'express';
const router = express.Router();
router.post('/signup', register, login);
router.post('/signin', login);
//router.post('/signout' , register)
router.get('/refresh', verifyToken, protectedRoute);
export default router;
