'use strict'

module.exports  = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
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
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    defaultLanguage: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'en',
      field: 'default_language'
    },
    password: {
      allowNull: true,
      type: DataTypes.STRING
    },
    loginCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'login_count'
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
  }, {underscored: true, tableName: 'users'})

  User.associate = function(models) {

    User.hasMany(models.UserCompany, {
      foreignKey: 'userID',
      as: 'userCompanies'
    })

    User.belongsToMany(models.Company, {
      through: 'UserCompany',
      as: 'companies',
      foreignKey: 'userID'
    })

  }

  // Instance Method
  User.incrementLoginCount = function (id) {
    this.update({ loginCount: sequelize.literal('login_count + 1') },
      { where: { id: id } })
  }

  return User
}
