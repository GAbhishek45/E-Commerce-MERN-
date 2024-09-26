import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { toast } from 'react-toastify';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [sizes, setSizes] = useState('');

  const fetchProduct = () => {
    const foundProduct = products.find((product) => product._id === productId);
    if (foundProduct) {
      setProductData({
        ...foundProduct,
        sizes: JSON.parse(foundProduct.sizes[0]) // Parse the sizes string to an array
      });
    }
  };

  const addtocartProduct = () => {
    if (sizes === "") {
      toast.error("Please select at least one size");
    } else {
      addToCart(productData._id, sizes);
      toast.success("Product added to cart");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId, products]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 flex-col sm:flex-row'>
        {/* Product Image */}
        <div className='w-full sm:w-[50%] h-[700px]'>
          <img
            className='w-full h-full object-contain rounded-lg'
            src={productData.image}
            alt={productData.name}
          />
        </div>
        {/* Additional Product Details */}
        <div className='flex-1'>
          <h1 className='text-2xl font-medium mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_dull_icon} alt="" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-2 text-gray-400 w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {
                productData.sizes.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSizes(item)}
                    className={`border px-3 py-2 bg-gray-200 ${item === sizes ? 'border-orange-500' : 'border-gray-300'}`}
                  >
                    {item}
                  </button>
                ))
              }
            </div>
          </div>
          <button onClick={addtocartProduct} className='bg-black text-white px-3 py-2 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-3 sm:w-4/5' />
          <div className='text-sm text-gray-700 mt-5 flex flex-col gap-1'>
            <p>100% Original Product</p>
            <p>Cash on delivery is available on this Product</p>
            <p>Easy return and Exchange policy within 7 Days.</p>
          </div>
        </div>
      </div>

      {/* Description and review section */}
      <div className='mt-20'>
        <div className='flex'>
          <p className='border px-3 py-2 text-sm'>Description</p>
          <p className='border px-3 py-2 text-sm'>Reviews(122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-700'>
          <p>An e-commerce website is a digital platform that facilitates online buying and selling of goods and services.</p>
          <p>E-commerce websites play a vital role in modern retail, offering convenience and accessibility to consumers while providing businesses with a powerful platform to grow and engage with their audiences. As technology continues to evolve, e-commerce is set to become an even more integral part of the shopping experience.</p>
        </div>
      </div>

      {/* Related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className='text-center'>
      <span className='text-2xl'>404</span> Product Not Found
    </div>
  );
};

export default Product;

