import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className='bg-gray-50 py-10'>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
        <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
          <img className='w-full md:max-w-[480px] rounded-lg shadow-lg' src={assets.contact_img} alt="Contact Us" />
          <div className='flex flex-col justify-center items-start gap-4'>
            <p className='font-semibold text-xl text-gray-800'>Our Store</p>
            <p className='text-blue-600 font-medium'>123 Forever Lane</p>
            <p className='text-blue-600 font-medium'>City, State, 12345</p>
            <p className='text-gray-600'>Email: <span className='text-blue-600'>support@forever.com</span></p>
            <p className='text-gray-600'>Phone: <span className='text-blue-600'>(123) 456-7890</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
