module.exports = function( sequelize, DataTypes) {
    return sequelize.define("faction", {
        name: DataTypes.STRING,
        baseplanet: DataTypes.STRING,
        owner: DataTypes.INTEGER,
    })
    
}