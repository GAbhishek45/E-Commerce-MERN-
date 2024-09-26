import axios from 'axios';
import React, { useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [error, setError] = useState(""); // State to hold error messages

    const submitHandler = async (e) => {
        e.preventDefault();
        setError(""); // Reset error before new request
        try {
            const res = await axios.post(`${backendUrl}/api/user/admin`, { email, password },{withCredentials:true});
            console.log(res);

            // Assuming the token is in res.data.token
            if (res.data.token) {
                toast.success(res.data.msg)
                setToken(res.data.token);
                localStorage.setItem("token",res.data.token)
                // Set the token in parent component
                
            }else{
                toast.error(res.data.msg)
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.msg)
            setError("Login failed. Please check your credentials."); // Set error message
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
                <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
                <form onSubmit={submitHandler}>
                    {error && <p className='text-red-500 mb-2'>{error}</p>} {/* Display error message */}
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-500 mb-2'>Email Address</p>
                        <input 
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email} 
                            className='rounded w-full px-3 py-2 border border-grey-300 outline-none' 
                            type="email" 
                            placeholder='your@gmail.com' 
                            required 
                        />
                    </div>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-500 mb-2'>Password</p>
                        <input 
                            onChange={(e) => setPass(e.target.value)} 
                            value={password} 
                            className='rounded w-full px-3 py-2 border border-grey-300 outline-none' 
                            type="password" 
                            placeholder='myPass' 
                            required 
                        />
                    </div>
                    <button 
                        type='submit' 
                        className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black'>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
