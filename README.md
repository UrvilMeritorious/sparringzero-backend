# sparring-zero-backend

## Description

- Sparring Zero V1 connects Brazilian Jiu-Jitsu and Grappling practitioners for training sessions. Future versions will expand to other combat sports.

## Core Objective

- Match BJJ/Grappling practitioners based on belt level, weight, and location.

## Platforms

- iOS (iOS 14+)
- Android (Android 8+)

## Project uses

This project is a Node.js-based backend service utilizing Prisma as the ORM for PostgreSQL. It includes authentication and database management functionalities.

## Prerequisites

Ensure you have the following installed on your system:

- Node.js (Latest LTS version recommended)
- PostgreSQL
- Prisma CLI
- Zod
- Nodemon (for development mode)

## Installation

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd <project-folder>
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up the environment variables:
   Create a `.env` file from `.env.example` file in the root directory and add the following:

   ```env
   PORT=3000
   DATABASE_URL=postgresql://postgres:886644@localhost:5432/sparringZero
   JWT_SECRET=eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJzcGFycmluZyB6ZXJvIiwiVXNlcm5hbWUiOiJTcGFycmluZ1plcm8iLCJleHAiOjE3MzgzMDc5NjMsImlhdCI6MTczODMwNzk2M30.vMJ6OSFvyVdXILm658K8m90hlkPCiuykMj1jpTK7Mus
   ```

4. Initialize Prisma:

   ```sh
   npm run prisma:init
   ```

## Usage

### Development Mode

Start the server in development mode with Nodemon:

```sh
npm run dev
```

### Prisma Commands

- Start Prisma Studio:
  ```sh
  npm run prisma:studio
  ```
- Create a new migration:

  ```sh
  npm run prisma:migrate-create --name <migration-name>
  ```

- Run database migrations:
  ```sh
  npm run prisma:migrate
  ```

# API Endpoints

## Users

- `{{base_url}}/api/users/register`
- `{{base_url}}/api/users/login`
- `{{base_url}}/api/users/fetchAllUsers`
- `{{base_url}}/api/users/fetchUsersByEmail?email=Email_Address`

## Sports and BeltLevel

### Sports

- `{{base_url}}/api/sports/fetchSportsDetails`
- `{{base_url}}/api/sports/createSport`

### BeletLevels

- `{{base_url}}/api/belts/fetchBeltLevels`
- `{{base_url}}/api/belts/createBelt`

## Update and Delete

- `{{base_url}}/api/users/updateUser?email={Email_Address}`
- `{{base_url}}/api/sports/updateSportsDetails?sportName={sportName}`
- `{{base_url}}/api/belts/updateBeltLevelDetails?levelName={levelName}`
  - Payload:
    - What ever the fields which you want to update

# License

This project is licensed under the MIT License.
