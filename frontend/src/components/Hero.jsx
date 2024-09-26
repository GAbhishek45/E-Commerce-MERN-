import React from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
      {/* Left Side */}
      <div className='w-full sm:w-1/2 flex flex-col items-center justify-center py-10 sm:py-0 px-4'>
        <div className='text-[#414141]'>
          <div className='flex items-center gap-2 mb-3'>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
          </div>
          <h1 className='prata text-[5rem] sm:text-[6rem] lg:text-5xl leading-relaxed text-center'>Latest Arrivals</h1>
          <div className='flex items-center gap-2 mt-5'>
            <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
            <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <img src={assets.hero_img} className='w-full sm:w-1/2 object-cover' alt="Hero" />
    </div>
  );
}

export default Hero;
