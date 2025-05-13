const dotenv = require('dotenv')
dotenv.config();

const SECRET_KEY_ACCESS = process.env.SECRET_KEY_ACCESS;
const SECRET_KEY_REFRESH = process.env.SECRET_KEY_REFRESH;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;

module.exports = {SECRET_KEY_ACCESS, SECRET_KEY_REFRESH, ADMIN_PASSWORD, ADMIN_USERNAME} 