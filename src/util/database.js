import Item from "../models/item.js";
import Vendor from "../models/vendor.js";

// database query function
const queryPromise = (pool, sql, values) =>
    new Promise((resolve, reject) => {
        // eslint-disable-next-line no-unused-vars
        pool.query(sql, values, (error, results, fields) => {
            if (error) reject(error);
            resolve(results);
        });
    });

// getUserByUsername
// get vendor object given username
const getUserByUsername = async (pool, username) => {
    let results;
    try {
        results = await queryPromise(
            pool,
            "SELECT * FROM vendor WHERE username=?",
            [username]
        );
    } catch (error) {
        throw "Database Error";
    }

    if (results.length) {
        return new Vendor(results[0].username, results[0].password);
    }
    return null;
};

// Get item by itemId
const getItemById = async (pool, itemId) => {
    let results;
    try {
        results = await queryPromise(
            pool,
            "SELECT * FROM item WHERE item_id=?",
            [itemId]
        );
    } catch (error) {
        throw "Database Error";
    }

    if (results.length) {
        return new Item(
            results[0].item_id,
            results[0].name,
            results[0].description,
            results[0].price
        );
    }
};

// Get order by orderId

// Get items in an order by orderId

// Get image_ids of an item by itemId

// Add new item to the database
const addItem = async (pool, itemId, name, description, price) => {
    try {
        await queryPromise(
            pool,
            `INSERT INTO item 
            (item_id, name, description, price)
            VALUES (?, ?, ?, ?)`,
            [itemId, name, description, price]
        );
    } catch (error) {
        throw "Database Error";
    }
};

export { getUserByUsername, getItemById, addItem };
