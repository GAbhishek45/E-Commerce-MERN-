import express from 'express'
import {addtoUserCart,getUserCart,updateCart} from '../controllers/cartController.js'
import { authUser } from '../middlewares/auth.js';
const cartrouter = express.Router();


cartrouter.get('/getCartProducts',authUser,getUserCart)
cartrouter.post('/add',authUser,addtoUserCart)
// cartrouter.post('/update',authUser,updateCart)

export default cartrouter;