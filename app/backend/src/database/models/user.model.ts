import { Model, INTEGER, STRING } from 'sequelize';
import IUser from '../../Interfaces/IUser';
import db from '.';

class User extends Model implements IUser {
  declare id: number;
  declare user: string;
  declare email: string;
  declare role: string;
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
  email: {
    allowNull: false,
    type: STRING,
  },
  role: {
    allowNull: false,
    type: STRING,
  },
  password: {
    allowNull: false,
    type: STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default User;
