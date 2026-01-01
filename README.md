
# Localo – Local Brand Finder Web Application

##  Overview

**Localo** is a web-based platform designed to help users discover local brands and handmade businesses through structured categories and brand profiles.
Unlike traditional e-commerce platforms, Localo focuses on **brand discovery**, not direct product sales or in-app payments.

The platform enables:

* Customers to explore local brands by category and search
* Brands to create and manage public profiles
* Secure authentication with role-based access

Localo targets the **Egyptian market** and is built using **ASP.NET Core Web API** and **React**, following **Clean Architecture principles**.

---

## Project Objectives

* Support local artisans and small businesses
* Provide structured brand discovery beyond social media
* Ensure scalability, maintainability, and security
* Deliver a clean, user-friendly web experience

---

##  Technologies Used

### Backend

* **ASP.NET Core Web API**
* **C#**
* **Entity Framework Core**
* **JWT Authentication**
* **FluentValidation**
* **SQL Server (Azure-hosted)**

### Frontend

* **React**
* **React Router**
* **Axios**
* **HTML5 / CSS3 / JavaScript**

### Tools & Platforms

* Visual Studio
* Visual Studio Code
* Figma (UI/UX Design)
* Docker (Containerization)
* Postman (API Testing)
* Git & GitHub (Version Control)

---

## System Architecture

Localo follows **Clean Architecture**, divided into four main layers:

### Backend Layers

1. **API Layer**

   * Controllers
   * Middleware
   * Dependency Injection
2. **Application Layer**

   * Business logic
   * DTOs
   * Interfaces
   * Validation
3. **Domain Layer**

   * Core entities (Customer, Brand, Category)
   * Business rules
4. **Infrastructure Layer**

   * Database context
   * Repositories
   * Migrations

### Frontend Structure

```
FrontEnd-Edited/
│── components/
│── pages/
│── public/
│── src/
```

---

## 👥 User Roles

### Customer

* Register and log in
* Browse brands by category
* Search brands by name
* View brand profiles
* Manage personal profile
* Delete account

### Brand

* Register and log in
* Create and manage brand profile
* Assign and remove categories
* Request new categories
* View public brand page

---

##  Authentication & Security

* JWT-based authentication
* Role-based authorization (Customer / Brand)
* Password hashing
* Token expiration (24 hours)
* HTTPS-enabled endpoints
* Secure error handling

---

## Core Features

### Functional Features

* User registration and login
* Brand profile creation and management
* Category-based browsing
* Brand search with pagination
* Public brand profiles
* Role-based access control

### Non-Functional Features

* Scalable and modular architecture
* Optimized performance with pagination
* Responsive UI
* Secure data handling
* Graceful error handling

---

## API Endpoints (Summary)

### Authentication

| Endpoint                      | Method | Description       |
| ----------------------------- | ------ | ----------------- |
| `/api/Auth/login`             | POST   | User login        |
| `/api/Auth/register-customer` | POST   | Register customer |
| `/api/Auth/register-brand`    | POST   | Register brand    |

### Customer

| Endpoint              | Method | Description          |
| --------------------- | ------ | -------------------- |
| `/api/Customers/{id}` | GET    | Get customer profile |
| `/api/Customers/{id}` | PUT    | Update profile       |
| `/api/Customers/{id}` | DELETE | Delete account       |

### Brand

| Endpoint                             | Method | Description       |
| ------------------------------------ | ------ | ----------------- |
| `/api/Brand/{id}`                    | GET    | Get brand profile |
| `/api/Brand/{id}`                    | PUT    | Update brand      |
| `/api/Brand/{id}/categories`         | POST   | Add category      |
| `/api/Brand/{id}/categories/{catId}` | DELETE | Remove category   |

### Category

| Endpoint             | Method | Description     |
| -------------------- | ------ | --------------- |
| `/api/Category`      | GET    | List categories |
| `/api/Category/{id}` | POST   | Add category    |
| `/api/Category/{id}` | PUT    | Update category |
| `/api/Category/{id}` | DELETE | Delete category |

---

## Testing

### Testing Types

* **Unit Testing** (Controllers, Repositories, Utilities)
* **Integration Testing** (API + Database)
* **Functional Testing** (User flows)
* **User Acceptance Testing**
* **Performance Testing**

### Tools Used

* Postman
* Jest
* React Testing Library
* Manual Testing

---

##  Deployment

* Docker-ready backend
* Web-based frontend
* SQL Server hosted on Azure
* Supports cloud scalability

---

## Future Improvements

* Geo-location-based brand search
* Mobile applications (iOS & Android)
* Advanced filtering & recommendations
* Real-time notifications
* Analytics dashboards for brands
* Two-factor authentication (2FA)

---

##  Limitations

* No product listings or payments
* Web-only (no mobile app yet)
* Single geographic region (Egypt)
* Limited analytics and personalization

