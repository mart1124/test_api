module.exports = (sequelize, DataTypes) => {
    const filesStorage = sequelize.define("fileStorages",{
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        data: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        helmet_count: {
            type: DataTypes.INTEGER,
            
        },
        not_helmet_count: {
            type: DataTypes.INTEGER,
            
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    });
    
    return filesStorage;
};