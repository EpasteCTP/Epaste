'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product_Images = sequelize.define('Product_Images', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    file_directory: DataTypes.TEXT,
    filename: DataTypes.TEXT,
  }, { timestamps: false,});
  Product_Images.associate = function(models) {
    // associations can be defined here
    //Product_Images.belongsTo(models.Product,{foreignKey:'file_directory', sourceKey:'image_path'});
  };
  return Product_Images;
};