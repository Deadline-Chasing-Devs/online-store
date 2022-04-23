import bcrypt from "bcrypt";

class Vendor {
    constructor(username, passwordHash) {
        this.username = username;
        this.passwordHash = passwordHash;
    }

    isValidPassword(password) {
        return bcrypt.compareSync(password, this.passwordHash);
    }
}

export default Vendor;
