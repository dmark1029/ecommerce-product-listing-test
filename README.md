# E-Commerce Product Listing Page

This project is an e-commerce product listing page built using **Next.js**, **Tailwind CSS**, **Redux**, and **TypeScript**. It demonstrates the following:

- Fetching data from a JSON API
- Displaying product data in a responsive grid layout
- Implementing sorting, filtering, and pagination
- Managing state with Redux
- Server-side rendering (SSR) with SEO metadata
- Adding products to a shopping cart
- Writing tests with Jest and React Testing Library

## Requirements

1. Use the latest version of Next.js to create a new project.
2. Set up Tailwind CSS for styling.
3. Fetch product data from a provided JSON API endpoint.
4. Create a product listing page that displays products with:
   - Product image
   - Product name
   - Product description (truncate to 100 characters)
   - Price (formatted with currency)
   - Rating (display using stars or a numerical value)
5. Implement pagination or infinite scroll (initially showing 10 products per page).
6. Implement a search bar to filter products by title (case-insensitive).
7. Implement sorting functionality for products (by price or rating).
8. Add a shopping cart functionality with product count and total price.
9. Set up **Redux** for state management.
10. Implement a responsive design using **Tailwind CSS**.
11. Code should be clean, modular, and maintainable.
12. Use **Git** for version control and provide the GitHub repository.

### Clone the repository

git clone https://github.com/dmark1029/ecommerce-product-listing-test.git

cd ecommerce-product-listing-test

npm install

### In order to fetch data from db.json, you need to run this first

npm run json-server

### After running JSON server, you can run the application

npm run dev

### The app should now be running at http://localhost:3000