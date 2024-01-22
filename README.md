# Supermarket Order Processing App [Live App](https://shm-stores.vercel.app/)
Welcome to the Supermarket Order Processing App! This application is designed to streamline the ordering process for a supermarket chain, allowing stores to efficiently order products, especially prepared foods, from the commissary kitchen.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
    - [Stores](#stores)
    - [Commisary](#commisary)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Features
- Create, update, and view orders for individual stores.
- Manage store guides for efficient order processing.
- Access a centralized commissary system to oversee teams, product categories, and orders.
- Create and view guides for commissary orders.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/supermarket-order-app.git
   cd supermarket-order-app

2. Set up your MongoDB database and update the connection string in the server configuration.

3. Run the application:

    ```bash
    cd client
    npm start
    cd ../server
    npm start
    ```

   Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to use the application.



## Usage

- Navigate to different components to perform various actions, such as creating or updating orders, managing guides, and viewing orders.

## Components

### Stores


- **Store:** Main component for store-related actions.
- **CreateStoreGuide:** Create a guide for store-related processes.
- **ViewAllStoreGuide:** View all store guides.
- **CreateOrder:** Help create orders for stores using premade order guide.
- **UpdateOrder:** Update an existing store order.
- **ViewOrders:** View all orders for a store.

### Commisary
- **Commisary:** Main component for commissary-related actions.
- **ComTeam:** Manage teams within the commissary.
- **ProductCategory:** Manage product categories for commissary products.
- **Products:** Manage individual products available in the commissary.
- **CreateOrderGuide:** Create a guide for commissary order processing.
- **ViewGuide:** View guides for commissary orders.
- **AllOrders:** View all commissary orders.

## Technologies
- React.js for the frontend.
- Node.js for the backend.
- MongoDB for the database.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your proposed changes.

## License
This project is licensed under the [MIT License](LICENSE).
