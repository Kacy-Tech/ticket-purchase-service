
# Ticket Purchase Service

This project is a ticket purchase service built with Node.js (Express.js) and MongoDB. It allows users to create events, search for events, purchase tickets, and view their purchase history. We use TypeScript for type safety and JWT for authentication.

## Features

- User registration and authentication
- Event creation and management
- Event search and ticket purchase
- View purchase history

## Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT for authentication

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB Atlas cluster or local MongoDB instance

### Installation

1. Clone the Repository:
   git clone https://github.com/Kacy-Tech/ticket-purchase-service.git
   cd ticket-purchase-service

2. Install Dependencies:
   npm install


3. Create a `.env` File:
   Create a `.env` file in the root directory with the following content:
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=3000

   - `MONGO_URI`: Replace `your_mongodb_connection_string` with your MongoDB connection string. You can get this from MongoDB Atlas if you're using a cloud database or your local MongoDB instance if you're running it locally.
     - For MongoDB Atlas: Log in to MongoDB Atlas, navigate to your cluster, click on "Connect", and choose "Connect your application". Copy the connection string and replace the placeholder in your `.env` file with your actual connection string.
     - For Local MongoDB: Use `mongodb://localhost:27017/your-database-name` if you’re running MongoDB locally.

   - `JWT_SECRET`: Replace `your_jwt_secret` with a secure, random key. You can generate a secure key using the following Node.js command:
      node -e "console.log(require('crypto').randomBytes(32).toString('base64'));"
     Copy the generated key and use it as the value for `JWT_SECRET` in your `.env` file.

4. Build the Project:

   npm run build

5. Run the Project:

   npm start
   For development mode with hot reloading:

   npm run dev

### API Documentation

Refer to the [API Documentation](#api-documentation) section below for details on how to use the API.

### Security Note

- Environment Variables: Ensure that your `.env` file is not committed to version control. Add `.env` to your `.gitignore` file:

  .env
- JWT Secret: Each environment should use its own JWT secret key. Never share your JWT secret publicly.

## API Documentation

#### User Registration

- URL: `/api/users/register`
- Method: `POST`
- Body:

  {
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "password123"
  }
- Response:

  {
    "_id": "user_id",
    "username": "testuser",
    "email": "testuser@example.com",
    "token": "jwt_token"
  }

#### User Login

- URL: `/api/users/login`
- Method: `POST`
- Body:

  {
    "email": "testuser@example.com",
    "password": "password123"
  }
- Response:

  {
    "_id": "user_id",
    "username": "testuser",
    "email": "testuser@example.com",
    "token": "jwt_token"
  }

#### Create Event

- URL: `/api/events`
- Method: `POST`
- Headers:

  {
    "Authorization": "Bearer jwt_token"
  }
- Body:

  {
    "name": "Concert",
    "date": "2024-12-31",
    "time": "20:00",
    "venue": "Stadium",
    "tickets": [
      {
        "category": "VIP",
        "price": 100,
        "availability": 50
      },
      {
        "category": "General Admission",
        "price": 50,
        "availability": 200
      }
    ]
  }
- Response:

  {
    "_id": "event_id",
    "name": "Concert",
    "date": "2024-12-31",
    "time": "20:00",
    "venue": "Stadium",
    "tickets": [
      {
        "category": "VIP",
        "price": 100,
        "availability": 50
      },
      {
        "category": "General Admission",
        "price": 50,
        "availability": 200
      }
    ]
  }

#### Get All Events

- URL: `/api/events`
- Method: `GET`
- Response:

  [
    {
      "_id": "event_id",
      "name": "Concert",
      "date": "2024-12-31",
      "time": "20:00",
      "venue": "Stadium",
      "tickets": [
        {
          "category": "VIP",
          "price": 100,
          "availability": 50
        },
        {
          "category": "General Admission",
          "price": 50,
          "availability": 200
        }
      ]
    }
  ]

#### Purchase Tickets

- URL: `/api/tickets/purchase`
- Method: `POST`
- Headers:

  {
    "Authorization": "Bearer jwt_token"
  }
- Body:

  {
    "eventId": "event_id",
    "category": "VIP",
    "quantity": 2
  }
- Response:

  {
    "_id": "purchase_id",
    "event": "event_id",
    "user": "user_id",
    "category": "VIP",
    "quantity": 2,
    "date": "purchase_date"
  }

#### Get Purchase History

- URL: `/api/tickets/history`
- Method: `GET`
- Headers:

  {
    "Authorization": "Bearer jwt_token"
  }
- Response:

  [
    {
      "_id": "purchase_id",
      "event": "event_id",
      "category": "VIP",
      "quantity": 2,
      "date": "purchase_date"
    }
  ]
