# Dame tu lista (E-Commerce platform)

## Project Overview
In response to covid and social distancing, Dame tu lista, a full-stack e-commerce platform, aims to provide a seamless shopping experience for users in the Peruvian context. It consists of both server-side and client-side components.

## Technology Stack
- **Server-side**: Node.js with Express for API endpoints
- **Client-side**: Angular for the front-end
- **Database**: MongoDB for data storage

## Functionalities
### Server-side
- Authentication using JSON Web Tokens (JWT)
- CRUD operations for buyers, retailers, orders
- Integration with Airtable for data retrieval
- Send order invoices to users as a text via WhatsApp

### Client-side
- Angular modules for app initialization and routing
- Core modules for singleton providers
- Feature modules: Login, Homepage, Register, Buyer Accounts, Send Free Bill, Retailer Stores, Carts, Sale Quotes, Retailers Dashboard 
- SharedModule for shared components and services
- Authentication Guard: Ensures secure access to certain routes
- Dynamic Routing: Handles dynamic routes for different store pages
- Lazy Loading: Implements lazy loading for improved performance
- User authentication and authorization
- Module Imports: Dynamically imports modules for various features



## How to Run
1. **Server-side**:
   - Ensure MongoDB is running
   - Navigate to the server directory and run `npm install` to install dependencies
   - Start the server using `npm start`

2. **Client-side**:
   - Clone the repository to your local machine.
   - Navigate to the client directory and run `npm install` to install dependencies
   - Start the client using `ng serve`

3. Access the application in a web browser at the specified URL

## Notes
- Lazy loading of Angular modules for optimized performance
- Follows a scalable app architecture for maintainability


## Additional Resources
For more information on scalable Angular app architecture, refer to [George Byte's article](https://georgebyte.com/scalable-angular-app-architecture/#22-core-module).
For Angular-related documentation, visit [Angular Official Guide](https://angular.io/guide/lazy-loading-ngmodules).
