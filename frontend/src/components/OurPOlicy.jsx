import React from 'react'
import { assets } from '../assets/assets'

const OurPOlicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
        <div>
            <img src={assets.exchange_icon} className='w-12 m-auto mb-3' alt="" />
            <p className='font-semibold'>Easy Exchange Policy</p>
            <p className='text-gray-400 '>We Offer hassle free exchange policy </p>
        </div>

        <div>
            <img src={assets.quality_icon} className='w-12 m-auto mb-3' alt="" />
            <p className='font-semibold'>High Quality Products</p>
            <p className='text-gray-400 '>We are only Sell high Quality matrial </p>
        </div>

        <div>
            <img src={assets.support_img} className='w-12 m-auto mb-3' alt="" />
            <p className='font-semibold'>Best Customer Support</p>
            <p className='text-gray-400 '>Customer Support 24 X 7</p>
        </div>
    </div>
  )
}

export default OurPOlicy