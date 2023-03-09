import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;

import { app } from '../app';
import Match from '../database/models/Match';
import { users, matches } from './mocks';
import JwtGenerator from '../utils/JwtGenerator';


describe('Test matches entity integrations', async ()=>{
  
  const fakeMatches = matches;
  const fakeInProgressMatches = matches
  .filter((match)=> match.inProgress === true);
  const fakeClosedMatches = matches
  .filter((match)=> match.inProgress === false);
  const userFake = users[1]
  const JwtTest =  new JwtGenerator;
  const TOKEN = JwtTest.tokenGenerator(userFake.id)

  beforeEach(()=>sinon.restore()) 

  it('Fetch all matches',async()=>{
  
    sinon.stub(Match, 'findAll').resolves(fakeMatches);
  
    const response = await chai.request(app).get('/matches');
    expect(response.body).to.be.equal(fakeMatches);
  } )

  it('Fetch inProgress matches',async () => {
       sinon.stub(Match, 'findAll').resolves(fakeInProgressMatches);
  
    const response = await chai.request(app).get('/matches?inProgress=true');
    expect(response.body).to.be.equal(fakeInProgressMatches);
  } )

   it('Fetch closed matches',async () => {
       sinon.stub(Match, 'findAll').resolves(fakeClosedMatches);
  
    const response = await chai.request(app).get('/matches?inProgress=false');
    expect(response.body).to.be.equal(fakeClosedMatches);
  } )
  
})