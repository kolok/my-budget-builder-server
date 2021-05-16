'use strict'

module.exports  = function(sequelize, DataTypes) {
  var Entity = sequelize.define('Entity', {
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
    taxeRate: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'taxe_rate'
    },
    countryID: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'country_id'
    },
    companyID: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'company_id'
    },
    defaultCurrencyID: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'default_currency_id'
    },
    status: {
      allowNull: false,
      defaultValue: 'active',
      type: DataTypes.ENUM(['active','inactive','deleted'])
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
  }, {underscored: true, tableName: 'entities'})

  Entity.associate = function(models) {
    Entity.hasMany(models.Office, {
      foreignKey: 'entityID',
      as: 'offices'
    })

    Entity.belongsTo(models.Company, {
      foreignKey: 'companyID',
      as: 'company'
    })

    Entity.belongsTo(models.Country, {
      foreignKey: 'countryID',
      as: 'country'
    })

    Entity.belongsTo(models.Currency, {
      foreignKey: 'defaultCurrencyID',
      as: 'currency'
    })

  }

  return Entity
}
