# Mini blog

A minimalistic blog application built with **NestJS**, **Prisma**, **GraphQL**, and **React**.

## Prerequisites

- [Node.js](https://nodejs.org) (v18 or higher)
- [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/)

## Installation

1. Clone the repository.
    - HTTPS:

        ```bash
        git clone https://github.com/jocooper2018/mini-blog.git
        ```

    - SSH:

        ```bash
        git clone git@github.com:jocooper2018/mini-blog.git
        ```

2. Install dependencies  
   In both the `backend/` and `frontend/` directories:

    ```bash
    yarn install
    ```

3. Configure environment variables

    - Copy the example environment files:

       ```bash
       cp docker/.env.example docker/.env
       cp backend/.env.example backend/.env
       ```

    - Edit docker/.env and backend/.env with secure and coherent values.

4. Start the database  
    In the `docker/` directory

    ```bash
    docker compose up --build && docker compose logs -f
    ```

5. Initialize the database schema  
    In the backend/ directory:

    ```bash
    npx prisma migrate dev
    ```

6. Start the backend server  
    In the `backend/` directory:

    ```bash
    yarn start:dev
    ```

    The GraphQL API is available at: [http://localhost:3000/graphql](http://localhost:3000/graphql).

7. Start the frontend
    In the frontend/ directory:

    ```bash
    yarn dev
    ```

    The blog is available at [http://localhost:5173](http://localhost:5173).

## Project Structure

- `backend/` — NestJS API with Prisma ORM and GraphQL
- `frontend/` — React application using GraphQL queries and mutations
- `docker/` — Docker configuration for PostgreSQL and environment management

## Notes

- Ensure Docker is running before starting the database.
- If ports `3000` (backend) or `5173` (frontend) are already in use, update the environment files accordingly.
- For development, you might want to enable hot reloads for a smoother experience.
