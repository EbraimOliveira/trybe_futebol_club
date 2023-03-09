import { BOOLEAN, INTEGER, Model } from 'sequelize';
import sequelize from '.';
import Team from './Team';

class Match extends Model {
  declare id?: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeamId: {
    allowNull: false,
    type: INTEGER,
    field: 'home_team_id',
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
    field: 'home_team_goals',
  },
  awayTeamId: {
    allowNull: false,
    type: INTEGER,
    field: 'away_team_id',
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
    field: 'away_team_goals',
  },
  inProgress: {
    allowNull: false,
    type: BOOLEAN,
    field: 'in_progress',
  },

}, {
  underscored: true,
  timestamps: false, // remove a obrigatoriedade de utilizar os campos `createdAt` e `updatedAt`
  sequelize,
  modelName: 'matches',
});

Match.belongsTo(Team, { foreignKey: 'homeTeamId', as: 'homeTeam' });
// Match pertence a Team e a fk homeTeamId (ex:7) será buscada na tabela teams e será chamda de homeTeam
Match.belongsTo(Team, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default Match;

// README: Você deverá definir os relacionamentos para homeTeam e awayTeam somente na model de partidas
