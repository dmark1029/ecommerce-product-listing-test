import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/productsSlice';

interface ClientProps {
  products: Product[];
}

const Client = ({ products = [] }: ClientProps) => {
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>(products.slice(0, 10));
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const dispatch = useDispatch();

  const { totalItems, totalPrice } = useSelector((state: any) => state.products);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const loadMoreProducts = () => {
    const newPage = page + 1;
    setPage(newPage);
    const start = newPage * 10 - 10;
    const end = start + 10;
    setDisplayedProducts(products.slice(0, end));
  };

  const filteredProducts = displayedProducts
    .filter((product) => product.title.toLowerCase().includes(searchTerm))
    .sort((a, b) => {
      if (sortOption === 'price') return a.price - b.price;
      if (sortOption === 'rating') return b.rating - a.rating;
      return 0;
    });

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(price);
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    return (
      <>
        {Array(fullStars).fill(<span className="text-yellow-500">★</span>)}
        {halfStar && <span className="text-yellow-500">★</span>}
        {Array(5 - Math.ceil(rating)).fill(<span className="text-gray-300">★</span>)}
      </>
    );
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="mt-10">
      <div className="fixed top-0 left-0 right-0 bg-blue-500 text-white p-4 flex items-center z-10">
        <span
          className="transition-transform duration-500 ml-2">
          Cart:
        </span>
        <span
          className={`transition-transform duration-500 ml-2 ${isAnimating ? 'scale-150 text-red-500' : 'scale-100'
            }`}
        >
          {`${totalItems}`}
        </span>
        <span className='transition-transform duration-500 ml-2'>
          item(s) -
        </span>
        <span
          className={`transition-transform duration-500 ml-2 ${isAnimating ? 'scale-150 text-red-500' : 'scale-100'
            }`}
        >
          {`${formatPrice(totalPrice, 'USD')}`}
        </span>

      </div>

      <div className="pt-20">
        <p className='text-3xl text-black text-center font-bold'>E-commerce Product Listing Page</p>
        <div className="flex flex-col md:flex-row items-center gap-4 p-4 rounded shadow-md">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full md:w-auto border px-4 py-2 rounded-lg shadow-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            onChange={handleSearch}
          />
          <select
            className="w-full md:w-auto border px-4 py-2 rounded-lg shadow-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            value={sortOption}
            onChange={(e) => {
              const selectedOption = e.target.value;
              if (selectedOption === '') {
                setSortOption('');
                setDisplayedProducts(products.slice(0, page * 10));
              } else {
                setSortOption(selectedOption);
              }
            }}
          >
            <option value="">Sort by</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </div>



        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={200}
                className="mb-2 flex m-auto"
              />
              <h2 className="text-lg font-bold text-black px-8">{product.title}</h2>
              <p className="text-sm text-gray-500 px-8">
                {product.description.length > 100 ? `${product.description.slice(0, 100)}...` : product.description}
              </p>
              <div className="flex justify-between items-center mt-2 px-8">
                <span className="font-semibold text-black">{formatPrice(product.price, product.currency)}</span>
                <div className="flex items-center">{renderStars(product.rating)}</div>
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-full w-full"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {displayedProducts.length < products.length && (
          <button
            className="flex bg-blue-500 text-white px-4 py-2 rounded m-auto mb-10"
            onClick={loadMoreProducts}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Client;
