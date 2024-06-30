import { message } from '../controller/email';
import express from 'express';
const router = express.Router();

router.post('/message/:id' , message);

export default router;  

