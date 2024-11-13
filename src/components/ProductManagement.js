import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '' });
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch all products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/products');
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  // Handle adding a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/products', newProduct);
      setNewProduct({ name: '', description: '', price: '' });
      alert('Product added successfully');
      // Reload products after adding
      const response = await axios.get('http://localhost:5001/products');
      setProducts(response.data);
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };

  // Handle deleting a product
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/products/${id}`);
      alert('Product deleted successfully');
      // Reload products after deleting
      const response = await axios.get('http://localhost:5001/products');
      setProducts(response.data);
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  // Handle editing a product
  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5001/products/${editingProduct._id}`, editingProduct);
      alert('Product updated successfully');
      // Reload products after updating
      const response = await axios.get('http://localhost:5001/products');
      setProducts(response.data);
      setEditingProduct(null);
    } catch (err) {
      console.error('Error updating product:', err);
    }
  };

  return (
    <div>
      <h2>Product Management</h2>
      <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}>
        <input
          type="text"
          value={editingProduct ? editingProduct.name : newProduct.name}
          onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, name: e.target.value }) : setNewProduct({ ...newProduct, name: e.target.value })}
          placeholder="Product Name"
        />
        <input
          type="text"
          value={editingProduct ? editingProduct.description : newProduct.description}
          onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, description: e.target.value }) : setNewProduct({ ...newProduct, description: e.target.value })}
          placeholder="Description"
        />
        <input
          type="number"
          value={editingProduct ? editingProduct.price : newProduct.price}
          onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, price: e.target.value }) : setNewProduct({ ...newProduct, price: e.target.value })}
          placeholder="Price"
        />
        <button type="submit">{editingProduct ? 'Update' : 'Add'} Product</button>
      </form>

      <ul>
        {products.map(product => (
          <li key={product._id}>
            <div>{product.name} - ${product.price}</div>
            <button onClick={() => handleEditProduct(product)}>Edit</button>
            <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManagement;
