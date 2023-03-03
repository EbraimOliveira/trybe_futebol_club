import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import Team from '../database/models/Team';
import teamsFake from './mocks';

chai.use(chaiHttp);
const { expect } = chai;

describe('Test teams entity integrations', ()=>{
   
  let chaiHttpResponse: Response; // a variável chai... vai ser do tipo response, que é um objeto com chave e valor.
  afterEach(sinon.restore) // sempre que encerrar um teste restaura todos os mocks.
  
  it('Get all teams',async () => {
    before(async () => 
      { sinon.stub(Team, 'findAll').resolves(teamsFake)});  // o sinon.stub aqui indica que quando o metodo findaAll de Team for chamado ele deve acessar o teamsFake e não o DB
  
    chaiHttpResponse = await chai.request(app).get('/teams');
    expect(chaiHttpResponse.body).to.be.deep.equal(teamsFake); // espera-se que o retorno sera do mesmo tipo que chai.body (any)
  })

  it('Get team by id',async () => {       
    before(async () => 
      { sinon.stub(Team, 'findByPk').resolves(teamsFake[0])})
  
    chaiHttpResponse = await chai.request(app).get('/teams/1');
    expect(chaiHttpResponse.body).to.be.deep.equal(teamsFake[0]);
  })

})

// type Object[] === Array<Object>
// POST, GET, etc === metodos http