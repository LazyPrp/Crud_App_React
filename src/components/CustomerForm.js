import React, { useState } from 'react';
import axios from 'axios';

const CustomerForm = ({ addCustomer }) => {
  // Customer state
  const [customer, setCustomer] = useState({
    pan: '',
    fullName: '',
    email: '',
    mobile: '',
    addresses: [{ line1: '', line2: '', postcode: '', city: '', state: '' }]
  });
  // Error state for validation
  const [errors, setErrors] = useState({});

  // Handling input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleAddressChange = (index, e) => {
    const { name, value } = e.target;
    const addresses = [...customer.addresses];
    addresses[index][name] = value;
    setCustomer({ ...customer, addresses });
  };

  // Validation functions
  const validatePan = (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  const validatePostcode = (postcode) => {
    const postcodeRegex = /^[1-9][0-9]{5}$/;
    return postcodeRegex.test(postcode);
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};
    if (!validatePan(customer.pan)) {
      newErrors.pan = 'Invalid PAN format';
    }
    if (!customer.fullName) {
      newErrors.fullName = 'Full Name is required';
    }
    if (!customer.email) {
      newErrors.email = 'Email is required';
    }
    if (!customer.mobile) {
      newErrors.mobile = 'Mobile number is required';
    }
    customer.addresses.forEach((address, index) => {
      if (!validatePostcode(address.postcode)) {
        newErrors[`postcode-${index}`] = 'Invalid postcode format';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      addCustomer(customer);
      setCustomer({
        pan: '',
        fullName: '',
        email: '',
        mobile: '',
        addresses: [{ line1: '', line2: '', postcode: '', city: '', state: '' }]
      });
      setErrors({});
    }
  };

  // Add new address field
  const addAddress = () => {
    if (customer.addresses.length < 10) {
      setCustomer({
        ...customer,
        addresses: [...customer.addresses, { line1: '', line2: '', postcode: '', city: '', state: '' }]
      });
    }
  };

  // Verify PAN using API
  const verifyPan = async () => {
    if (validatePan(customer.pan)) {
      const response = await axios.post('https://lab.pixel6.co/api/verify-pan.php', { panNumber: customer.pan });
      if (response.data.isValid) {
        setCustomer({ ...customer, fullName: response.data.fullName });
      }
    } else {
      setErrors({ ...errors, pan: 'Invalid PAN format' });
    }
  };

  // Fetch postcode details using API
  const fetchPostcodeDetails = async (index) => {
    const addresses = [...customer.addresses];
    if (validatePostcode(addresses[index].postcode)) {
      const response = await axios.post('https://lab.pixel6.co/api/get-postcode-details.php', { postcode: addresses[index].postcode });
      addresses[index].city = response.data.city[0].name;
      addresses[index].state = response.data.state[0].name;
      setCustomer({ ...customer, addresses });
      setErrors({ ...errors, [`postcode-${index}`]: '' });
    } else {
      setErrors({ ...errors, [`postcode-${index}`]: 'Invalid postcode format' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="pan"
        value={customer.pan}
        onChange={handleChange}
        onBlur={verifyPan}
        placeholder="PAN"
        required
      />
      {errors.pan && <span>{errors.pan}</span>}
      <input
        type="text"
        name="fullName"
        value={customer.fullName}
        onChange={handleChange}
        placeholder="Full Name"
        required
      />
      {errors.fullName && <span>{errors.fullName}</span>}
      <input
        type="email"
        name="email"
        value={customer.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      {errors.email && <span>{errors.email}</span>}
      <input
        type="text"
        name="mobile"
        value={customer.mobile}
        onChange={handleChange}
        placeholder="Mobile Number"
        required
      />
      {errors.mobile && <span>{errors.mobile}</span>}

      {customer.addresses.map((address, index) => (
        <div key={index}>
          <input
            type="text"
            name="line1"
            value={address.line1}
            onChange={(e) => handleAddressChange(index, e)}
            placeholder="Address Line 1"
            required
          />
          <input
            type="text"
            name="line2"
            value={address.line2}
            onChange={(e) => handleAddressChange(index, e)}
            placeholder="Address Line 2"
          />
          <input
            type="text"
            name="postcode"
            value={address.postcode}
            onChange={(e) => handleAddressChange(index, e)}
            onBlur={() => fetchPostcodeDetails(index)}
            placeholder="Postcode"
            required
          />
          {errors[`postcode-${index}`] && <span>{errors[`postcode-${index}`]}</span>}
          <input type="text" name="city" value={address.city} placeholder="City" readOnly />
          <input type="text" name="state" value={address.state} placeholder="State" readOnly />
        </div>
      ))}

      <button type="button" onClick={addAddress}>Add Address</button>
      <button type="submit">Save Customer</button>
    </form>
  );
};

export default CustomerForm;
