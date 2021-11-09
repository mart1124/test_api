module.exports = (sequelize, DataTypes) => {
    const history = sequelize.define("history",{
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pic: {
            // type: DataTypes.BLOB("long"),
            type: DataTypes.STRING,
        },
        Location: {
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
    
    return history;
};