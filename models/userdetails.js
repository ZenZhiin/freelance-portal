module.exports = function(sequelize, DataTypes) {
    var userdetails = sequelize.define("userdetails", {
        id : {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        firstname : {
            type : DataTypes.TEXT,
            allowNull : false
        },
        lastname :{
            type : DataTypes.TEXT,
            allowNull : false
        },
        email:{
            type : DataTypes.TEXT,
            allowNull : false
        },
        phone : {
            type : DataTypes.TEXT,
            allowNull : false
        },
        experiences : {
            type : DataTypes.TEXT,
            allowNull : true
        },
        skillset : {
            type : DataTypes.TEXT,
            allowNull : true
        },
        hobby :{
            type : DataTypes.TEXT,
            allowNull : true
        },
        achievement  : {
            type : DataTypes.TEXT,
            allowNull : true
        },
        user_id :{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return userdetails;
}