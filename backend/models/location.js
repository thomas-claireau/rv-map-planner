'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Location.init({
    lat: DataTypes.DECIMAL(8,6),
    lng: DataTypes.DECIMAL(9,6),
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Location',
  });
  return Location;
};