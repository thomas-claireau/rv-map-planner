require('dotenv').config(); // this is important!

module.exports = {
	development: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		dialect: process.env.DB_DIALECT,
		dialectOptions: {
			timezone: 'local',
		},
		dialectOptions: process.env.DB_DIALECT_OPTIONS
			? {
					socketPath: process.env.DB_DIALECT_OPTIONS,
			  }
			: {},
	},
};
