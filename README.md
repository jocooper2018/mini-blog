# Mini blog

A minimalistic blog application built with **NestJS**, **Prisma**, **GraphQL**, and **React**.

## Prerequisites

- [Node.js](https://nodejs.org) (v18 or higher)
- [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/)

## Installation

### Clone the repository

- HTTPS:

    ```bash
    git clone https://github.com/jocooper2018/mini-blog.git
    ```

- SSH:

    ```bash
    git clone git@github.com:jocooper2018/mini-blog.git
    ```

### Install dependencies

In both the `backend/` and `frontend/` directories:

```bash
yarn install
```

### Configure environment variables

- Copy the example environment files:

   ```bash
   cp docker/.env.example docker/.env
   cp backend/.env.example backend/.env
   ```

- Edit `docker/.env` and `backend/.env` with secure and coherent values.

### Start the database

In the `docker/` directory:

```bash
docker compose up --build && docker compose logs -f
```

### Create the session table

1. Open PgAdmin at [http://localhost:8081/](http://localhost:8081/).
    - Email: `{PGADMIN_USER}@dbadmin.com` with the `PGADMIN_USER` value in `docker/.env` instead of `{PGADMIN_USER}`.
    - Password: `PGADMIN_PASSWORD` value in `docker/.env`

2. Add a server
    - General tab
        - Name: Choose a name (e.g. miniblog)
    - Connection tab
        - Host name/address: `postgresdb`
        - Port: `5432`
        - Maintenance database: `DB_NAME` value in `docker/.env` (default `miniblog`)
        - Username: `DB_USER` value in `docker/.env`
        - Keberos authentication: `disabled`
        - Password: `DB_ROOT_PASSWORD`  value in `docker/.env`*

3. Select the `miniblog` database, open the Query Tool, and execute the script [session.sql](session.sql).

### Initialize the database schema

In the `backend/` directory:

```bash
npx prisma migrate dev
```

### Start the backend server

In the `backend/` directory:

```bash
yarn start:dev
```

The GraphQL API is available at: [http://localhost:3000/graphql](http://localhost:3000/graphql).

### Start the frontend

In the `frontend/` directory:

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
