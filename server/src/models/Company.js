import {sequelize, Sequelize} from '../db/db'
import {User} from './User'
import {Currency} from './Currency'

const Company = sequelize.define("companies", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  subdomain: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  first_month_fiscal_year: {
    type: Sequelize.ENUM,
    defaultValue: '1',
    values: ['1','2','3','4','5','6','7','8','9','10','11','12']
  },
  default_currency_id: {
    type: Sequelize.INTEGER,
    allowNull: true/*,
    references: {
      model: 'Currency',
      key: 'id'
    }*/
  },
  status: {
    type: Sequelize.ENUM,
    defaultValue: 'active',
    values: ['active', 'inactive', 'deleted']
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    field: "created_at"
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    field: "updated_at"
  },
  deletedAt: {
    type: Sequelize.DATE,
    field: "deleted_at"
  }
}, {underscored: true});

//FIXME : the relation between company and usuers should be a many to many
// relationship using a typed link to handle the roles of the user in the
// company

// Companies has many users
Company.hasMany(User, {
  foreignKey: 'company_id',
  as: 'users',
});
//So Users belongs to Company
User.belongsTo(Company, {
  foreignKey: 'company_id',
  as: 'company'
});

// The company has a default currency
// So the company belongs to a currency
Company.belongsTo(Currency, {
  foreignKey: 'default_currency_id',
  as: 'default_currency'
});
// And a currency has many companies
Currency.hasMany(Company, {
  foreignKey: 'default_currency_id',
  as: 'companies',
});

// Also, a company can defined its own currency
// So a company can have many currencies
Company.hasMany(Currency, {
  foreignKey: 'company_id',
  as: 'currencies',
});
// And a currency can belongs to a company
Currency.belongsTo(Company, {
  foreignKey: 'company_id',
  as: 'company'
});
// The currency which aren't belongs by a company are the one open to everybody

export { Company }
