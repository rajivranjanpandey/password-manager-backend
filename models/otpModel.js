const db = require('../config/database');

const tableName = 'temp_otp';
module.exports = class Otp {
    constructor(mobile) {
        this.mobile_no = mobile;
        this.otp = Math.floor(1000 + Math.random() * 9000);
        this.created_at = new Date();
        this.updated_at = new Date();
    }
    setOtp() {
        return db.query('CALL otpAddOrUpdate(?,?,?,?)', [this.mobile_no, this.otp, this.created_at, this.updated_at])
    }
    static getOtp(mobile_no) {
        return db.query('SELECT otp from temp_otp WHERE mobile_no = ?', [mobile_no]);
    }
}