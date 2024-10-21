// models/user.js

export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      // Define the columns in the table
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      // Optional settings, like timestamps
      timestamps: true,  // Automatically adds `createdAt` and `updatedAt`
    });
  
    return User;
  };
  