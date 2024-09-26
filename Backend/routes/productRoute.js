 import express from 'express'
 import {AddProduct,RemoveProduct,SingleProduct,ListProduct} from '../controllers/productController.js'
import upload from '../middlewares/multer.js'
import { adminAuth } from '../middlewares/adminAuth.js';

 const productRouter = express.Router()

 productRouter.post('/add',adminAuth, AddProduct);
 productRouter.delete('/remove/:id',RemoveProduct)
 productRouter.get('/single/:id',SingleProduct)
 productRouter.get('/list',ListProduct)



 export default productRouter