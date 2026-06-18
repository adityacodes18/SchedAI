const { Pool } = require("pg");

const pool = new Pool({
  user: "adityathakran",
  host: "localhost",
  database: "schedai",
  port: 5432,
});

module.exports = pool;