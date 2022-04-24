# Single Vendor Online Store
An online store maintained by a single vendor.

## Setup
1. Clone the repo to your local machine.
2. Run `npm install` from the root directory.
3. Use the `schema.sql` to create the database used by the application (MySQL database is used).
4. Create a `.env` file inside the root directory. It should include following environment variables.
    ```
    PORT=
    MYSQL_HOST=
    MYSQL_USER=
    MYSQL_PASSWORD=
    MYSQL_DATABASE=
    SESS_NAME=
    SESS_SECRET=
    SESS_LIFETIME=
    NODE_ENV=