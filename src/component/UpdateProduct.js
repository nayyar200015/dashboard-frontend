import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, [])

    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers: {
                'authorization': JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const updateProduct = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: 'put',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': 'application/json',
                'authorization': JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        navigate('/');
    }

    return (
        <div className='product'>
            <h1>Update Product</h1>
            <input
                type="text"
                className='inputBox'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Enter Product Name' />
            <input
                type="text"
                className='inputBox'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder='Enter Product Price' />
            <input
                type="text"
                className='inputBox'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder='Enter Product Category' />
            <input
                type="text"
                className='inputBox'
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder='Enter Product Company' />
            <button onClick={updateProduct} className='btn'>Update Product</button>
        </div>
    );
}

export default UpdateProduct;
