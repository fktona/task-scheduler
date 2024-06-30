import { Router } from 'express'
import  login  from '../../controllers/AUTH/login'

const router:Router = Router()

router.post('/login' , login)

module.exports = router