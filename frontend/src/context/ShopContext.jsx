import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = `$`;
    const deliveryFee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token,setToken] = useState('');

    const addToCart = (itemId, size) => {
        let cartData = structuredClone(cartItems);

        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
        setCartItems(cartData);
    };

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);


    const navigate = useNavigate();

    const getProductData = async () => {
        try {
            const res = await axios.get(`${backendUrl}/api/product/list`);
            if (res.data.success) {
                setProducts(res.data.products);
            } else {
                toast.error("Products not found");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch products.");
        }
    };

    useEffect(() => {
        getProductData();
    }, []);

    useEffect(()=>{
        if(!token && localStorage.getItem('token')) setToken(localStorage.getItem('token'))
    },[])

    const value = {
        products, currency, deliveryFee, search, setSearch, showSearch, setShowSearch, cartItems, addToCart, navigate, backendUrl,token,setToken
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
