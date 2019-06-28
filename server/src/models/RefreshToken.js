import {sequelize, Sequelize} from '../db/db'

const RefreshToken = sequelize.define("refresh_tokens", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  email: {
    allowNull: false,
    type: Sequelize.STRING
  },
  refreshToken: {
    allowNull: false,
    type: Sequelize.STRING,
    field: "refresh_token"
  },
  info: {
    type: Sequelize.STRING
  },
  isValid: {
    allowNull: false,
    type: Sequelize.BOOLEAN,
    field: "is_valid",
    defaultValue: false
  },
  expiration: {
    allowNull: true,
    type: Sequelize.DATE
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
  }
}, {underscored: true});

export { RefreshToken }
