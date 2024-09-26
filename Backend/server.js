    import express from 'express'
    import cors from 'cors'
    import "dotenv/config"
    import { DBCONNECT } from './config/DBConnection.js'
    import connectCloudinary from './config/clodinary.js'
    import userRouter from './routes/userRoute.js'
    import productRouter from './routes/productRoute.js'
    import fileUpload from 'express-fileupload'
import cookieParser from 'cookie-parser'
import cartrouter from './routes/cartRoute.js'

    // App config
    const app = express()
    const PORT = process.env.PORT || 8080



    // Db Connection
    DBCONNECT()
    connectCloudinary()

    // middlewares
    app.use(express.json())
    const corsOptions = {
        credentials: true,
        origin: [
            "http://localhost:5174",
            "http://localhost:5173"
        ]
    };
    
    app.use(cors(corsOptions));
    app.use(fileUpload({
        useTempFiles : true,
        tempFileDir : '/tmp/'
    }));
    app.use(cookieParser())

    // App endpoints
    app.use('/api/user',userRouter)
    app.use('/api/product',productRouter)
    app.use('/api/cart',cartrouter)


    // Api endpoint
    app.get("/",(req,res)=>{
        res.send("API working")
    })


    // Listen to the port
    app.listen(PORT,()=>console.log("Sever is running "+PORT))