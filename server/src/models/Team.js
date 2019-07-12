'use strict';

module.exports  = function(sequelize, DataTypes) {
  var Team = sequelize.define('Team', {
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
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      allowNull: false,
      defaultValue: 'active',
      type: DataTypes.ENUM(['active','deleted'])
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW'),
      field: "created_at"
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW'),
      field: "updated_at"
    },
    deletedAt: {
      allowNull: true,
      default: undefined,
      type: DataTypes.DATE,
      field: "deleted_at"
    }
  }, {underscored: true, tableName: 'teams'});

  Team.associate = function(models) {
    // Companies has many users
    //So Users belongs to Company
    Team.belongsTo(models.Company, {
      foreignKey: 'company_id',
      as: 'company'
    });

  };

  return Team
}
