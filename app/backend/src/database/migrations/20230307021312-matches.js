'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      homeTeamId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'home_team_id',
        references: {
          model: 'teams',
          key: 'id'
        },
        // onUpdate: 'CASCADE',
        // onUpdate: 'CASCADE',
      },
      homeTeamGoals: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'home_team_goals'
      },
      awayTeamId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'away_team_id',
        references: {
          model: 'teams',
          key: 'id'
        },
        // onUpdate: 'CASCADE',
        // onUpdate: 'CASCADE',
      },
      awaiTeamGoals: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'away_team_goals'
      },
      inProgress: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        field: 'in_progress'
      }
    })
  },

  //Como funciona esse 'CASCADE'?
  //Quando criamos uma chave estrangeira usando UPDATE CASCADE, as linhas de referência são atualizadas na tabela filha quando a linha referenciada é atualizada na tabela pai que possui uma chave primária.

  down: async (queryInterface) => {

    await queryInterface.dropTable('matches');

  }
}
