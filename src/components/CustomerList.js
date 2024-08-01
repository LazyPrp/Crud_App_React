import React from 'react';
import CustomerItem from './CustomerItem';

const CustomerList = ({ customers, editCustomer, deleteCustomer }) => {
  return (
    <div>
      {customers.map((customer) => (
        <CustomerItem
          key={customer.pan}
          customer={customer}
          editCustomer={editCustomer}
          deleteCustomer={deleteCustomer}
        />
      ))}
    </div>
  );
};

export default CustomerList;

