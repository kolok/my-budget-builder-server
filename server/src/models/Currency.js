'use strict';

module.exports  = function(sequelize, DataTypes) {
  var Currency = sequelize.define('Currency', {
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
    symbol: {
      allowNull: false,
      type: DataTypes.STRING
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    comment: {
      allowNull: true,
      type: DataTypes.STRING
    }
  }, {underscored: true, tableName: 'currencies'});

  Currency.associate = (models) => {
    // Currency has many companies
    Currency.hasMany(models.Company, {
      foreignKey: 'default_currency_id',
      as: 'companies',
    });

    // Currency can belongs to a company
    // The currency which aren't belongs by a company are the one open to everybody
    Currency.belongsTo(models.Company, {
      foreignKey: 'company_id',
      as: 'company'
    });
  }

  return Currency
}
