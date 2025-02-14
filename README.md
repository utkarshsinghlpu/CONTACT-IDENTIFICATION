# Contact Identification

[![Deploy](https://img.shields.io/badge/Deployed%20on-Render-blue)](https://contact-identification.onrender.com)



## Introduction

**Contact Identification** is a Node.js application designed to manage and identify contacts based on provided email addresses and phone numbers. It intelligently links related contacts, distinguishing between primary and secondary entries to maintain a unified contact database.

## Features

- **Identify Contacts**: Determine primary and secondary contacts based on provided information.
- **Database Management**: Efficiently handles contact creation and linking using Prisma ORM.
- **API-Driven**: Exposes endpoints for easy integration with other services or front-end applications.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **TypeScript**: Superset of JavaScript for static typing.
- **Prisma**: Next-generation ORM for database interactions.
- **SQLite**: Lightweight relational database.
- **ts-node-dev**: TypeScript execution environment for Node.js with hot-reloading.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (v6 or later)

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/utkarshsinghlpu/CONTACT-IDENTIFICATION.git
   cd CONTACT-IDENTIFICATION
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up the Database**:

   Initialize the Prisma client and set up the SQLite database:

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

### Running the Application

- **Development Mode**:

  Start the application with hot-reloading:

  ```bash
  npm run dev
  ```

- **Production Mode**:

  Build and start the application:

  ```bash
  npm run build
  npm start
  ```

The server will be running at `http://localhost:5000`.

## API Endpoints

### Identify Contact

- **Endpoint**: `/identify`
- **Method**: `POST`
- **Description**: Identifies and links contacts based on provided email and/or phone number.
- **Request Body**:

  ```json
  {
    "email": "example@example.com",
    "phoneNumber": "1234567890"
  }
  ```

- **Response**:

  ```json
  {
    "contact": {
      "primaryContactId": 1,
      "emails": ["example@example.com"],
      "phoneNumbers": ["1234567890"],
      "secondaryContactIds": [2, 3]
    }
  }
  ```

## Database Schema

The application uses Prisma ORM with the following schema:

```prisma
model Contact {
  id             Int       @id @default(autoincrement())
  phoneNumber    String?   @unique
  email          String?   @unique
  linkedId       Int?
  linkPrecedence String
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
  deletedAt      DateTime?
}
```

## Deployment

The application is deployed on Render and can be accessed at [https://contact-identification.onrender.com](https://contact-identification.onrender.com).

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.

