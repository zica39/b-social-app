const password = '12345678';
const bcrypt = require('bcrypt-nodejs');
const salt = bcrypt.genSaltSync(8);
module.exports = {
	up: async (queryInterface) => queryInterface.bulkInsert('users', [
		{
			first_name: 'Marko',
			last_name: 'Markovic',
			username: 'marko.markovic',
			email: 'marko.markovic@localhost.com',
			password: bcrypt.hashSync(password, salt),
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			first_name: 'Janko',
			last_name: 'Jankovic',
			username: 'janko.jankovic',
			email: 'janko.jankovic@localhost.com',
			password: bcrypt.hashSync(password, salt),
			createdAt: new Date(),
			updatedAt: new Date(),
		}
	], {}),
	down: async (queryInterface) => {
		await queryInterface.bulkDelete('users', null, {});
	}
}