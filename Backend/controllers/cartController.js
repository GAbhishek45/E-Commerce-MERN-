import User from "../models/userModel.js";


export const addtoUserCart = async(req,res) => {
    try {
        const {userId,itemId,size} = req.body;

        const userData = await User.findById(userId)
        const cartData = await userData.cartData;

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }else{
                cartData[itemId][size] = 1;
            }
        }else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

       const newUser =  await User.findByIdAndUpdate(userId,{cartData})

        res.status(200).json({
            success:true,
            msg:"Products Added successfully",
            newUser
        })
    } catch (error) {
        console.log(error)
        return res.status(402).json({
            success:false,
            msg:"Cannot added to cart"
        })
    }
}

export const updateCart = async(req,res) => {
    // try {
    //     const {use}
    // } catch (error) {
    //     console.log(error)
    //     return res.status(402).json({
    //         success:false,
    //         msg:"Cannot added to cart"
    //     })
    // }
}   

export const getUserCart = async(req,res) => {
    try {
        const {userId} = req.body;
        const userData = await User.findById(userId)
        const cartData = await userData.cartData;

        res.status(200).json({
            success:true,
            msg:"Products Added successfully",
            cartData
        })
        
    } catch (error) {
        console.log(error)
        return res.status(402).json({
            success:false,
            msg:"Cannot added to cart"
        })
    }
}