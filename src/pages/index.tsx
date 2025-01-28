import { GetServerSideProps } from 'next';
import Client from './Client';
import { Product } from '@/types';
import { useDispatch } from 'react-redux';
import { setProducts } from '@/store/productsSlice';

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch('http://127.0.0.1:5000/products');
  const products = await response.json();

  return {
    props: {
      products,
    },
  };
};

const Home = ({ products }: { products: Product[] }) => {
  const dispatch = useDispatch();
  dispatch(setProducts(products));
  return (
    <div>
      <Client products={products} />
    </div>
  );
};

export default Home;
