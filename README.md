# COSC-4353 Software Design Group 29 Project

## Project Description
This project involves the design and development of a web application to predict fuel rates based on specific criteria provided by a partner company. The application aims to facilitate fuel rate prediction for clients based on their location, history, requested gallons, and company profit margin. The project focuses on software design principles and high-level architecture.

## Team Members
- Nikolas Velazquez - 1819671
- Gleici Pereira - 2097712
- Hassaan Haqqani - 2073980
- Khang Huynh - 2031306

## Technology Stacks
- Frontend:
Our frontend development utilizes a combination of HTML for structure, CSS for styling, and JavaScript for interactivity. We enhance responsiveness and user experience with Bootstrap and manage components efficiently using ReactJS.

- Backend:
For backend development, we use JavaScript, Node.js, and Express.js as our framework. MongoDB serves as our non-relational database, chosen for its flexibility, scalability, and seamless integration with JavaScript via Mongoose. Jest ensures code coverage, enhancing the reliability of our codebase. Together, these technologies enable secure, efficient, and scalable server-side processing for our project. 

By leveraging this technology stack, we aim to develop a robust and scalable software application that meets the project requirements and adheres to modern software design principles and high-level architecture.


## Components and Functionalities
The web application must include the following components and functionalities:

1. **Login:**
   - Allows clients to log in.
   - Provides registration for new clients.

2. **Client Registration:**
   - Initially, username and password.

3. **Client Profile Management:**
   - Clients must complete their profiles after registration by logging in.
   - Input fields such as Full Name (50 char), Address 1 (100 char), City (100 char), State (Drop Down), and Zipcode (5 char) will be required. Others, such as Address 2 (100 char), and Zipcode 4 last digits will be optional. 
   - Manage client information and preferences.

4. **Fuel Quote Form with Pricing Module:**
   - Provides a form with the following fields:
     - Gallons Requested (numeric, required).
     - Delivery Address (Non-editable, comes from client profile).
     - Delivery Date (Calendar, date picker).
     - Client history (existing customer with previous purchase or new).
     - Company profit margin (%).
   - Calculates fuel rates based on the provided criteria.
     - Suggested Price per gallon (numeric non-editable / calculated by Pricing Module).
   - Displays total cost.
     - Total Amount Due (numeric non-editable / calculated as (gallons * price)).
	
5. **Fuel Quote Filter:**
   - Allows clients to filter quotes by date, or gallons requested.

6. **Fuel Quote History:**
   - Maintains a history of fuel quotes for each client.
   - Allows clients to view their past quotes.

## Instructions 
- Users should log in to access the application's functionalities.
- New users must register before logging in.
- After logging in, users can complete their profiles.
- The fuel quote form allows users to input relevant information for rate prediction.
- The history section displays past fuel quotes for reference.

## Notes
- This project emphasizes software design principles and architecture.
- Additional features and modifications will be discussed and implemented during development.
- Application can be accessed at https://group-29-coogs-energy-enterprise.netlify.app/.


