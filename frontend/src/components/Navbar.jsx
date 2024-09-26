import React, { useContext, useEffect, useState } from 'react';
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const { setShowSearch, showSearch, cartItems, token, setToken } = useContext(ShopContext);
    const [profileVisible, setProfileVisible] = useState(false);
    const navigate = useNavigate();

    const Logout = () => {
        localStorage.removeItem('token');
        setToken('');
        navigate('/login');
        toast.success("User LoggedOut successfully");
    };

    useEffect(() => {
        console.log(showSearch);
    }, [showSearch]);

    const handleSearchClick = () => {
        setShowSearch(prev => !prev); // Toggle search visibility
    };

    const handleProfileClick = () => {
        setProfileVisible(prev => !prev); // Toggle profile dropdown visibility
    };

    const navLinks = [
        { to: '/', text: 'HOME' },
        { to: '/collection', text: 'COLLECTION' },
        { to: '/about', text: 'ABOUT' },
        { to: '/contact', text: 'CONTACT' }
    ];

    const calculateTotalItems = (cartItems) => {
        return Object.values(cartItems).reduce((total, sizes) => {
            return total + Object.values(sizes).reduce((subTotal, qty) => subTotal + qty, 0);
        }, 0);
    };

    const totalItems = calculateTotalItems(cartItems);

    return (
        <div className='flex items-center justify-between py-5 font-medium'>
            <Link to='/'>
                <img src={assets.logo} className='w-36' alt="Logo" />
            </Link>

            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                {navLinks.map(link => (
                    <NavLink key={link.to} to={link.to} className="flex flex-col items-center gap-1">
                        <p>{link.text}</p>
                        <hr className='hidden w-2/4 border-none h-[1.5px] bg-gray-700' />
                    </NavLink>
                ))}
            </ul>

            <div className='flex items-center gap-6'>
                <img
                    onClick={handleSearchClick}
                    className='w-5 cursor-pointer'
                    src={assets.search_icon}
                    alt="Search Icon"
                />

                <div className='relative'>
                    <img
                        onClick={handleProfileClick}
                        className='w-5 cursor-pointer'
                        src={assets.profile_icon}
                        alt="Profile Icon"
                    />
                    {profileVisible && token && (
                        <div className='absolute right-0 pt-4 bg-slate-100 text-gray-500 rounded shadow-lg'>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5'>
                                <Link to='/profile' className='cursor-pointer hover:text-black'>My Profile</Link>
                                <Link to='/orders' className='cursor-pointer hover:text-black'>Orders</Link>
                                <p onClick={Logout} className='cursor-pointer hover:text-black'>Logout</p>
                            </div>
                        </div>
                    )}
                </div>

                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5' alt="Cart Icon" />
                    {totalItems > 0 && (
                        <div className='absolute right-[-5px] bottom-[-5px] w-4 h-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
                            {totalItems}
                        </div>
                    )}
                </Link>

                <img
                    onClick={() => setVisible(true)}
                    src={assets.menu_icon}
                    className='w-5 cursor-pointer sm:hidden'
                    alt="Menu Icon"
                />
            </div>

            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-300 ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="Back" />
                        <p>Back</p>
                    </div>
                    {navLinks.map(link => (
                        <NavLink
                            key={link.to}
                            onClick={() => setVisible(false)}
                            className='py-2 pl-6 border'
                            to={link.to}
                        >
                            {link.text}
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
