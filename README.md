# Online Store API Documentation

## Introduction

This API is designed to facilitate the management of products in an online store. It provides endpoints for adding, deleting, editing, and searching for products. The target audience includes web developers and mobile app developers who will use this API to build applications for the online store.

## API Overview

The API supports CRUD (Create, Read, Update, Delete) operations for products. Only authenticated users with admin privileges can perform these operations. The API communicates using JSON format over HTTP.

## Authentication

Authentication is performed using JSON Web Tokens (JWT). Users must include a valid token in the `Authorization` header of each request to access protected endpoints.

## Endpoints

List of available endpoints:

- `POST /users/register`
- `POST /users/login`

Routes that need an authentication & authorization:

- `GET /products/`
- `GET /products/query`
- `GET /products/:id`
- `POST /products/`
- `PUT /products/:id`
- `DELETE /products/:id`

## 1. POST /users/register

Register a new account for either admin or customer.

### Request

- **URL:** `/api/users/register`
- **Method:** `POST`
- **Body Parameters:**
  - `username` (required, unique, string): The username for the new account.
  - `password` (required, string): The password for the new account.
  - `role` (required, string): The role of the user (`Admin` or `Customer`).

### Response

- **Success Response:**
  - **Status Code:** `201 Created`
  - **Content:** JSON object confirming the successful creation of the new account.
    ```json
    {
      "message": "Success creating new account!",
      "newUser": {
        "id": 5,
        "username": "Admin2",
        "password": "123123",
        "role": "Admin",
        "updatedAt": "2024-04-30T16:00:47.933Z",
        "createdAt": "2024-04-30T16:00:47.933Z"
      }
    }
    ```
- **Error Responses:**
  - **Status Code:** `400 Bad Request`
  - **Content:** JSON object with an error message if required parameters are missing or invalid.
      ```json
      {
        "message": "Username is required"
      }
      ```
      ```json
      {
        "message": "Password is required"
      }
      ```
  - **Status Code:** `409 Conflict`
  - **Content:** JSON object with an error message if username already exists / registered.
      ```json
      {
        "message": "Username already exists"
      }
      ```
  - **Status Code:** `500 Internal Server Error`
  - **Content:** JSON object with an error message if there is a server error.
    ```json
    {
      "message": "Internal Server Error"
    }
    ```

&nbsp;

## 2. POST /users/login

Log in to the application.

### Request

- **URL:** `/api/users/login`
- **Method:** `POST`
- **Body Parameters:**
  - `username` (required, string): The username of the user.
  - `password` (required, string): The password of the user.

### Response

- **Success Response:**
  - **Status Code:** `200 OK`
  - **Content:** JSON object containing the username and access token.
    ```json
    {
      "username": "string",
      "access_token": "string"
    }
    ```
- **Error Responses:**
  - **Status Code:** `400 Bad Request`
  - **Content:** JSON object with an error message if required parameters are missing.
      ```json
      {
        "message": "Email is required"
      }
      ```
      <!-- Add more specific error responses if needed -->
  - **Status Code:** `401 Unauthorized`
  - **Content:** JSON object with an error message if the username/password combination is invalid.
      ```json
      {
        "message": "Invalid username/password"
      }
      ```
  - **Status Code:** `404 Not Found`
  - **Content:** JSON object with an error message if the account is not found.
      ```json
      {
        "message": "Account not found"
      }
      ```
  - **Status Code:** `500 Internal Server Error`
  - **Content:** JSON object with an error message if there is a server error.
      ```json
      {
        "message": "Internal Server Error"
      }
      ```
  

&nbsp;


## 3. GET /products/

Retrieve all products from the database.

### Request

- **URL:** `/api/products/`
- **Method:** `GET`
- **Headers:**
  - `Authorization`: Bearer token for authentication.

### Response

- **Success Response:**
  - **Status Code:** `200 OK`
  - **Content:** JSON array containing all products.
    ```json
    [
      {
        "id": 1,
        "name": "Lunch Box V2",
        "description": "Lorem ipsum dolor asit tamet jamet kumaha siaa dolor sidolor dolor",
        "price": 15000,
        "stock": 15,
        "createdAt": "2024-04-30T14:44:55.796Z",
        "updatedAt": "2024-04-30T14:44:55.796Z"
      },
      {
        "id": 2,
        "name": "Dinner Box",
        "description": "Another description",
        "price": 18000,
        "stock": 20,
        "createdAt": "2024-04-30T14:44:55.796Z",
        "updatedAt": "2024-04-30T14:44:55.796Z"
      }
    ]
    ```
- **Error Responses:**
  - **Status Code:** `500 Internal Server Error`
  - **Content:** JSON object with an error message if there is a server error.
      ```json
      {
        "message": "Internal Server Error"
      }
      ```

&nbsp;

## 4. GET /products/query

Retrieve products from the database based on product name.

### Description

This endpoint allows you to retrieve products from the database that match a given product name.

### Request

- **URL:** `/api/products/query`
- **Method:** `GET`
- **Headers:**
  - `Authorization`: Bearer token for authentication.
  - `Content-Type`: application/json

### Response

- **Success Response:**
  - **Status Code:** `200 OK`
  - **Content:** JSON array containing products matching the query.
    ```json
    [
      {
        "id": 1,
        "name": "Lunch Box V2",
        "description": "Lorem ipsum dolor asit tamet jamet kumaha siaa dolor sidolor dolor",
        "price": 15000,
        "stock": 15
      }
    ]
    ```
