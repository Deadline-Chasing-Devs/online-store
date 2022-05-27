import Item from "../models/item.js";
import Vendor from "../models/vendor.js";
import Order from "../models/order.js";

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
            results[0].price,
            results[0].availability
        );
    }
};

// Get order by orderId
const getOrderById = async (pool, orderId) => {
    let results;
    try {
        results = await queryPromise(
            pool,
            "SELECT * FROM `order` WHERE order_id=?",
            [orderId]
        );
    } catch (error) {
        throw "Database Error";
    }

    if (results.length) {
        return new Order(
            results[0].order_id,
            results[0].customer_name,
            results[0].customer_email,
            results[0].customer_address,
            results[0].customer_contact_num,
            results[0].status,
            results[0].date_time
        );
    }
};

// Get items in an order by orderId
const getItemsByOrderId = async (pool, orderId) => {
    let results;
    try {
        results = await queryPromise(
            pool,
            `SELECT * FROM order_item
            INNER JOIN item using(item_id)
            WHERE order_id=?`,
            [orderId]
        );
    } catch (error) {
        throw "Database Error";
    }

    if (results.length) return results;
};

// Get image_ids of an item by itemId
const getImageIdsByItemId = async (pool, itemId) => {
    let results;
    try {
        results = await queryPromise(
            pool,
            "SELECT image_id FROM item_image WHERE item_id = ?",
            [itemId]
        );
    } catch (error) {
        throw "Database Error";
    }

    return results;
};

const getAllOrders = async (pool) => {
    let results;
    try {
        results = await queryPromise(pool, "SELECT * FROM `order`", []);
    } catch (error) {
        console.log(error.message);
        throw "Database Error";
    }

    return results;
};

// Add new item to the database
const addItem = async (
    pool,
    itemId,
    name,
    description,
    price,
    coverPhoto = null,
    availability
) => {
    try {
        await queryPromise(
            pool,
            `INSERT INTO item 
            (item_id, name, description, price, cover_photo, availability)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [itemId, name, description, price, coverPhoto, availability]
        );
    } catch (error) {
        console.log(error.message);
        throw "Database Error";
    }
};

// Edit item
const editItem = async (pool, itemId, name, description, price, availability) => {
    try {
        await queryPromise(
            pool,
            `UPDATE item
            SET name=?, description=?, price=?, availability=?
            WHERE item_id=?`,
            [name, description, price, availability, itemId]
        );
    } catch (error) {
        console.log(error.message);
        throw "Database Error";
    }
};

// Search item by name
const searchItemByName = async (pool, name) => {
    let results;
    try {
        results = await queryPromise(
            pool,
            `SELECT * FROM item
            WHERE LOWER(name) LIKE LOWER(?)`,
            ["%" + name + "%"]
        );
        return results;
    } catch (error) {
        console.log(error.message);
        throw "Database Error";
    }
};

// Add image of an item
const addImage = async (pool, itemId, imageId) => {
    try {
        await queryPromise(
            pool,
            `INSERT INTO item_image
            VALUES (?, ?)`,
            [itemId, imageId]
        );
    } catch (error) {
        console.log(error.message);
        throw "Database Error";
    }
};

// Get items with an offset and a limit
const getItems = async (pool, offset = 0, limit = 10) => {
    let results;
    try {
        results = await queryPromise(
            pool,
            `SELECT * FROM item
            LIMIT ?, ?`,
            [offset, limit]
        );
        if (results.length) return results;
    } catch (error) {
        console.log(error.message);
        throw "Database Error";
    }
};

// Get total item count
const getItemCount = async (pool) => {
    let results;
    try {
        results = await queryPromise(
            pool,
            "SELECT COUNT(*) as count FROM item",
            []
        );
        if (results) return results[0].count;
    } catch (error) {
        console.log(error.message);
        throw "Database Error";
    }
};

// Update order status
const updateOrderStatus = async (pool, orderId, orderStatus) => {
    try {
        await queryPromise(
            pool,
            "UPDATE `order` SET status=? WHERE order_id=?",
            [orderStatus, orderId]
        );
    } catch (error) {
        console.log(error.message);
        throw "Database Error";
    }
};

const deleteItem = async (pool, itemId) => {
    try {
        await queryPromise(pool, "DELETE FROM item WHERE item_id=?", [itemId]);
    } catch (error) {
        console.log(error.message);
        throw "Database Error";
    }
};

const getOrderIdsIncludingItem = async (pool, itemId) => {
    let results;
    try {
        results = await queryPromise(
            pool,
            "SELECT DISTINCT order_id FROM order_item WHERE item_id=?",
            [itemId]
        );
        return results;
    } catch (error) {
        console.log(error.message);
        throw "Database Error";
    }
};
// Get items with an offset and a limit
const getItemsForCustomer = async (pool, offset=0, limit=10) => {
    let results;
    try {
        results = await queryPromise(
            pool,
            `SELECT name,description,item_id,price,cover_photo FROM item
            LIMIT ?, ?`,
            [offset, limit]
        );
        if (results.length) return results;
    } catch (error) {
        console.log(error.message);
        throw "Database Error";
    }
};


export {
    getUserByUsername,
    getItemById,
    getItemsByOrderId,
    getImageIdsByItemId,
    getOrderById,
    getAllOrders,
    addItem,
    editItem,
    searchItemByName,
    addImage,
    getItems,
    getItemCount,
    updateOrderStatus,
    getItemsForCustomer,
    deleteItem,
    getOrderIdsIncludingItem
};
