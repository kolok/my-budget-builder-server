import {sequelize, Sequelize} from '../db/db'

const Currency = sequelize.define("currencies", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING
  },
  symbol: {
    allowNull: false,
    type: Sequelize.STRING
  },
  company_id: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  comment: {
    allowNull: true,
    type: Sequelize.STRING
  }
}, {underscored: true});

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

export { Currency }
