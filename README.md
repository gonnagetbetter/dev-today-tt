# Dev Today Calendar API

A NestJS application that provides a calendar API with support for public holidays and user events.

## Description

This application integrates with external APIs to provide information about countries and public holidays. It allows users to manage their calendar events and view public holidays for different countries.

## Features

- User management
- Calendar event management
- Public holiday information via Nager.Date API
- Country information via CountriesNow API

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- PostgreSQL (v12 or higher)
- Docker and Docker Compose (optional, for running PostgreSQL in a container)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd dev-today-tt
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Copy the example environment file and adjust it to your needs:

```bash
cp .env.example .env
```

Make sure to update the database connection details if needed.

## Database Setup

You can either set up PostgreSQL manually or use Docker Compose to run it in a container.

### Using Docker Compose

1. Start the PostgreSQL container:

```bash
docker-compose up -d
```

This will start a PostgreSQL instance with the configuration specified in the docker-compose.yml file.

### Manual Setup

1. Install PostgreSQL on your system
2. Create a database named `country-db` (or the name specified in your .env file)
3. Update the database connection details in your .env file if necessary

## Running the Application

```bash
# Development mode
npm run start

# Watch mode (automatically restarts on file changes)
npm run start:dev

# Production mode
npm run start:prod
```

The application will be available at http://localhost:3000 (or the port specified in your .env file).

## API Endpoints

The application provides the following API endpoints:

- `/users` - User management
- `/calendar-events` - Calendar event management
- `/country` - Country information

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NAGGER_BASE_URL | Base URL for the Nager.Date API | https://date.nager.at/api/v3 |
| COUNTRIES_NOW_BASE_URL | Base URL for the CountriesNow API | https://countriesnow.space/api/v0.1/countries |
| DB_HOST | PostgreSQL host | localhost |
| DB_PORT | PostgreSQL port | 5432 |
| DB_USER | PostgreSQL username | postgres |
| DB_PASSWORD | PostgreSQL password | postgres |
| DB_DATABASE | PostgreSQL database name | country-db |
| PORT | Application port | 3000 |

## License

This project is licensed under the MIT License - see the LICENSE file for details.
