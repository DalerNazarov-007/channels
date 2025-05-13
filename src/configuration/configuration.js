const dotenv = require('dotenv')
dotenv.config();

const SECRET_KEY_ACCESS = process.env.SECRET_KEY_ACCESS;
const SECRET_KEY_REFRESH = process.env.SECRET_KEY_REFRESH;

module.exports = {SECRET_KEY_ACCESS, SECRET_KEY_REFRESH} 