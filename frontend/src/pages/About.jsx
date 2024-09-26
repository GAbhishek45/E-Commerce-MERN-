import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
        
    </div>
    <div className='my-10 flex flex-col items-center md:flex-row gap-16'>
      <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
      <div className='flex flex-col justify-center gap-4 md:w-2/4 text-gray-600'>
        <p>Welcome to Forever, your ultimate destination for curated, high-quality products that elevate your lifestyle. Founded on the principles of quality, affordability, and exceptional customer service, we strive to bring you a seamless shopping experience from the comfort of your home. Our diverse selection spans various categories, including fashion, home essentials, electronics, and more, ensuring there’s something for everyone</p>
        <p>At Forever, we believe that shopping should be enjoyable and hassle-free. Our user-friendly website is designed with you in mind, making it easy to browse, compare, and purchase your favorite items. Our dedicated customer support team is always ready to assist you, ensuring your questions and concerns are addressed promptly.</p>
        <b className='text-gray-900'>Our Mission</b>
        <p>Our mission at Forever is to create a seamless shopping experience by offering a curated selection of quality products that empower our customers to express their unique style, all while prioritizing exceptional service and sustainability.</p>
      </div>
    </div>
    </div>

  )
}

export default About