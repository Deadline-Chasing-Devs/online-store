import { unlink } from "node:fs/promises";

// Create session cookie
export const sessionizeUser = (user) => {
    return { username: user.username };
};

// Delete file when the path is given
export const deleteFile = async (path) => {
    try {
        await unlink(path);
        console.log("successfully deleted " + path);
    } catch (error) {
        console.error("There was an error: ", error.message);
    }
};
