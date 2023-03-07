import { INTEGER, STRING, Model } from 'sequelize';
import sequelize from '.'; // '.' busca no diretorio local arquivos exportados e da preferencias para INDEX

class Team extends Model {
  // declare <campo>: <tipo>;
  declare id:number;
  declare teamName:string;
}

Team.init({
  // ... Campos
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER, // Pode usar o DataType. ou usar o Ctrl + SPACE
  },
  teamName: {
    allowNull: false,
    type: STRING,
    field: 'team_name',
  },
}, {

  underscored: true,
  sequelize, // esse é a instância do Sequelize com o parâmetro das configurações de conexão.
  timestamps: false,
  modelName: 'teams',
});

export default Team;
