import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      homeTeam: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      homeTeamGoals: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      awayTeam: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      awayTeamGoals: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      inProgress: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
    });
  },

  down: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    await queryInterface.dropTable('matches');
  }
};

