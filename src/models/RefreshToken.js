'use strict'

module.exports  = function(sequelize, DataTypes) {
  var RefreshToken = sequelize.define('RefreshToken', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    refreshToken: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'refresh_token'
    },
    info: {
      type: DataTypes.STRING
    },
    isValid: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      field: 'is_valid',
      defaultValue: false
    },
    expiration: {
      allowNull: true,
      type: DataTypes.DATE
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW'),
      field: 'created_at'
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW'),
      field: 'updated_at'
    }
  }, {underscored: true, tableName: 'refresh_tokens'})

  return RefreshToken
}
