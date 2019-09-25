'use strict'

module.exports  = function(sequelize, DataTypes) {
  var UserCompany = sequelize.define('UserCompany', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    companyID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Company',
        key: 'id'
      },
      field: 'company_id'
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      },
      field: 'user_id'
    },
    role: {
      type: DataTypes.ENUM,
      defaultValue: 'client_user',
      values: ['client_admin', 'client_user'],
      allowNull: false
    }
  }, {underscored: true, tableName: 'users_companies'})

  //FIXME add unicity user_id, company_id

  UserCompany.associate = (models) => {
    //So UserCompany belongs to Company
    UserCompany.belongsTo(models.Company, {
      foreignKey: 'companyID',
      as: 'company'
    })
    //So UserCompany belongs to User
    UserCompany.belongsTo(models.User, {
      foreignKey: 'userID',
      as: 'user'
    })
  }

  return UserCompany
}
