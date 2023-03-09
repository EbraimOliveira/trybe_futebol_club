import * as jwt from 'jsonwebtoken';
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
import { NOT_FOUND, OK, UNPROCESSABLE_ENTITY, CREATED } from '../utils/statusCode';


describe('Test matches entity integrations', async ()=>{
  
  const fakeMatches = matches;
  const fakeInProgressMatches = matches
  .filter((match)=> match.inProgress === true);
  const fakeClosedMatches = matches
  .filter((match)=> match.inProgress === false);
  const userFake = users[1];
  // const fakeId = 43;
  const JwtTest =  new JwtGenerator;
  const TOKEN = JwtTest.tokenGenerator(userFake.id)

  beforeEach(()=>sinon.restore()) 

  it('Fetch all matches',async()=>{
  
    sinon.stub(Match, 'findAll').resolves(fakeMatches);
  
    const response = await chai.request(app).get('/matches');
    expect(response.body).to.be.deep.equal(fakeMatches);
  } )

  it('Fetch inProgress matches',async () => {
    sinon.stub(Match, 'findAll').resolves(fakeInProgressMatches);
  
    const response = await chai.request(app).get('/matches?inProgress=true');
    expect(response.body).to.be.deep.equal(fakeInProgressMatches);
  } )

  it('Fetch closed matches',async () => {
    sinon.stub(Match, 'findAll').resolves(fakeClosedMatches);
  
    const response = await chai.request(app).get('/matches?inProgress=false');
    expect(response.body).to.be.deep.equal(fakeClosedMatches);
  } )

  it('Finish a match',async()=>{
    sinon.stub(jwt, 'verify').resolves(2)
    
    const response = await chai.request(app)
    .patch('/matches/1/finish')
    .set('authorization', 'validToken');
    expect(response.status).to.be.equal(OK)
    expect(response.body).to.be.deep.equal(
      {
        message: 'Finished'
      })
 
  })

  it('Update a match',async()=>{
    sinon.stub(jwt, 'verify').resolves(2)
    
    const response = await chai.request(app)
    .patch('/matches/1')
    .set('authorization', 'validToken')
    .send(
      {
      "homeTeamGoals": 3,
      "awayTeamGoals": 1,
      });
    expect(response.status).to.be.equal(OK)
    expect(response.body).to.be.deep.equal(
      {
        message: 'Easter'
      })
 
  })
  
  it('New Match',async()=>{
    sinon.stub(jwt, 'verify').resolves(2)
    const response = await chai.request(app)
      .post('/matches')
      .set('authorization', 'validToken')
      .send(
        {
        "homeTeamId": 16,
        "awayTeamId": 8,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
        });
    expect(response.status).to.be.equal(CREATED)
    expect(response.body).to.be.deep.equal(
      {
      "id": '',
      "homeTeamId": 16,
      "awayTeamId": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
      "inProgress": true,
      })
  })

  it('New Match Same Teams',async()=>{
    sinon.stub(jwt, 'verify').resolves(2)
    const response = await chai.request(app)
      .post('/matches')
      .set('authorization', 'validToken').send({
        "homeTeamId": 8,
        "awayTeamId": 8,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
      });
    expect(response.status).to.be.equal(UNPROCESSABLE_ENTITY)
    expect(response.body).to.be.deep.equal({
      message: 'It is not possible to create a match with two equal teams'
    })
  })

  it('New Match Invalid Teams',async()=>{
    sinon.stub(jwt, 'verify').resolves(2)
    const response = await chai.request(app)
      .post('/matches')
      .set('authorization', 'validToken').send({
        "homeTeamId": 565658,
        "awayTeamId": 8,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
      });
    expect(response.status).to.be.equal(NOT_FOUND)
    expect(response.body).to.be.deep.equal({
      message: 'There is no team with such id!' 
    })
  })
})