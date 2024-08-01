import React from 'react';

const CustomerItem = ({ customer, editCustomer, deleteCustomer }) => {
  return (
    <div className="customer-item">
      <h3>{customer.fullName}</h3>
      <p>PAN: {customer.pan}</p>
      <p>Email: {customer.email}</p>
      <p>Mobile: {customer.mobile}</p>
      {customer.addresses.map((address, index) => (
        <div key={index}>
          <p>{address.line1}, {address.line2}, {address.city}, {address.state}, {address.postcode}</p>
        </div>
      ))}
      <button className="edit" onClick={() => editCustomer(customer)}>Edit</button>
      <button onClick={() => deleteCustomer(customer.pan)}>Delete</button>
    </div>
  );
};

export default CustomerItem;
