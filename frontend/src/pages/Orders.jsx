import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const Orders = () => {
  const {products,currency} = useContext(ShopContext)
  return (
    <div className='bordert-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div>
        {
          products.slice(1,4).map((item,index)=>{
              return <div key={index} className='py-4 border-t  border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                  <div className='flex items-start gap-4 text-xs '>
                      <img className='w-16  sm:w20 ' src={item.image} alt="" />
                      <div>
                        <p className='sm:text-base font-medium'>{item.name}</p>
                        <div className='flex  items-center gap-3 mt-2 text-gray-700'>
                          <p className='text-lg '>{currency}{item.price}</p>
                          <p className=''>Quantity:1</p>
                          <p>Size : M</p>
                        </div>
                        <p className='mt-2'>Date <span className='text-gray-400  '>25 july,2024</span></p>
                      </div>
                  </div>
                  <div className='md:1/2 flex justify-between '>
                    <div className='flex items-center gap-2'>
                      <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                      <p className='text-sm md:text-base '>Ready to ship</p>
                    </div>
                   
                  </div>
                  <button className='border px-4 py-2 text-sm font-medium rounded-sm '>Track Order</button>
              </div>
          })
        }
      </div>
    </div>
  )
}

export default Orders