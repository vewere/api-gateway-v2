'use strict';
module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define('Service', {
    name: DataTypes.STRING,
    protocol: DataTypes.STRING,
    host: DataTypes.STRING,
    port: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {});
  Service.associate = function(models) {
    // associations can be defined here
  };
  return Service;
};