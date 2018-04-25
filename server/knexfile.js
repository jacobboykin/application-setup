const config = require("./config.json");
const env = process.env.NODE_ENV;

if (!env) throw "You must specify a NODE_ENV!";
if (!config[env]) throw "The NODE_ENV given is invalid!";

module.exports = {
  development: {
    client: "mysql2",
    debug: true,
    connection: {
      host: config[env].DB_HOST,
      port: config[env].DB_PORT,
      user: config[env].DB_USER,
      password: config[env].DB_PASSWORD,
      database: config[env].DB_NAME
    },
    migrations: {
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds/dev"
    }
  }
};
