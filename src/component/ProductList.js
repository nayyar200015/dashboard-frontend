import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products', {
            headers: {
                'authorization': JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        setProducts(result);
    }

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: 'Delete',
            headers: {
                'authorization': JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        result && getProducts();
    }

    const handleSearch = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers: {
                    'authorization': JSON.parse(localStorage.getItem('token'))
                }
            });
            result = await result.json();
            result && setProducts(result);
        } else getProducts();
    }

    return (
        <div className='product-list'>
            <h3>Product List</h3>
            <input
                type="text"
                className='searchProductBox'
                placeholder='Seach Product'
                onChange={handleSearch} />
            <ul>
                <li>S. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            {
                products.length > 0 ? products.map((item, index) => {
                    return (
                        <ul key={index}>
                            <li>{index + 1}</li>
                            <li>{item.name}</li>
                            <li>$ {item.price}</li>
                            <li>{item.category}</li>
                            <li>{item.company}</li>
                            <li>
                                <button onClick={() => deleteProduct(item._id)}>Delete</button>
                                <Link to={`/update/${item._id}`}>Update</Link>
                            </li>
                        </ul>
                    )
                }) : <h3>No Product found</h3>
            }
        </div>
    );
}

export default ProductList;