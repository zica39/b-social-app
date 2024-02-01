module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Role', {
		id : {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'roles'
	});
}