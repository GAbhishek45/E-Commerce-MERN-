import {v2 as cloudinary} from 'cloudinary'

const connectCloudinary = async() => {
    cloudinary.config({
        cloud_name:process.env.CLOUD_NAME,
        api_key:process.env.CLOUD_APIKEY,
        api_secret:process.env.CLOUD_API_SECRET
    })
    console.log("Cloud OK")
}
export default connectCloudinary;