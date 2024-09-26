import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = () => {
  const [list,setList] = useState([])

  const fetchList = async() => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`)
      console.log(res.data.products);
      
      if(res.data.success){
        setList(res.data.products)  
        toast.success("Products fetched successfully")
      }
    } catch (error) {
      toast.error("Products not fetched successfully")
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchList()   
  },[])

  const handleRemove = async(id) => {
     try {
        const res = await axios.delete(backendUrl+`/api/product/remove/${id}`)
        console.log(res);
        
        if(res.data.success){
          toast.success("Product deleted successfully")
          await fetchList()
        }else{
          toast.error("Product not deleted ")
        }
     } catch (error) {
      console.log("Error in deletin the product"+error)
      toast.error("Error in deleting the product")

     }
  }
  return (
    <div>
      <p className='mb-2 '>All Products List</p>
      <div className='flex flex-col gap-2 '>
        {/* list table title */}

        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm '>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* product list */}
        {
          list.map((item,index)=>{
            return <div key={index} className='grid items-center grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-2 px-1 py-2 border text-sm  ' >
              <img className='w-12' src={item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              
              <p>{`${currency}${item.price}`}</p>

              <p className='text-right md:text-center cursor-pointer text-lg ' onClick={()=>handleRemove(item._id)}>X</p>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default List