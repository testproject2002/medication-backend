// models/item.js

export default (sequelize, DataTypes) => {
    const Item = sequelize.define('Item', {
      itemName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,  // Ensures that itemName cannot be empty
          len: [1, 255]    // Optional: restricts the length of itemName
        }
      }
    }, {
      timestamps: true,  // Automatically adds `createdAt` and `updatedAt`
      tableName: 'items' // Optional: customize the table name
    });
  
    return Item;
  };
  