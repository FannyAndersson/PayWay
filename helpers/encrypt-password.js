const crypto = require('crypto');
const salt = 'lussekatter are the best'; // unique secret

/****
 * Password encryption
 */

function encryptPassword(password) {
    return crypto
        .createHmac('sha256', salt)
        .update(password)
        .digest('hex');
}

module.exports = encryptPassword;
