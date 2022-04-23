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

export { getUserByUsername };
