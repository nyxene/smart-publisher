const dotenv = require('dotenv');

dotenv.config();

const API_ROOT = process.env.API_ROOT;
const API_VERSION = process.env.API_VERSION;
const LOG_LEVEL = process.env.LOG_LEVEL || 'debug';
const PORT = process.env.PORT;
const SERVER_NAME = process.env.SERVER_NAME;

module.exports = {
    API_ROOT,
    API_VERSION,
    LOG_LEVEL,
    PORT,
    SERVER_NAME
};
