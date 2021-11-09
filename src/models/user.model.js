module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define("users",{
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            isUnique: true,
            allowNull: false,
            validate: {
                isEmail: {msg: 'Please enter your email'}
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        permission: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idUser: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING,
        }
    });
    
    return users;
};