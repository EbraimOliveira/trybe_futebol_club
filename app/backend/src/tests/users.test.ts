import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;

import { app } from '../app';
import User from '../database/models/User';
import { users } from './mocks';
import { BAD_REQUEST, OK, UNAUTHORIZED } from '../utils/statusCode';
import JwtGenerator from '../utils/JwtGenerator';


describe('Test users entity integrations', async ()=>{
  
  const usersFake = users; 
  const userFake =  usersFake[1]
  const JwtTest =  new JwtGenerator;
  const TOKEN = JwtTest.tokenGenerator(userFake.id)
  
  const user = {
    email: "user@user.com",
    password: "secret_user"
  }
  
  beforeEach(()=>sinon.restore()) 
  
  it('Gera um token em caso de retorno true',async () => {
    
    sinon.stub(User, 'findOne' ).resolves(usersFake[1]);

    const chaiHttpResponse = await chai.request(app).post('/login').send(user);
    expect(chaiHttpResponse.status).to.be.equal(OK);
    expect(chaiHttpResponse.body).to.have.key("token") 
  })

  it('Gera mensagem de erro em caso de retorno null',async () => {
  
    sinon.stub(User, 'findOne' ).resolves(null);
    
    const chaiHttpResponse = await chai.request(app).post('/login').send(user);
    expect(chaiHttpResponse.status).to.be.equal(UNAUTHORIZED);
    expect(chaiHttpResponse.body).to.be.deep.equal( 
      {
       "message": "Invalid email or password" 
      }) 
  })

  it('Ao fazer login sem o email retorna um erro', async () => {
  
    sinon.stub(User, 'findOne' ).resolves(null);
    const response = await chai.request(app).post('/login').send({password: user.password})

    expect(response.status).to.be.equal(BAD_REQUEST);
    expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' })
  })

  it('Ao fazer login sem o password retorna um erro', async () => {
  
    sinon.stub(User, 'findOne' ).resolves(null);
    const response = await chai.request(app).post('/login').send({email: user.email})

    expect(response.status).to.be.equal(BAD_REQUEST);
    expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' })
  })

  it('Ao fazer login com o password incorreto retorna um erro', async () => {
  
    const response = await chai.request(app).post('/login').send(
      {
        email: "user@user.com",
        password: "error"
      })

    expect(response.status).to.be.equal(UNAUTHORIZED);
    expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' })
  })

  it('Ao fazer login com o email incorreto retorna um erro', async () => {
  
    const response = await chai.request(app).post('/login').send(
      {
        email: "error",
        password: "secret_user"
      })

    expect(response.status).to.be.equal(UNAUTHORIZED);
    expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' })
  })

  it('Exibe o role do usuario ao passar um token valido', async () => {
  
    sinon.stub(User, 'findOne' ).resolves(userFake);

    const response = await chai.request(app).get('/login/role').set({'Authorization': TOKEN}) 

    expect(response.status).to.be.equal(OK);
    expect(response.body).to.be.deep.equal( {role:userFake.role} )
  })

  it('Exibe um erro ao passar token invalido', async () => {

    sinon.stub(User, 'findOne' ).resolves(userFake);

    const response = await chai.request(app).get('/login/role').set({'Authorization': `fail${TOKEN}`}) 

    expect(response.status).to.be.equal(UNAUTHORIZED);
    expect(response.body).to.be.deep.equal( {message: 'Token must be a valid token'} )
  })

  it('Exibe um erro ao nao passar token', async () => {

    sinon.stub(User, 'findOne' ).resolves(userFake);

    const response = await chai.request(app).get('/login/role').set({'Authorization': ''}) 

    expect(response.status).to.be.equal(UNAUTHORIZED);
    expect(response.body).to.be.deep.equal( { message: 'Token not found' } )
  })
})


