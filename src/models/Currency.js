'use strict'

module.exports  = function(sequelize, DataTypes) {
  var Currency = sequelize.define('Currency', {
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
    symbol: {
      allowNull: false,
      type: DataTypes.STRING
    },
    companyID: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'company_id'
    },
    comment: {
      allowNull: true,
      type: DataTypes.STRING
    }
  }, {underscored: true, tableName: 'currencies'})

  Currency.associate = (models) => {
    // Currency has many companies
    Currency.hasMany(models.Company, {
      foreignKey: 'defaultCurrencyID',
      as: 'companies',
    })

    /*
     * Currency can belongs to a company
     * The currency which aren't belongs by a company are the one open to
     * everybody
     */
    Currency.belongsTo(models.Company, {
      foreignKey: 'companyID',
      as: 'company'
    })
  }

  return Currency
}
