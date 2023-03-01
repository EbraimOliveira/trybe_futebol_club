import { INTEGER } from 'sequelize';
import { STRING } from 'sequelize';
import { Model } from 'sequelize';
import sequelize from '.'; // '.' busca no diretorio local arquivos exportados e da preferencias para INDEX
// import OtherModel from './OtherModel';

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
        type: INTEGER  // Pode usar o DataType. ou usar o Ctrl + SPACE
      },
      teamName: {
        allowNull: false,
        type: STRING,
        field: 'team_name'
      },
}, {
  // ... Outras configs
  underscored: true,
  sequelize,
  // modelName: 'example',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Team, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Team, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Team.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Team.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Team;
