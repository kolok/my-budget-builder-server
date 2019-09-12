'use strict'

module.exports  = function(sequelize, DataTypes) {
  var UserCompany = sequelize.define('UserCompany', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Company',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
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
      foreignKey: 'company_id',
      as: 'company'
    })
    //So UserCompany belongs to User
    UserCompany.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    })
  }

  return UserCompany
}
