const converter = require('./converter');
const ui = require('./ui');

module.exports = server => {
    // api
    converter(server);

    // static
    ui(server);
};
