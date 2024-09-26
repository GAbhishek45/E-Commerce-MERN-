import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

const PlaceOrder = () => {
  const [selected, setSelected] = useState('cod');

  const {navigate} = useContext(ShopContext)
  return (
    <div>
      <div className='flex flex-col items-center sm:flex-row justify-between gap-6 pt-5 sm:pt-14 min-h-[80vh] border-t w-full sm:w-3/4 mx-auto'>
        {/* Left Side */}
        <div className='flex flex-col gap-6 w-full sm:max-w-[480px]'>
          <div className='text-xl sm:text-2xl font-semibold my-3'>
            <Title text1={'DELIVERY'} text2={'INFORMATION'} />
          </div>

          <div className='flex flex-col gap-4'>
            <div className='flex gap-4'>
              <input className='border border-gray-300 rounded py-2 px-4 w-full' type="text" placeholder='First Name' />
              <input className='border border-gray-300 rounded py-2 px-4 w-full' type="text" placeholder='Last Name' />
            </div>
            <input className='border border-gray-300 rounded py-2 px-4 w-full' type="email" placeholder='Email address' />
            <input className='border border-gray-300 rounded py-2 px-4 w-full' type="text" placeholder='Street' />
            <div className='flex gap-4'>
              <input className='border border-gray-300 rounded py-2 px-4 w-full' type="text" placeholder='City' />
              <input className='border border-gray-300 rounded py-2 px-4 w-full' type="text" placeholder='State' />
            </div>
            <div className='flex gap-4'>
              <input className='border border-gray-300 rounded py-2 px-4 w-full' type="number" placeholder='Zipcode' />
              <input className='border border-gray-300 rounded py-2 px-4 w-full' type="text" placeholder='Country' />
            </div>
            <input className='border border-gray-300 rounded py-2 px-4 w-full' type="tel" placeholder='Phone' />
          </div>
        </div>

        {/* Right Side */}
        <div className='flex flex-col justify-between items-center mt-8 sm:mt-0'>
          <img
            className='max-w-full h-auto rounded-lg shadow-lg'
            src="https://imgs.search.brave.com/YMYCX8r0mv90mQBmEpqEWHf5dt9lOPpy5Tb9OrZOw2E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly81My5m/czEuaHVic3BvdHVz/ZXJjb250ZW50LW5h/MS5uZXQvaHViLzUz/L2h1YmZzL0hpZ2hs/eS1lZmZlY3RpdmUt/b3JkZXItcmV2aWV3/LXBhZ2VzLTEuanBn/P3dpZHRoPTU5NSZo/ZWlnaHQ9NDAwJm5h/bWU9SGlnaGx5LWVm/ZmVjdGl2ZS1vcmRl/ci1yZXZpZXctcGFn/ZXMtMS5qcGc"
            alt="Delivery Illustration"
          />
          
          {/* Payment Method Section */}
          <div className='mt-8'>
            <Title text1={'PAYMENT'} text2={'METHOD'} />
            <div className='flex gap-3 flex-col lg:flex-row'>
              <div onClick={() => setSelected('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${selected === 'stripe' ? 'bg-green-800' : ''}`}></p>
                <img className='h-5 mx-4' src={assets.stripe_logo} alt="Stripe Logo" />
              </div>
              <div onClick={() => setSelected('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${selected === 'razorpay' ? 'bg-green-800' : ''}`}></p>
                <img className='h-5 mx-4' src={assets.razorpay_logo} alt="Razorpay Logo" />
              </div>
              <div onClick={() => setSelected('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${selected === 'cod' ? 'bg-green-800' : ''}`}></p>
                <p>Cash On Delivery (COD)</p>
              </div>
            </div>

            <div className='w-full text-end mt-8'>
              <button onClick={()=>navigate('/orders')} className='bg-black text-white px-16 py-3 text-xs'>CHECKOUT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
