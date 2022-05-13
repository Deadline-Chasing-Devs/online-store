import bcrypt from "bcrypt";
import process from "node:process";

const generateHash = (password) => {
    return bcrypt.hashSync(password, 10);
};
console.log(process.argv[2]);
console.log(generateHash(process.argv[2]));
