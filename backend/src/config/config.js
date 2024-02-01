require('dotenv').config();
const db = require('./database');
module.exports = {
	app: {
		port: process.env.APP_PORT || 3000,
		url: process.env.APP_URL || 'http://localhost:3000',
		env: process.env.APP_ENV || 'dev'
	},
	db: {
		database: db.database,
		user: db.username,
		password: db.password,
		options: {
			dialect: db.dialect,
			host: db.host,
			logging: customLogger
		}
	},
	auth: {
		jwtSecret: process.env.JWT_SECRET || 'secret',
		refreshJwtSecret: process.env.JWT_REFRESH_SECRET || 'refresh_secret',
		jwtTTL: process.env.JWT_TTL || 3600,
		refreshJwtTTL: process.env.JWT_TTL_REFRESH || 18400
	},
	storage: {
		wallpapersStoragePath: '/AssetBundles/'
	}
}
function customLogger ( queryString, queryObject ) {
	console.log("==============================QUERY=========================================")
	console.log( queryString )      // outputs a string
}
