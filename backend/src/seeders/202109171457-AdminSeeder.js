const password = '12345678';
const bcrypt = require('bcrypt-nodejs');
const salt = bcrypt.genSaltSync(8);
const {ADMIN} = require("../constants/RoleConstants");
module.exports = {
	up: async (queryInterface) => queryInterface.bulkInsert('users', [
		{
			role_id: ADMIN.id,
			first_name: "Zeljko",
			last_name: "Ivanovic",
			username: 'admin',
			email: 'admin@localhost.com',
			password: bcrypt.hashSync(password, salt),
			createdAt: new Date(),
			updatedAt: new Date(),

		},
	], {}),
	down: async (queryInterface) => {
		await queryInterface.bulkDelete('users', null, {});
	}
}