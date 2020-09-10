const jwt = require('jsonwebtoken');
const db = require('../config/database');
const { JWT_SALT } = require('../config/constants');

const tableName = 'users';
module.exports = class Users {
    constructor(mobile, email, password) {
        this.mobile = mobile || null;
        this.email = email || null;
        this.password = password || null;
    }
    create() {
        console.log('this', Object.values(this))
        return db.query('CALL createUser(?,?,?)', Object.values(this));
    }
    static findOne(input) {
        const { mobile = null, email = null, password = null, userId = null } = input;
        return db.query('CALL getUser(?,?,?,?)', [mobile, email, password, userId]);
    }
    static generateToken(input) {
        return jwt.sign(input, JWT_SALT, { expiresIn: 360000 }).toString();
    }
    static getDetailsFromToken(token) {
        const decode = jwt.verify(token, JWT_SALT);
        return this.findOne(decode);
    }
}