import jwt from 'jsonwebtoken'

export const authUser = async(req,res,next) => {
    try {
        const { token } = req.cookies;

        if(!token){
            return res.status(500).json({
                success:false,
                msg:"USer not authenticated"
            })
        }

        

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId = decoded.id;

        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            msg:error.message
        })
    }
}