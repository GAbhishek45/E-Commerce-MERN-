import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='w-full text-gray-800 bg-slate-200 flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm p-6'>
      <div>
        <img className='mb-5 w-32' src={assets.logo} alt="Logo" />
        <p className='text-gray-800'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit quis suscipit alias exercitationem perspiciatis repellendus omnis autem, amet eveniet. Repellat, quas iusto fugit minima reprehenderit accusantium natus laboriosam.
        </p>
      </div>
      <div>
        <p className='font-bold mb-2'>FOREVER</p>
        <ul className='text-gray-800'>
          <li>About Us</li>
          <li>Careers</li>
          <li>Privacy Policy</li>
          <li>Terms of Service</li>
        </ul>
      </div>
      <div>
        <p className='font-bold mb-2'>CONTACT</p>
        <ul className='text-gray-800'>
          <li>Email: support@forever.com</li>
          <li>Phone: (123) 456-7890</li>
          <li>Follow Us</li>
          <li>
            <a href="#" className='text-blue-400 hover:underline'>Facebook</a>
            <a href="#" className='text-blue-400 hover:underline ml-2'>Twitter</a>
            <a href="#" className='text-blue-400 hover:underline ml-2'>Instagram</a>
          </li>
        </ul>
      </div>
      <div className='text-center mt-10 col-span-3'>
        <p className='text-gray-600'>&copy; {new Date().getFullYear()} Forever. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
