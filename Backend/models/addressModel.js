import mongoose from "mongoose";
import { _default } from "validator";

const addressSchema = new mongoose.Model({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    street:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    zipcode:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    Phone:{
        type:String,
        required:true,
        unique:true
    },
    Belongto:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

const AddressModel = mongoose.model("Address",addressSchema)

export default AddressModel;