import * as sinon from 'sinon';  // * serve para importar tudo da dependecia uma vez que ela não possui o INDEX. Quando há o INDEX não é necessario o *
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import teams from './mocks';
import Team from '../database/models/Team';

chai.use(chaiHttp);
const { expect } = chai;


describe('Testa as integrações da entidade teams', ()=>{
  
  let chaiHttpResponse: Response;
  const teamsMock = teams as unknown as Team[];

  it('GetAll',async () => {

  before(async () => { sinon
    .stub(Team, 'findAll')
  .resolves({
        ...teamsMock
      } as Team[]);
  });
  after(()=>{
    (Team.findAll as sinon.SinonStub).restore();
  })
      chaiHttpResponse = await chai.request(app).get('/teams');
      expect(chaiHttpResponse.body).to.be.deep.equal(teams);

  })






})


// POST, GET, etc === metodos http