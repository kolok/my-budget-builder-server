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


export { Currency }
