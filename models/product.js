'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    description: DataTypes.TEXT,
    stock: DataTypes.INTEGER,
    image_path: DataTypes.TEXT
  }, { timestamps: false,});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};