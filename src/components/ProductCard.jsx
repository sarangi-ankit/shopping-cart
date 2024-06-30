// src/components/ProductCard.js
import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';

const ProductCard = ({ product, addToCart, removeFromCart, cartItems }) => {
  const [inCart, setInCart] = useState(false);
  const [quantity, setQuantity] = useState(1); // Initialize quantity with 1

  // Check if product is already in cart when cartItems changes
  useEffect(() => {
    if (cartItems && cartItems.find(item => item.id === product.id)) {
      const cartItem = cartItems.find(item => item.id === product.id);
      setQuantity(cartItem.quantity); // Set quantity to existing cart item's quantity
      setInCart(true);
    } else {
      setInCart(false);
    }
  }, [cartItems, product.id]);

  const handleAddToCart = () => {
    if (!inCart) {
      addToCart({ ...product, quantity }); // Add quantity to product object
      setInCart(true);
    } else {
      removeFromCart(product.id); 
      setInCart(false);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
    };
    // console.log("items",cartItems)
  console.log("quantity",quantity)
  return (
    <Card className="shadow-lg">
      <Card.Img variant="top" src={product.image} style={{ height: '250px', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title className="h6">{product.title}</Card.Title>
        <Card.Text>
          <span className="text-muted">{product.category}</span>
          <br />
          <strong className="text-success">Rs {product.price}</strong> 
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <Button variant="outline-secondary" className="me-2" onClick={decrementQuantity}>-</Button>
              <Button variant="outline-secondary" className="me-2" onClick={incrementQuantity}>+</Button>
            </div>
            <Button variant={inCart ? "danger" : "primary"} onClick={handleAddToCart}>
              {inCart ? "Remove from Cart" : "Add to Cart"}
            </Button>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
