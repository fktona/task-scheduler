import { Router } from 'express';
import login from '../../controllers/AUTH/login';
const router = Router();
router.post('/login', login);
module.exports = router;
