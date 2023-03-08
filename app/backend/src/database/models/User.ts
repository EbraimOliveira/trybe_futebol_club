import { INTEGER, STRING, Model } from 'sequelize';
import sequelize from '.';

class User extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

User.init({

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  username: {
    allowNull: false,
    type: STRING,
  },
  role: {
    allowNull: false,
    type: STRING,
  },
  email: {
    allowNull: false,
    unique: true,
    type: STRING,
  },
  password: {
    allowNull: false,
    type: STRING,
  },

}, {

  underscored: true,
  sequelize,
  timestamps: false,
  modelName: 'users',
});

export default User;
