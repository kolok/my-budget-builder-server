'use strict'

module.exports  = function(sequelize, DataTypes) {
  var Entity = sequelize.define('Entity', {
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
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    default_currency_id: {
      type: DataTypes.INTEGER,
      allowNull: true
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
      foreignKey: 'entity_id',
      as: 'offices'
    })

    Entity.belongsTo(models.Company, {
      foreignKey: 'company_id',
      as: 'company'
    })

    Entity.belongsTo(models.Country, {
      foreignKey: 'country_id',
      as: 'country'
    })

    Entity.belongsTo(models.Currency, {
      foreignKey: 'default_currency_id',
      as: 'currency'
    })

  }

  return Entity
}
