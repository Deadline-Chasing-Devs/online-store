/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// import dotenv from "dotenv";
// dotenv.config();
import "dotenv/config";

export const {
    PORT,
    MYSQL_DATABASE,
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    SESS_NAME,
    SESS_SECRET,
    SESS_LIFETIME,
    NODE_ENV,
} = process.env;
