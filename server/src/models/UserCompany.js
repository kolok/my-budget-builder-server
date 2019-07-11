import {sequelize, Sequelize} from '../db/db'

const UserCompany = sequelize.define("users_companies", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  company_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Company',
      key: 'id'
    }
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    }
  },
  role: {
    type: Sequelize.ENUM,
    defaultValue: 'client_user',
    values: ['client_admin', 'client_user'],
    allowNull: false
  }
}, {underscored: true});

//FIXME add unicity user_id, company_id

UserCompany.associate = (models) => {
  //So UserCompany belongs to Company
  UserCompany.belongsTo(models.Company, {
    foreignKey: 'company_id',
    as: 'company'
  });
  //So UserCompany belongs to User
  UserCompany.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user'
  });
}

export { UserCompany }
