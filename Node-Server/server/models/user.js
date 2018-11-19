module.exports = function( sequelize, DataTypes) {
 return sequelize.define("user", {
        username: {
            type: DataTypes.STRING,
            notEmpty: true,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            notEmpty: true
        }
    })
}