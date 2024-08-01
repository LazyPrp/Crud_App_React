import React, { useState } from 'react';
import CustomerForm from './components/CustomerForm';
import CustomerList from './components/CustomerList';
import './index.css';

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);

  // Add customer to list
  const addCustomer = (customer) => {
    setCustomers([...customers, customer]);
  };

  // Edit customer in list
  const editCustomer = (customer) => {
    setEditingCustomer(customer);
  };

  // Update customer in list
  const updateCustomer = (updatedCustomer) => {
    const updatedCustomers = customers.map((customer) =>
      customer.pan === updatedCustomer.pan ? updatedCustomer : customer
    );
    setCustomers(updatedCustomers);
    setEditingCustomer(null);
  };

  // Delete customer from list
  const deleteCustomer = (pan) => {
    const updatedCustomers = customers.filter((customer) => customer.pan !== pan);
    setCustomers(updatedCustomers);
  };

  return (
    <div className="container">
      <h1>Customer Management</h1>
      <CustomerForm addCustomer={addCustomer} />
      <CustomerList customers={customers} editCustomer={editCustomer} deleteCustomer={deleteCustomer} />
      {editingCustomer && (
        <CustomerForm customer={editingCustomer} addCustomer={updateCustomer} />
      )}
    </div>
  );
};

export default App;