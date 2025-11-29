# API Documentation (Final)

This document provides documentation for the backend API of the LocalBrandFinder project.

## AuthController

This controller handles user authentication, including login and registration for both customers and brands.

### Endpoints

#### 1. Login

*   **HTTP Method:** `POST`
*   **Route:** `api/Auth/login`
*   **Description:** Authenticates a user (customer or brand) and returns a JWT token if the credentials are valid.
*   **Request Body:**
    ```json
    {
      "email": "user@example.com",
      "password": "yourpassword"
    }
    ```
*   **Responses:**
    *   `200 OK`: Returns a JWT token and the user's role.
        ```json
        {
          "token": "your_jwt_token",
          "role": "Customer"
        }
        ```
    *   `401 Unauthorized`: If the email or password is invalid.

#### 2. Register Customer

*   **HTTP Method:** `POST`
*   **Route:** `api/Auth/customer/register`
*   **Description:** Registers a new customer.
*   **Request Body:**
    ```json
    {
      "name": "Test Customer",
      "email": "customer@example.com",
      "password": "password123",
      "phoneNumber": "123-456-7890",
      "address": "123 Main St"
    }
    ```
*   **Responses:**
    *   `200 OK`: Returns a success message and a JWT token.
    *   `400 Bad Request`: If the request body is invalid.
    *   `500 Internal Server Error`: If the registration fails.

#### 3. Register Brand

*   **HTTP Method:** `POST`
*   **Route:** `api/Auth/brand/register`
*   **Description:** Registers a new brand.
*   **Request Body:**
    ```json
    {
      "name": "Test Brand",
      "email": "brand@example.com",
      "password": "password123",
      "description": "A description of the brand.",
      "phoneNumber": "098-765-4321",
      "address": "456 Oak Ave",
      "logoUrl": "https://example.com/logo.png"
    }
    ```
*   **Responses:**
    *   `200 OK`: Returns a success message and a JWT token.
    *   `400 Bad Request`: If the request body is invalid.
    *   `500 Internal Server Error`: If the registration fails.

#### 4. Test Customer Authentication

*   **HTTP Method:** `GET`
*   **Route:** `api/Auth/test/customer`
*   **Description:** A test endpoint to verify customer authentication. Requires a valid JWT token for a customer.
*   **Authorization:** `Roles = "Customer"`
*   **Responses:**
    *   `200 OK`: If the user is an authenticated customer.
    *   `401 Unauthorized`: If the user is not authenticated.
    *   `403 Forbidden`: If the user is not a customer.

#### 5. Test Brand Authentication

*   **HTTP Method:** `GET`
*   **Route:** `api/Auth/test/brand`
*   **Description:** A test endpoint to verify brand authentication. Requires a valid JWT token for a brand.
*   **Authorization:** `Roles = "Brand"`
*   **Responses:**
    *   `200 OK`: If the user is an authenticated brand.
    *   `401 Unauthorized`: If the user is not authenticated.
    *   `403 Forbidden`: If the user is not a brand.

## BrandController

This controller manages brand-related operations, such as adding categories to brands, retrieving brands by category, and searching for brands.

### Endpoints

#### 1. Add Category to Brand

*   **HTTP Method:** `PATCH`
*   **Route:** `api/brand/add/{brandId}/categories/{categoryId}`
*   **Description:** Assigns a category to a brand.
*   **Authorization:** `Roles = "Brand"`
*   **URL Parameters:**
    *   `brandId` (GUID): The ID of the brand.
    *   `categoryName` (string): The name of the category to add.
*   **Responses:**
    *   `200 OK`: If the category is successfully added to the brand.
    *   `400 Bad Request`: If the category is already assigned to the brand or if the request is invalid.
    *   `404 Not Found`: If the brand or category is not found.

#### 2. Get Brands by Category

*   **HTTP Method:** `GET`
*   **Route:** `api/brand/has-category/{categoryName}`
*   **Description:** Retrieves all brands that belong to a specific category.
*   **URL Parameters:**
    *   `categoryName` (string): The name of the category.
*   **Responses:**
    *   `200 OK`: Returns a list of brands in the specified category.
    *   `400 Bad Request`: If the category name is not provided.
    *   `404 Not Found`: If the category is not found.

#### 3. Search Brand

*   **HTTP Method:** `GET`
*   **Route:** `api/brand/search/{brandName}`
*   **Description:** Searches for brands by name.
*   **URL Parameters:**
    *   `brandName` (string): The name of the brand to search for.
*   **Responses:**
    *   `200 OK`: Returns a list of brands matching the search query.
    *   `400 Bad Request`: If the brand name is not provided.
    *   `404 Not Found`: If no brands are found matching the query.

## CategoryController

This controller is responsible for managing categories.

### Endpoints

#### 1. Get All Categories

*   **HTTP Method:** `GET`
*   **Route:** `api/Category/get-all-categories`
*   **Description:** Retrieves a list of all categories.
*   **Responses:**
    *   `200 OK`: Returns a list of categories.

## CustomersController

This controller handles CRUD operations for customers.

### Endpoints

#### 1. Get All Customers

*   **HTTP Method:** `GET`
*   **Route:** `api/Customers/getall`
*   **Description:** Retrieves a list of all customers.
*   **Responses:**
    *   `200 OK`: Returns a list of customers.

#### 2. Create Customer

*   **HTTP Method:** `POST`
*   **Route:** `api/Customers/create`
*   **Description:** Creates a new customer.
*   **Request Body:** A `Customer` object.
*   **Responses:**
    *   `201 Created`: Returns the newly created customer.

#### 3. Update Customer

*   **HTTP Method:** `PUT`
*   **Route:** `api/Customers/update/{id}`
*   **Description:** Updates an existing customer.
*   **URL Parameters:**
    *   `id` (GUID): The ID of the customer to update.
*   **Request Body:** A `Customer` object.
*   **Responses:**
    *   `204 No Content`: If the customer is updated successfully.
    *   `400 Bad Request`: If the ID in the URL does not match the ID in the request body.
    *   `404 Not Found`: If the customer is not found.

#### 4. Delete Customer

*   **HTTP Method:** `DELETE`
*   **Route:** `api/Customers/delete/{id}`
*   **Description:** Deletes a customer.
*   **URL Parameters:**
    *   `id` (GUID): The ID of the customer to delete.
*   **Responses:**
    *   `204 No Content`: If the customer is deleted successfully.
    *   `404 Not Found`: If the customer is not found.
