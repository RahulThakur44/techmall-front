import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch('http://localhost:5000/api/products');
    const data = await res.json();
    setProducts(data);
  };

  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' });
    fetchProducts(); // refresh after delete
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>All Products</h2>
      <Link to="/add">➕ Add Product</Link>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <Link to={`/product/${p.id}`}>{p.name}</Link> – ₹{p.price}
            <button onClick={() => deleteProduct(p.id)}>❌</button>
            <Link to={`/edit/${p.id}`}>✏️</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
