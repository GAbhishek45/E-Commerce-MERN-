import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [filter, setFilter] = useState(products);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  useEffect(() => {
    let filteredProducts = [...products];

    // Filter by category
    if (category.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        category.includes(product.category)
      );
    }

    // Filter by subCategory
    if (subCategory.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        subCategory.includes(product.subCategory)
      );
    }

    // Filter by search input
    if (showSearch && search) {
      filteredProducts = filteredProducts.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort products
    switch (sortType) {
      case 'low-high':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break; // Keep the original order for 'relevant'
    }

    setFilter(filteredProducts);
  }, [category, subCategory, products, sortType, search, showSearch, products]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTERS <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="Toggle Filters" />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {['Men', 'Women', 'Kids'].map((gender) => (
              <label className='flex gap-2' key={gender}>
                <input
                  className='w-3'
                  type="checkbox"
                  value={gender}
                  onChange={toggleCategory}
                  aria-label={`Filter by category: ${gender}`}
                />
                {gender}
              </label>
            ))}
          </div>
        </div>

        {/* Sub Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {['Topwear', 'Bottomwear', 'Winterwear'].map((type) => (
              <label className='flex gap-2' key={type}>
                <input
                  className='w-3'
                  type="checkbox"
                  value={type}
                  onChange={toggleSubCategory}
                  aria-label={`Filter by type: ${type}`}
                />
                {type}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* Product Sort */}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevant">Sort By: Relevant</option>
            <option value="low-high">Sort By: Low-High</option>
            <option value="high-low">Sort By: High-Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filter.map((item) => (
            <ProductItem key={item._id} id={item._id} name={item.name} image={item.image} price={item.price} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
