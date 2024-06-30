// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { Container, Row, Col } from 'react-bootstrap';
import Navigation from './Navbar';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]); // Unused for managing cart items
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    const addToCart = (product) => {
        setCartItems([...cartItems, product]); 
    };
    console.log("items",cartItems)

    const removeFromCart = (productId) => {
        const updatedCartItems = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCartItems);
    };

    return (
        <>
            <Navigation cartItems={cartItems} />
            <Container className="mt-4">
                <h2 className="mb-4">Clothing for Men and Women</h2>
                <Row xs={1} sm={2} md={3} lg={4} xl={4} className="g-4">
                    {products.map(product => (
                        <Col key={product.id}>
                            <ProductCard product={product} addToCart={addToCart} removeFromCart={removeFromCart} cartItems={cartItems} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>

    );
};

export default ProductList;
