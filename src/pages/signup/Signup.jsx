import React, { useState } from 'react';
import { Form, Button, Col, Row, InputGroup } from 'react-bootstrap';
import { NavLink, useNavigate } from "react-router-dom";
import './Signup.css'; // Assuming you have defined your custom styles in Signup.css

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    country: '',
    state: '',
    city: '',
    pincode: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState({});

  const countries = [
    { name: 'USA', states: ['California', 'Texas', 'Florida'] },
    { name: 'India', states: ['Maharashtra', 'Karnataka', 'Gujarat'] },
  ];

  const cityData = {
    California: ['Los Angeles', 'San Francisco'],
    Texas: ['Houston', 'Dallas'],
    Florida: ['Miami', 'Orlando'],
    Maharashtra: ['Mumbai', 'Pune'],
    Karnataka: ['Bangalore', 'Mysore'],
    Gujarat: ['Ahmedabad', 'Surat'],
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setFormData({ ...formData, country: selectedCountry, state: '', city: '' });
    const countryStates = countries.find((c) => c.name === selectedCountry)?.states || [];
    setStates(countryStates);
    setCities([]);
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData({ ...formData, state: selectedState, city: '' });
    const stateCities = cityData[selectedState] || [];
    setCities(stateCities);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {


    const newErrors = {};
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const mobileRegex = /^[0-9]{10}$/;
    if (!formData.firstName) newErrors.firstName = 'Please enter first name.';
    if (!formData.lastName) newErrors.lastName = 'Please enter last name.';
    if (!formData.email) newErrors.email = 'Please enter a valid email.';
    if (!formData.address) newErrors.address = 'Please enter a valid address.';
    if (!formData.country) newErrors.country = 'Please select your country.';
    if (!formData.state) newErrors.state = 'Please select your state.';
    if (!formData.city) newErrors.city = 'Please select your city.';
    if (!formData.pincode) newErrors.pincode = 'Please enter valid pincode.';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'conformPassword should same as password';
    if (!formData.mobile || !mobileRegex.test(formData.mobile))
      newErrors.mobile = 'Please enter a valid 10-digit mobile number.';

    if (!formData.password || !passwordRegex.test(formData.password))
      newErrors.password = 'Password must be at least 8 characters, contain at least one number and one uppercase letter.';

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords must match.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Simulate storing user data in localStorage
      localStorage.setItem('userData', JSON.stringify(formData));
      alert('Registration successful!');
      navigate("/signin")
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 shadow rounded form-container">
      <h2 className="text-center mb-4">Signup</h2>
      <Row>
        <Col md={6}>
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name *</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              isInvalid={!!errors.firstName}
            />
            <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formLastName">
            <Form.Label>Last Name *</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              isInvalid={!!errors.lastName}
            />
            <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
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
      <Form.Group controlId="formAddress">
        <Form.Label>Address *</Form.Label>
        <Form.Control
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          isInvalid={!!errors.address}
        />
        <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
      </Form.Group>
      <Row>
        <Col md={6}>
          <Form.Group controlId="formCountry">
            <Form.Label>Country *</Form.Label>
            <Form.Control
              as="select"
              name="country"
              value={formData.country}
              onChange={handleCountryChange}
              isInvalid={!!errors.country}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.name} value={country.name}>
                  {country.name}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formState">
            <Form.Label>State *</Form.Label>
            <Form.Control
              as="select"
              name="state"
              value={formData.state}
              onChange={handleStateChange}
              isInvalid={!!errors.state}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group controlId="formCity">
            <Form.Label>City *</Form.Label>
            <Form.Control
              as="select"
              name="city"
              value={formData.city}
              onChange={handleChange}
              isInvalid={!!errors.city}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formPincode">
            <Form.Label>Pincode *</Form.Label>
            <Form.Control
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
              isInvalid={!!errors.pincode}
            />
            <Form.Control.Feedback type="invalid">{errors.pincode}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group controlId="formMobile">
            <Form.Label>Mobile Number *</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                isInvalid={!!errors.mobile}
              />
            </InputGroup>
            <Form.Control.Feedback type="invalid">{errors.mobile}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
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
        </Col>
      </Row>
      <Form.Group controlId="formConfirmPassword">
        <Form.Label>Confirm Password *</Form.Label>
        <Form.Control
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          isInvalid={!!errors.confirmPassword}
        />
        <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit" className="w-100 mt-3">
        Register
      </Button>
      <p className="mt-3 text-center">
        Already have an account?
        <NavLink to="/signin">Login</NavLink>
      </p>
    </Form>
  );
};

export default Signup;
