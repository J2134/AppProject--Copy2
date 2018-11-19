module.exports = function( sequelize, DataTypes) {
    return sequelize.define("character", {
        name: DataTypes.STRING,
        race: DataTypes.STRING,
        homeplanet: DataTypes.STRING,
        gender: DataTypes.STRING,
        weapons: DataTypes.STRING,
        biography: DataTypes.TEXT,
        owner: DataTypes.INTEGER,
    
    })
    
}