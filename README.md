# PostgreSQL REST Proxy

## Overview
PostgreSQL REST Proxy is a Node.js application providing a RESTful API interface for interacting with a PostgreSQL database. It enables executing SQL queries directly via HTTP requests.

## Features
- Execute SQL queries via REST API endpoints
- Retrieve detailed information about query execution, including records and rows affected
- Support for a variety of SQL operations: SELECT, INSERT, UPDATE, DELETE
- Test database connectivity and list available tables

## Prerequisites
- Node.js (Version 16 or later)
- PostgreSQL database server
- Access to modify environment variables for secure credential storage

## Installation

### Clone the Repository
```bash
git clone [your-repo-url]
cd [your-repo-directory]
```

### Setting Up Environment Variables
Create a `.env` file in the root directory with the following content:

```
DB_USER=yourDatabaseUsername
DB_PASSWORD=yourDatabasePassword
DB_HOST=yourDatabaseHost
DB_DATABASE=yourDatabaseName
DB_PORT=yourDatabasePort
PORT=applicationPort
```

### Install Dependencies
```bash
npm install
```

## Usage

### Running the Application

#### With Node.js
Start the server using Node.js:
```bash
npm start
```
This will launch the PostgreSQL REST Proxy at `http://localhost:5479`.

#### Alternative Start Command
You can also start the server directly with:
```bash
node server.js
```

### API Endpoints

#### Test Database Connection
- **Endpoint:** `/test-db`
- **Method:** `GET`
- **Description:** Tests the connection to the database and returns a list of available tables in the public schema.

```bash
curl --location --request GET 'http://yourserver:5479/test-db'
```

#### Execute Query
- **Endpoint:** `/query`
- **Method:** `POST`
- **Body:** `{ "sql": "your SQL query here" }`
- **Content-Type:** `application/json`
- **Description:** Executes the provided SQL query and returns the result.

```bash
curl --location --request POST 'http://yourserver:5479/query' --header 'Content-Type: application/json' --data-raw '{
  "sql": "SELECT * FROM your_table;"
}'
```

### Response Format
Successful query responses include:
- `records`: Array of row objects returned by the query
- `rowsAffected`: Number of rows affected by the query
- `fields`: Array of field metadata objects

## Security and Best Practices
- Never expose sensitive database credentials
- Use environment variables for configuration
- Employ parameterized queries to prevent SQL injection when possible
- This API should be used in a secure environment, as it can execute arbitrary SQL queries
- Consider implementing authentication and authorization mechanisms for production use
- Use HTTPS in production environments
- Limit database user permissions to only necessary operations

## Dependencies
- `express`: Web framework for Node.js
- `pg`: PostgreSQL client for Node.js
- `dotenv`: Environment variable management

## Contributing
Contributions to this project are welcome. Please fork the repository and submit a pull request.

## License
MIT License