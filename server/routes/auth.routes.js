import express from 'express'
import {RegisterUser,LoginUser,currentUser} from '../controllers/auth.controller.js'
import {authendicateToken} from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/register', RegisterUser)
router.post('/login', LoginUser)
router.get('/me', authendicateToken, currentUser)

export default router