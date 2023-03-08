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
        // Configuram o que deve acontecer ao atualizar ou excluir um usuário:
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          // Informa a tabela da referência da associação:
          // references.model: indica qual tabela nossa foreign key está referenciando.
          model: 'teams',
          // Informa a coluna da referência que é a chave correspondente:
          // references.key: indica qual coluna da tabela estrangeira deve ser utilizada para nossa foreign key.
          key: 'id'
        },
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
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'teams',
          key: 'id'
        },
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

  down: async (queryInterface) => {

    await queryInterface.dropTable('matches');

  }
}

// Essa migration cria foreign keys na tabela matches, que relacionam o campo awayTeamId && homeTeamId desta tabela ao campo id da tabela teams.
