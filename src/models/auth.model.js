module.exports = (sequelize, DataTypes) => {
    const auth = sequelize.define("auths",{
        idUser: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    
    return auth;
};