- **Error Responses:**
  - **Status Code:** `500 Internal Server Error`
  - **Content:** JSON object with an error message if there is a server error.
    ```json
    {
      "message": "Internal Server Error"
    }
    ```

&nbsp;

## 5. GET /products/:id

Retrieve user information by their unique identifier (id).

### Request

- **URL:** `/users/:id`
- **Method:** `GET`
- **URL Parameters:**
  - `id` (required, string): The unique identifier of the user.

### Response

- **Success Response:**
  - **Status Code:** `200 OK`
  - **Content:** JSON object containing product information.
    ```json
    {
    "id": 1,
    "name": "Dinner Box",
    "description": "Lorem ipsum dolor asit tamet jamet kumaha siaa dolor sidolor dolor",
    "price": 9000,
    "stock": 15,
    "createdAt": "2024-04-30T14:43:48.504Z",
    "updatedAt": "2024-04-30T15:47:24.538Z"
}
    ```
- **Error Responses:**
  - **Status Code:** `404 Not Found`
  - **Content:** JSON object with an error message if the user with the specified ID is not found.
      ```json
      {
        "message": "Data not found"
      }
      ```
  -   **Status Code:** `500 Internal Server Error`
    - **Content:** JSON object with an error message if there is a server error.
      ```json
      {
        "message": "Internal Server Error"
      }
      ```

&nbsp;

## 7. POST /products/

Create a new product.

### Request

- **URL:** `/api/products/`
- **Method:** `POST`
- **Body Parameters:**
  - `name` (required, string): The name of the product.
  - `description` (required, string): Description of the product.
  - `price` (required, number): The price of the product.

### Response

- **Success Response:**
  - **Status Code:** `201 Created`
  - **Content:** JSON object containing the newly created product information.
    ```json
    {
      "message": "Product has been created",
      "product": {
          "id": 2,
          "name": "Lunch Box V2",
          "description": "Lorem ipsum dolor asit tamet jamet kumaha siaa dolor sidolor dolor",
          "price": 15000,
          "stock": 15,
          "updatedAt": "2024-04-30T14:44:55.796Z",
          "createdAt": "2024-04-30T14:44:55.796Z"
      }
    }
    ```
- **Error Responses:**
  - **Status Code:** `400 Bad Request`
  - **Content:** JSON object with an error message if required parameters are missing or invalid.
      ```json
      {
        "message": "Name is required"
      }
      ```
      ```json
      {
        "message": "Description is required"
      }
      ```
      ```json
      {
        "message": "Price is required"
      }
      ```
      ```json
      {
        "message": "Stock is required"
      }
      ```

&nbsp;

## 8. PUT /products/:id

Update an existing product.

### Request

- **URL:** `/api/products/:id`
- **Method:** `PUT`
- **URL Parameters:**
  - `id` (required, string): The unique identifier of the product to update.
- **Headers:**
  - `Authorization`: Bearer token for authentication.
  - `Content-Type`: application/json
- **Body Parameters (all is required):**
  - `name` (string, required): The updated name of the product.
  - `description` (string, required): The updated description of the product.
  - `price` (number, required): The updated price of the product.
  - `stock` (number, required): The updated stock quantity of the product.

### Response

- **Success Response:**
  - **Status Code:** `200 OK`
  - **Content:** JSON object containing the updated product information.
    ```json
    {
      "message": "Product has been updated successfully",
      "product": {
          "id": 1,
          "name": "Updated Lunch Box V2",
          "description": "Updated description",
          "price": 18000,
          "stock": 10,
          "updatedAt": "2024-05-01T12:00:00.000Z",
          "createdAt": "2024-04-30T14:44:55.796Z"
      }
    }
    ```
- **Error Responses:**
  - **Status Code:** `400 Bad Request`
  - **Content:** JSON object with an error message if no valid parameters are provided for updating.
      ```json
      {
        "message": "At least one field is required for updating"
      }
      ```
  - **Status Code:** `404 Not Found`
  - **Content:** JSON object with an error message if the product with the specified ID is not found.
      ```json
      {
        "message": "Product not found"
      }
      ```
  - **Status Code:** `500 Internal Server Error`
  - **Content:** JSON object with an error message if there is a server error.
      ```json
      {
        "message": "Internal Server Error"
      }
      ```

&nbsp;

## 9. DELETE /products/:id

Delete an existing product.

### Request

- **URL:** `/api/products/:id`
- **Method:** `DELETE`
- **URL Parameters:**
  - `id` (required, string): The unique identifier of the product to delete.
- **Headers:**
  - `Authorization`: Bearer token for authentication.

### Response

- **Success Response:**
  - **Status Code:** `200 OK`
  - **Content:** JSON object confirming the deletion.
    ```json
    {
      "message": "{Product Name} has been deleted successfully"
    }
    ```
- **Error Responses:**
  - **Status Code:** `404 Not Found`
  - **Content:** JSON object with an error message if the product with the specified ID is not found.
      ```json
      {
        "message": "Data not found"
      }
      ```
  - **Status Code:** `500 Internal Server Error`
  - **Content:** JSON object with an error message if there is a server error.
      ```json
      {
        "message": "Internal Server Error"
      }
      ```

&nbsp;


&nbsp;

## Global Error

_Response (401 - Unuthorized)_

```json
{
  "message": "Invalid Token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden, You are not authorize to access"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```
