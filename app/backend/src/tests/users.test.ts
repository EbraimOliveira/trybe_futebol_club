// import * as sinon from 'sinon';
// import * as chai from 'chai';
// // @ts-ignore
// import chaiHttp = require('chai-http');

// import { app } from '../app';

// import { Response } from 'superagent';

// import User from '../database/models/User';
// import { users } from './mocks';
// const usersFake = users; 

// chai.use(chaiHttp);
// const { expect } = chai;

// describe('Test users entity integrations', ()=>{
   
//   let chaiHttpResponse: Response; 
//   const user = {
//   email: "string",
//   password: "string"
// }


//   afterEach(sinon.restore) 
  
//   it('',async () => {
//     before(async () =>
//     { sinon.stub(User, 'login' ).resolves(usersFake)});

//     chaiHttpResponse = await chai.request(app).post('/login');

//   })

//   it('',async () => {       
//   })

// // O método hasOwnProperty() retorna um booleano indicando se o objeto possui a propriedade especificada como uma propriedade definida no próprio objeto em questão
// })


// //   it('Testa se o login com o usuario correto volta com o status 200 e token', async () => {
// //     const user = {
// //       email: "admin@admin.com",
// //       password: "secret_admin"
// //     }
// //     const response = await chai.request(app).post('/login').send(user);

// //     expect(response.status).to.be.eq(200);
// //     expect(response.body).to.haveOwnProperty('token')
// //   });

// //   it('Testa se o login com o usuário incorreto da erro', async () => {
// //     const user = {
// //       email: "admisn@admin.com",
// //       password: "secret"
// //     }
// //     const response = await chai.request(app).post('/login').send(user);

// //     expect(response.status).to.be.eq(401);
// //     expect(response.status).to.not.haveOwnProperty('token')
// //     expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' })
// //   })

// //   it('Testa se o login com o usuário incorreto da erro', async () => {
// //     const user = {
// //       email: "@admin.com",
// //       password: "secret"
// //     }
// //     const response = await chai.request(app).post('/login').send(user);

// //     expect(response.status).to.be.eq(401);
// //     expect(response.status).to.not.haveOwnProperty('token')
// //     expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' })
// //   })

// //   it('Testa se o login somente com usuário da erro', async () => {
// //     const user = {
// //       email: "admisn@admin.com"
// //     }
// //     const response = await chai.request(app).post('/login').send(user);

// //     expect(response.status).to.be.eq(400);
// //     expect(response.body).to.be.deep.eq({ message: 'All fields must be filled' })
// //   })

// //   it('testa se ao usar a rota /login/role a role correta retorna', async () => {
// //     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIn0sImlhdCI6MTY3NzcwNDAwNH0.4ue0YNYPWEHbNiO5PvGgbnSLwlW7VxAu6JfFBFCueGU'
// //     const response = await chai.request(app).get('/login/role').set('authorization', token);

// //     expect(response.status).to.be.eq(200);
// //     expect(response.body).to.be.deep.eq({ role: 'admin' })
// //   })

// //   it('testa se ao usar a rota /login/role', async () => {
// //     const token = 'aeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIn0sImlhdCI6MTY3NzcwNDAwNH0.4ue0YNYPWEHbNiO5PvGgbnSLwlW7VxAu6JfFBFCueGU'
// //     const response = await chai.request(app).get('/login/role').set('authorization', token);

// //     expect(response.status).to.be.eq(401);
// //     expect(response.body).to.be.deep.eq({ message: "Token must be a valid token" })
// //   })
// // })
