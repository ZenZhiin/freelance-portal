module.exports = function(sequelize, DataTypes) {
    var users = sequelize.define("users", {
        id : {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        email : {
            type : DataTypes.TEXT,
            allowNull : false
        },
        password :{
            type : DataTypes.TEXT,
            allowNull : false
        },
        active : {
            type : DataTypes.BOOLEAN,
            allowNull : false
        }
    });
    return users;
}