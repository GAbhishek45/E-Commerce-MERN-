import mongoose from "mongoose"

export const DBCONNECT = async() =>{
    try {
       await  mongoose.connect(process.env.MONGO_URL)
       console.log("Mongo Connected!")
    } catch (error) {
        console.log("Err in DB Connection"+error)
    }
}
