const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "samaellilith",
    host: "localhost",
    port: 5432,
    database: "exp_v2"
});

module.exports = pool;