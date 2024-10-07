const Pool = require("pg").Pool;

const pool = new Pool({
    user: "portal_app",
    password: "samaellilith",
    host: "localhost",
    port: 5432,
    database: "portal_app_db"
});

module.exports = pool;