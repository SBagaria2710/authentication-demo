import { Router } from 'express'
import { tokenLogin, tokenLogout, tokenHealth } from '../controllers/token-login.js'
import authenticate from '../middlewares/authenticate.js'


const router = Router();
//TODO change this to post
router.get('/login', tokenLogin)

router.get('/logout', tokenLogout)

router.get('/health', authenticate, tokenHealth)


export default router;
