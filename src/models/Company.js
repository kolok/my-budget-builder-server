'use strict'

module.exports  = function(sequelize, DataTypes) {

  var Company = sequelize.define('Company', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    subdomain: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    firstMonthFiscalYear: {
      type: DataTypes.ENUM,
      defaultValue: '1',
      values: ['1','2','3','4','5','6','7','8','9','10','11','12'],
      field: 'first_month_fiscal_year'
    },
    defaultCurrencyID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'default_currency_id'
    },
    status: {
      type: DataTypes.ENUM,
      defaultValue: 'active',
      values: ['active', 'inactive', 'deleted']
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'updated_at'
    },
    deletedAt: {
      type: DataTypes.DATE,
      field: 'deleted_at'
    }
  }, {underscored: true, tableName: 'companies'})

  /*
   *FIXME : the relation between company and users should be a many to many
   * relationship using a typed link to handle the roles of the user in the
   * company
   */
  Company.associate = function(models) {
    Company.hasMany(models.UserCompany, {
      foreignKey: 'company_id',
      as: 'userCompanies'
    })
    Company.belongsToMany(models.User, {
      through: 'UserCompany',
      as: 'users',
      foreignKey: 'company_id'
    })

    /* Relationship with team */
    Company.hasMany(models.Team, {
      foreignKey: 'company_id',
      as: 'team'
    })

    /*
     * The company has a default currency
     * So the company belongs to a currency
     */
    Company.belongsTo(models.Currency, {
      foreignKey: 'defaultCurrencyID',
      as: 'default_currency'
    })

    /*
     * Also, a company can defined its own currency
     * So a company can have many currencies
     */
    Company.hasMany(models.Currency, {
      foreignKey: 'company_id',
      as: 'currencies',
    })
  }

  return Company
}
