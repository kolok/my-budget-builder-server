import {sequelize, Sequelize} from '../db/db'
import {Company} from './Company'

const User = sequelize.define("users", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING,
    unique: true
  },
  email: {
    allowNull: false,
    type: Sequelize.STRING,
    unique: true
  },
  company_id: {
    type: Sequelize.INTEGER,
    allowNull: false/*,
    references: {
      model: 'Company',
      key: 'id'
    }*/
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

// Instance Method
User.incrementLoginCount = function (id) { this.update({ loginCount: sequelize.literal('login_count + 1') }, { where: { id: id } }); }

export { User }
