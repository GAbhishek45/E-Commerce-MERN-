import { v2 as cloudinary} from 'cloudinary'
import Product from '../models/productModel.js';

// import { v2 as cloudinary } from 'cloudinary';

export const AddProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;
        const image = req.files?.image;

        if (!image) {
            return res.status(400).json({
                success: false,
                msg: "An image must be uploaded."
            });
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(image.tempFilePath);
        const imageUrl = cloudinaryResponse.secure_url;

        const productData = new Product({
            name,
            description,
            price,
            category,
            subCategory,
            sizes,
            bestSeller,
            image: imageUrl,
            date:parseInt(Date.now())
        });

        await productData.save();

        res.status(200).json({
            success: true,
            msg: "Product added successfully",
            productData
        });

    } catch (error) {
        console.error("Error in adding product:", error.message);
        res.status(500).json({
            success: false,
            msg: "Error in adding product"
        });
    }
};





export const ListProduct = async(req,res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({
            success:true,
            products
        })
    } catch (error) {
        console.log("Error in listing product"+error.message)
        res.status(500).json({
            success:false,
            msg:"Error in Listing product"
        })
    }
}


export const RemoveProduct = async(req,res) => {
    try {
        const {id} = req.params;

       const my =  await Product.findByIdAndDelete(id)
       if(my){
        res.status(200).json({
            success:true,
            msg:"Product deleted successfully"
        })
       }else{
        return res.status(500).json({
            success:false,
            msg:"Product can't deleted successfully"
        })
       }

        
    } catch (error) {
        console.log("Error in Removing product"+error.message)
        res.status(500).json({
            success:false,
            msg:"Error in removing product"
        })
    }
}

export const SingleProduct = async(req,res) => {
    try {
        const {id} = req.params;
       const product =  await Product.findById(id)

        res.status(200).json({
            success:true,
            msg:"Product fetched successfully",
            product
        })
    } catch (error) {
        console.log("Error in Getting single product"+error.message)
        res.status(500).json({
            success:false,
            msg:"Error in getting single product"
        })
    }
}