'use strict'

module.exports  = function(sequelize, DataTypes) {
  var Country = sequelize.define('Country', {
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID
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
      foreignKey: 'countryID',
      as: 'entities'
    })
    Country.hasMany(models.Office, {
      foreignKey: 'countryID',
      as: 'offices'
    })
  }

  return Country
}
