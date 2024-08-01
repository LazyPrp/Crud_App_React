This React application allows users to manage customer details, including multiple addresses.
It validates input fields, integrates with external APIs to verify PAN and fetch postcode details, 
and provides functionalities to add, edit, and delete customers.

How It Works Together
- App Component: The App component manages the state of the customers and integrates the CustomerForm and CustomerList components.
- CustomerForm: Used for adding and editing customer details, validating input, and making API calls.
- CustomerList: Displays a list of customers using the CustomerItem component.
- CustomerItem: Displays individual customer details and provides options to edit or delete the customer.

1.CustomerForm.js:-
  This component handles the customer form, including input fields for customer details and addresses, validation, and form submission.
    -  State Management: The component uses useState to manage the customer details and errors.
    -  Input Handling: Functions handleChange and handleAddressChange update the customer state based on user input.
    -  Validation Functions: validatePan and validatePostcode use regular expressions to check the format of PAN and postcode.
    -  Form Validation: validateForm checks all inputs and sets error messages if validation fails.
    -  Form Submission: handleSubmit validates the form and calls addCustomer if valid, resetting the form afterward.
    -  Address Management: addAddress adds a new address field.
    -  API Calls: verifyPan and fetchPostcodeDetails call external APIs to verify PAN and fetch postcode details.

2. CustomerList.js:-
  This component displays the list of customers.
   -  Customer List: This component receives the list of customers as a prop and maps over it to render each CustomerItem.
   -  Props: editCustomer and deleteCustomer functions are passed down to CustomerItem.
   
3.CustomerItem.js:-
  This component represents a single customer item in the list.
    -  Display Customer: This component displays customer details, including addresses.
    -  Edit/Delete: Provides buttons to edit and delete the customer, triggering the respective functions passed as props.

4.App.js:-
  The main application component managing state and integrating all components.
    -  State Management: Manages customers and the currently editing customer.
    -  Customer Functions: Functions to add, edit, update, and delete customers.
    -  Conditional Rendering: Renders CustomerForm and CustomerList components, and another CustomerForm for editing if needed.

5.index.js and index.css
      Act as starting and rendering point .css is used for styling
