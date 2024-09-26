import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const Cart = () => {
  const { products, currency, cartItems, setCartItems,navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = []; 
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          tempData.push({
            _id: itemId,
            size: size,
            quantity: cartItems[itemId][size],
          });
        }
      }
    }
    setCartData(tempData); // Set the cart data state
  }, [cartItems]);

  const removeItem = (itemId, size) => {
    const updatedCartItems = { ...cartItems };
    if (updatedCartItems[itemId] && updatedCartItems[itemId][size]) {
      delete updatedCartItems[itemId][size];
      if (Object.keys(updatedCartItems[itemId]).length === 0) {
        delete updatedCartItems[itemId]; // Remove the item if no sizes left
      }
      setCartItems(updatedCartItems);
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartData.reduce((total, item) => {
      const productData = products.find((product) => product._id === item._id);
      return productData ? total + (productData.price * item.quantity) : total;
    }, 0);
  };

  const total = calculateTotal();

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      <div>
        {cartData.length > 0 ? (
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            return productData ? ( // Ensure productData exists
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img className='w-16 sm:w-20' src={productData.image} alt={productData.name} />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <p className='text-xs text-gray-500'>Size: {item.size}</p>
                    <p className='text-xs text-gray-500'>Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className='text-lg font-semibold'>{currency}{(productData.price * item.quantity).toFixed(2)}</div>
                <div className='flex items-center justify-center cursor-pointer text-red-500' onClick={() => removeItem(item._id, item.size)}>
                  <span className='text-sm'>Remove</span>
                </div>
              </div>
            ) : null; // Render nothing if productData is not found
          })
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      {cartData.length > 0 && (
        <div className='mt-4 text-lg font-bold'>
          Total: {currency}{total.toFixed(2)}
        </div>
      )}


      <div className={`w-full text-end ${total > 0 ? 'block' : 'hidden'}`}>
          <button onClick={()=>navigate('/place-order')} className='bg-black text-white my-8 px-8 py-3'>PLACE ORDER</button>

      </div>
    </div>
  );
}

export default Cart;
