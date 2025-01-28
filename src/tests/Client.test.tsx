import { render } from '@testing-library/react';
import fireEvent from '@testing-library/user-event';
import Client from '@/pages/Client';
import { Product } from '@/types';
import userEvent from '@testing-library/user-event';

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Product 1',
    description: 'This is a description for Product 1.',
    price: 20,
    currency: 'USD',
    image: '/path/to/image.jpg',
    rating: 4.5,
  },
  {
    id: 2,
    title: 'Product 2',
    description: 'This is a description for Product 2.',
    price: 30,
    currency: 'USD',
    image: '/path/to/image2.jpg',
    rating: 3.5,
  },
];

describe('Client Component', () => {
  test('renders products correctly', () => {
    const { getByText } = render(<Client products={mockProducts} />);
    expect(getByText(/Product 1/)).toBeInTheDocument();
    expect(getByText(/Product 2/)).toBeInTheDocument();
  });

  test('filters products based on search input', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<Client products={mockProducts} />);
    const searchInput = getByPlaceholderText(/Search products.../i);
    const user = userEvent.setup();

    await user.type(searchInput, 'Product 1');

    expect(getByText(/Product 1/)).toBeInTheDocument();
    expect(queryByText(/Product 2/)).toBeNull();
  });

  test('sorts products by price', async () => {
    const { getByRole, getByText } = render(<Client products={mockProducts} />);
    const sortSelect = getByRole('combobox');
    const user = userEvent.setup();

    await user.selectOptions(sortSelect, 'price');

    expect(getByText('$20.00')).toBeInTheDocument();
  });

  test('displays stars for product rating', () => {
    const { getByText, getAllByText } = render(<Client products={mockProducts} />);
    expect(getByText(/★/)).toBeInTheDocument();
    expect(getAllByText(/★/).length).toBeGreaterThan(0);
  });

  test('loads more products on button click', () => {
    const { getByText } = render(<Client products={mockProducts} />);
    const loadMoreButton = getByText(/Load More/);

    expect(loadMoreButton).toBeInTheDocument();
    fireEvent.click(loadMoreButton);
  });
});
