import {sequelize, Sequelize} from '../db/db'

const User = sequelize.define("users", {
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
  email: {
    allowNull: false,
    type: Sequelize.STRING,
    unique: true
  },
  token: {
    allowNull: false,
    type: Sequelize.STRING,
    unique: true
  },
  company_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  password: {
    allowNull: false,
    type: Sequelize.STRING
  },
  role: {
    allowNull: false,
    type: Sequelize.STRING,
    defaultValue: 'user'
  },
  loginCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    field: "login_count"
  },
  status: {
    allowNull: false,
    defaultValue: 'active',
    type: Sequelize.ENUM(['active','inactive','deleted'])
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: sequelize.fn('NOW'),
    field: "created_at"
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: sequelize.fn('NOW'),
    field: "updated_at"
  },
  deletedAt: {
    allowNull: true,
    default: undefined,
    type: Sequelize.DATE,
    field: "deleted_at"
  }
}, {underscored: true});

User.associate = (models) => {
  // Companies has many users
  //So Users belongs to Company
  User.belongsTo(models.Company, {
    foreignKey: 'company_id',
    as: 'company'
  });

  User.hasMany(models.UserCompany, {
    foreignKey: 'user_id',
    as: 'userCompanies'
  });

  User.belongsToMany(models.Company, {
    through: 'UserCompany',
    as: 'companies',
    foreignKey: 'user_id'
  });
};

// Instance Method
User.incrementLoginCount = function (id) { this.update({ loginCount: sequelize.literal('login_count + 1') }, { where: { id: id } }); }

export { User }
