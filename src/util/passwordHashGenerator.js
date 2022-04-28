import bcrypt from "bcrypt";

const generateHash = (password) => {
    return bcrypt.hashSync(password, 10);
};

console.log(generateHash("yourpassword"));
