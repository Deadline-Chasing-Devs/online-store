import express from "express";
import mysql from "mysql";
import path from "path";
import { fileURLToPath } from "url";
import expressMysqlSession from "express-mysql-session";
import expressSession from "express-session";
import {
    PORT,
    MYSQL_DATABASE,
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    SESS_NAME,
    SESS_SECRET,
    SESS_LIFETIME,
    NODE_ENV,
} from "./config/constants.js";
import router from "./routes/index.js";

const __filename = fileURLToPath(import.meta.url);
console.log(__filename);
const __dirname = path.dirname(__filename);

// MySQL database
const MySQLOptions = {
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
};

const pool = mysql.createPool({ ...MySQLOptions });
pool.getConnection((err, conn) => {
    if (err) throw err;

    // Check connection
    console.log("Connected to MySQL database");

    conn.release();
});

// Express app
const app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Options
app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Session store
const MySQLStore = expressMysqlSession(expressSession);
const sessionStore = new MySQLStore(
    { clearExpired: true, checkExpirationInterval: 900000, ...MySQLOptions },
    pool
);
const session = expressSession({
    name: SESS_NAME,
    secret: SESS_SECRET,
    saveUninitialized: false,
    resave: false,
    store: sessionStore,
    cookie: {
        sameSite: true,
        secure: NODE_ENV == "production",
        maxAge: parseInt(SESS_LIFETIME),
    },
});
app.use(session);

// Check session
app.use((req, res, next) => {
    if (!req.session.user) {
        res.clearCookie(SESS_NAME);
    }
    next();
});

app.listen(PORT, () => console.log(`App running at http://localhost:${PORT}`));

// Routing
const {
    cartRouter,
    checkoutRouter,
    dashboardRouter,
    editItemRouter,
    homepageRouter,
    itemRouter,
    loginRouter,
    logoutRouter,
    newItemRouter,
    orderRouter,
    ordersRouter,
    searchRouter,
} = router(pool);

app.use("/cart", cartRouter);
app.use("/checkout", checkoutRouter);
app.use("/dashboard", dashboardRouter);
app.use("/edit-item", editItemRouter);
app.use("/item", itemRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/new-item", newItemRouter);
app.use("/order", orderRouter);
app.use("/orders", ordersRouter);
app.use("searchRouter", searchRouter);
app.use("/", homepageRouter);
