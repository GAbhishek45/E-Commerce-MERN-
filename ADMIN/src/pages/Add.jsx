import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = () => {
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Men");
    const [subCategory, setSubCategory] = useState("Topwear");
    const [bestSeller, setBestSeller] = useState(false);
    const [sizes, setSizes] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state

    const handleSizeClick = (size) => {
        setSizes((prev) =>
            prev.includes(size)
                ? prev.filter(item => item !== size)
                : [...prev, size]
        );
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('category', category);
            formData.append('subCategory', subCategory);
            formData.append('bestSeller', bestSeller);
            formData.append('sizes', JSON.stringify(sizes));
            formData.append('image', image);

            const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
                withCredentials: true
            });

            toast.success("Product added successfully!");

            // Clear input fields
            setImage(null);
            setName("");
            setDescription("");
            setPrice("");
            setCategory("Men");
            setSubCategory("Topwear");
            setBestSeller(false);
            setSizes([]);

        } catch (error) {
            toast.error("Failed to add product.");
            console.log(error);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <>
            <form onSubmit={onSubmitHandler}>
                <div>
                    <p>Upload Images</p>
                    <div>
                        <label htmlFor="image" style={{ cursor: 'pointer' }}>
                            <img className='w-24' src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="Upload Area" />
                            <input
                                onChange={(e) => setImage(e.target.files[0])}
                                type="file"
                                id="image"
                                hidden
                                accept="image/*"
                            />
                        </label>
                    </div>
                    <div className='mt-5 w-full'>
                        <p className='mb-2'>Product Name</p>
                        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Enter Product Name' required />
                    </div>

                    <div className='mt-5 w-full'>
                        <p className='mb-2'>Product Description</p>
                        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' placeholder='Write content Here' required />
                    </div>

                    <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                        <div>
                            <p className='mb-2'>Product Category</p>
                            <select onChange={(e) => setCategory(e.target.value)} value={category} className='px-3 py-2'>
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Kids">Kids</option>
                            </select>
                        </div>

                        <div>
                            <p className='mb-2'>Sub Category</p>
                            <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className='px-3 py-2'>
                                <option value="Topwear">Topwear</option>
                                <option value="Bottomwear">Bottomwear</option>
                                <option value="Winter">Winter</option>
                            </select>
                        </div>

                        <div>
                            <p className='mb-2'>Product Price</p>
                            <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='125' />
                        </div>
                    </div>
                </div>

                <div>
                    <p className='mb-2'>Product Sizes:</p>
                    <div className='flex gap-3'>
                        {["S", "M", "L", "XL", "XXL"].map(size => (
                            <div key={size}>
                                <p 
                                    onClick={() => handleSizeClick(size)} 
                                    className={`bg-slate-200 px-3 py-1 cursor-pointer ${sizes.includes(size) ? "bg-blue-500 text-white" : ""}`}
                                >
                                    {size}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='flex gap-2 mt-2'>
                    <input checked={bestSeller} onChange={() => setBestSeller(prev => !prev)} type="checkbox" id="bestSeller" />
                    <label className='cursor-pointer' htmlFor="bestSeller"> Add To Bestseller</label>
                </div>

                <button type='submit' className='w-28 py-3 mt-4 bg-black text-white rounded-md' disabled={loading}>
                    {loading ? 'Uploading...' : 'ADD'}
                </button>
            </form>

            {/* Optional loading spinner can be added here */}
            {loading && <div className="spinner">Loading...</div>}

            {/* Toast container */}
            {/* <ToastContainer /> */}
        </>
    );
}

export default Add;
