'use strict'

module.exports  = function(sequelize, DataTypes) {
  var Office = sequelize.define('Office', {
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
    address: {
      allowNull: false,
      type: DataTypes.STRING
    },
    zipcode: {
      allowNull: false,
      type: DataTypes.STRING
    },
    town: {
      allowNull: false,
      type: DataTypes.STRING
    },
    countryID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'country_id'
    },
    companyID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'company_id'
    },
    entityID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'entity_id'
    },
    status: {
      allowNull: false,
      defaultValue: 'active',
      type: DataTypes.ENUM(['active','deleted'])
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
    },
    deletedAt: {
      allowNull: true,
      default: undefined,
      type: DataTypes.DATE,
      field: 'deleted_at'
    }
  }, {underscored: true, tableName: 'offices'})

  Office.associate = function(models) {
    Office.belongsTo(models.Company, {
      foreignKey: 'companyID',
      as: 'company'
    })
    Office.belongsTo(models.Entity, {
      foreignKey: 'entityID',
      as: 'entity'
    })
    Office.belongsTo(models.Country, {
      foreignKey: 'countryID',
      as: 'country'
    })

  }

  return Office
}
