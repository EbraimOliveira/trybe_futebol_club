import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
// import * as jwt from 'jsonwebtoken';

import { app } from '../app';

import User from '../database/models/User';
import { users } from './mocks';
import { BAD_REQUEST, OK, UNAUTHORIZED } from '../utils/statusCode';

const usersFake = users; 
chai.use(chaiHttp);
const { expect } = chai;

describe('Test users entity integrations', async ()=>{
  
  // const TOKEN =  "jwt"
   
  const user = {
    email: "user@user.com",
    password: "secret_user"
  }
  
  beforeEach(()=>sinon.restore()) 
  
  it('Gera um token em caso de retorno true',async () => {
    
    sinon.stub(User, 'findOne' ).resolves(usersFake[1]);
      // sinon.stub(jwt, 'sign' ).resolves(TOKEN);
    
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

  it('Exibe o role do usuario ao passar um token', async () => {
  
   // sinon.stub(User, 'findOne' ).resolves(usersFake[1]);
  
    const payload =  usersFake[1].id;
    console.log('HERE>>>>>', payload, typeof payload);
    
    // sinon.stub(jwt, 'verify' ).callsFake(()=>payload); 
    sinon.stub(User, 'findOne' ).resolves(usersFake[1]);

    // const response = await chai.request(app).get('/login/role').set('Authorization', TOKEN)
    const response = await chai.request(app).get('/login/role').send({id,})

    expect(response.status).to.be.equal(OK);
    expect(response.body).to.be.deep.equal( {role:usersFake[1].role} )
  })

})


  //  {
  //     email: "user@user.com",
  //     id: 2,
  //     password: "$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO",
  //     role: "user",
  //     username: "User",
 //      senha: secret_user
  // },

                













//   it('Testa se o login com o usuário incorreto da erro', async () => {
//     const user = {
//       email: "@admin.com",
//       password: "secret"
//     }
//     const response = await chai.request(app).post('/login').send(user);

//     expect(response.status).to.be.eq(401);
//     expect(response.status).to.not.haveOwnProperty('token')
//     expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' })
//   })

//   it('Testa se o login somente com usuário da erro', async () => {
//     const user = {
//       email: "admisn@admin.com"
//     }
//     const response = await chai.request(app).post('/login').send(user);

//     expect(response.status).to.be.eq(400);
//     expect(response.body).to.be.deep.eq({ message: 'All fields must be filled' })
//   })

//   it('testa se ao usar a rota /login/role a role correta retorna', async () => {
//     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIn0sImlhdCI6MTY3NzcwNDAwNH0.4ue0YNYPWEHbNiO5PvGgbnSLwlW7VxAu6JfFBFCueGU'
//     const response = await chai.request(app).get('/login/role').set('authorization', token);

//     expect(response.status).to.be.eq(200);
//     expect(response.body).to.be.deep.eq({ role: 'admin' })
//   })

//   it('testa se ao usar a rota /login/role', async () => {
//     const token = 'aeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIn0sImlhdCI6MTY3NzcwNDAwNH0.4ue0YNYPWEHbNiO5PvGgbnSLwlW7VxAu6JfFBFCueGU'
//     const response = await chai.request(app).get('/login/role').set('authorization', token);

//     expect(response.status).to.be.eq(401);
//     expect(response.body).to.be.deep.eq({ message: "Token must be a valid token" })
//   })
// })
