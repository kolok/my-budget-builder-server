'use strict'

module.exports  = function(sequelize, DataTypes) {
  var Office = sequelize.define('Office', {
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
    address: {
      allowNull: true,
      type: DataTypes.STRING
    },
    zipcode: {
      allowNull: true,
      type: DataTypes.STRING
    },
    town: {
      allowNull: true,
      type: DataTypes.STRING
    },
    countryID: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'country_id'
    },
    companyID: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'company_id'
    },
    entityID: {
      type: DataTypes.UUID,
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
