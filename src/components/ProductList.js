import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products from the backend API
        axios.get('http://localhost:5001/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    return (
        <div>
            <h2>Product List</h2>
            {products.length > 0 ? (
                products.map(product => (
                    <div key={product._id}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <p>Category: {product.category}</p>
                    </div>
                ))
            ) : (
                <p>No products available</p>
            )}
        </div>
    );
}

export default ProductList;
