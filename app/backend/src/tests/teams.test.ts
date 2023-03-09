import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;

import { app } from '../app';
import { Response } from 'superagent';
import Team from '../database/models/Team';
import { teams } from './mocks';


describe('Test teams entity integrations', ()=>{
  
  const teamsFake = teams;
  // a variável chai... vai ser do tipo response, que é um objeto com chave e valor.
  let chaiHttpResponse: Response; 
  // sempre que encerrar um teste restaura todos os mocks.
  beforeEach(()=>sinon.restore()) 
  
  it('Get all teams',async () => {

    // o sinon.stub aqui indica que quando o metodo findaAll de Team for chamado ele deve acessar o teamsFake e não o DB
     sinon.stub(Team, 'findAll').resolves(teamsFake); 
  
    chaiHttpResponse = await chai.request(app).get('/teams');
    // espera-se que o retorno será do mesmo tipo que chai.body (any)
    expect(chaiHttpResponse.body).to.be.deep.equal(teamsFake); 
  })

  it('Get team by id',async () => {       
    
      sinon.stub(Team, 'findByPk').resolves(teamsFake[0])
  
    chaiHttpResponse = await chai.request(app).get('/teams/1');
    expect(chaiHttpResponse.body).to.be.deep.equal(teamsFake[0]);
  })

})

// type Object[] === Array<Object>
// POST, GET, etc === metodos http