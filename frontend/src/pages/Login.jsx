import React, { useState, useContext,useEffect } from 'react';
import { ShopContext } from './../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure CSS for Toastify is imported

const Login = () => {
  const [current, setCurrent] = useState('Login');
  const { token,setToken, navigate, backendUrl } = useContext(ShopContext);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    try {
      let res;
      if (current === 'Sign Up') {
        res = await axios.post(`${backendUrl}/api/user/register`, { name, email, password }, {
          withCredentials: true,
        });
      } else {
        res = await axios.post(`${backendUrl}/api/user/login`, { email, password }, {
          withCredentials: true,
        });
      }

      if (res.data.success) {
        setToken(res.data.token);
        toast.success("User Authenticated!");
        localStorage.setItem('token', res.data.token);
        navigate('/'); // Redirect to home or another route after successful login
      } else {
        toast.error(res.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error(res.data.msg); // User-friendly error message
    } finally {
      setLoading(false); // Set loading to false after the request
    }
  };

  useEffect(()=>{
    if(token) navigate('/')
  },[])

  useEffect(()=>{
    if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'))
    }
  },[])

  return (
    <form onSubmit={onSubmit} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata text-3xl'>{current}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {current === 'Login' ? '' : 
        <input 
          onChange={(e) => setName(e.target.value)} 
          value={name} 
          type="text" 
          className='w-full px-3 py-2 rounded border border-gray-800' 
          placeholder='Name' 
          required 
        />
      }
      <input 
        onChange={(e) => setEmail(e.target.value)} 
        type="email" 
        value={email} 
        className='w-full px-3 py-2 rounded border border-gray-800' 
        placeholder='Email' 
        required 
      />
      <input 
        onChange={(e) => setPassword(e.target.value)} 
        type="password" 
        value={password} 
        className='w-full px-3 py-2 rounded border border-gray-800' 
        placeholder='Password' 
        required 
      />
      <div className='w-full flex justify-between text-sm mt-[18px]'>
        <p className='text-blue-600 cursor-pointer'>Forgot Your Password?</p>
        {current === 'Login'
          ? <p onClick={() => setCurrent('Sign Up')} className='cursor-pointer'>Create account</p>
          : <p onClick={() => setCurrent('Login')} className='cursor-pointer'>Login here</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4' disabled={loading}>
        {loading ? 'Loading...' : (current === 'Login' ? 'Sign In' : 'Sign Up')}
      </button>
    </form>
  );
};

export default Login;
