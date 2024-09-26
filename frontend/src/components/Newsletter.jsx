import React from 'react'

const Newsletter = () => {
    const onSubmitHander = (e) => {
        e.preventDefault()
        
    }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-700 '>Subscribe now and get 20% Off</p>
        <p className='text-gray-400 mt-3 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque excepturi quod aliquid.</p>
        <form onSubmit={onSubmitHander} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full sm:flex-1 outline-none ' type="email" placeholder='Enter Your Email' required/>
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>Subscribe</button>
        </form>
    </div>
  )
}

export default Newsletter