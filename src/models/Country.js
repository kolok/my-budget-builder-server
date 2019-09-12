'use strict'

module.exports  = function(sequelize, DataTypes) {
  var Country = sequelize.define('Country', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    code2: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {underscored: true, tableName: 'countries'})

  Country.associate = function(models) {
    Country.hasMany(models.Entity, {
      foreignKey: 'country_id',
      as: 'entities'
    })
    Country.hasMany(models.Office, {
      foreignKey: 'country_id',
      as: 'offices'
    })
  }

  return Country
}
