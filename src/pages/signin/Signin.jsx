import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useNavigate, NavLink } from 'react-router-dom';

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedData = JSON.parse(localStorage.getItem('userData'));

    if (!storedData || storedData.email !== formData.email || storedData.password !== formData.password) {
      setErrors({ email: 'Invalid email or password' });
    } else {
      alert('Login successful!');
      navigate("/products");
    }
  };

  const handleForgotPassword = () => {
    setShowModal(true);
    setMessage('');
    setErrors({});
  };

  const handleResetPassword = () => {
    const storedData = JSON.parse(localStorage.getItem('userData'));

    if (resetEmail && storedData && storedData.email === resetEmail) {
      setMessage(`A password reset link has been sent to ${resetEmail}`);
      setErrors({});
    } else {
      setErrors({ resetEmail: 'Email not found. Please enter a registered email.' });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="p-4 shadow rounded form-container">
        <h2 className="text-center mb-4">Signin</h2>
        <Form.Group controlId="formEmail">
          <Form.Label>Email *</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password *</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100 mt-3">
          Signin
        </Button>
        <p className="mt-3 text-center">
          Don't have an account? <NavLink to="/">Register</NavLink>
        </p>
        <p className="mt-3 text-center">
          <Button variant="link" onClick={handleForgotPassword}>
            Forgot Password?
          </Button>
        </p>
      </Form>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message ? (
            <p>{message}</p>
          ) : (
            <Form.Group controlId="formResetEmail">
              <Form.Label>Enter your registered email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                isInvalid={!!errors.resetEmail}
              />
              <Form.Control.Feedback type="invalid">{errors.resetEmail}</Form.Control.Feedback>
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          {!message && (
            <Button variant="primary" onClick={handleResetPassword}>
              Reset Password
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Signin;
