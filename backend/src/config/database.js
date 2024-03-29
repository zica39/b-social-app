require('dotenv').config();
module.exports = {
	username: process.env.DB_USER || "root",
	password: process.env.DB_PASSWORD || "root",
	database: process.env.DB_NAME || "bsocial",
	host: process.env.DB_HOST || "localhost",
	dialect: process.env.DB_DIALECT || "mysql",
}
