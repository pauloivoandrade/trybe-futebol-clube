import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste rota User', () => {

  let chaiHttpResponse: Response;

  afterEach(()=>{
    sinon.restore();
  })

  it('Testando com email vazio', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        "email": "",
        "password": "stringTeste"
      });

    expect(chaiHttpResponse.status).to.be.deep.equal(400);
  });

  it('testando usuario invalido', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        "email": "testeteste@gmail.com",
        "password": "senhateste"
      });

    expect(chaiHttpResponse.status).to.be.deep.equal(401);
  });

  it('Testando email invalido', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        "email": "emailInvalido",
        "password": "senhasenha"
      });

    expect(chaiHttpResponse.status).to.be.deep.equal(401);
  });

  it('Testando senha invalida', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        "email": "emailTeste@gmail.com",
        "password": "aaa"
      });

    expect(chaiHttpResponse.status).to.be.deep.equal(401);
  });

  it('Testando login valido', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        "email": "teste@teste.com",
        "password": "senha_invalida"
      });

    expect(chaiHttpResponse.status).to.be.deep.equal(200);
  });

//   it('Testando o metodo post rota login user invalido 2', async () => {
//     chaiHttpResponse = await chai
//        .request(app).post('/login').send({
//         "email": "admin@admin.com",
//         "password": "secret_admi"
//       });

//     expect(chaiHttpResponse.status).to.be.deep.equal(401);
//   });

  it('Testando o get com login/role', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/login/role').set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsInBhc3N3b3JkIjoiJDJhJDA4JHhpLkh4azFjekFPMG5aUi4uQjM5M3UxMGFFRDBSUTFOM1BBRVhRN0h4dExqS1BFWkJ1LlBXIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2Nzc1OTA1NDF9.QXwSdQYZKCYzLWS7njCAU4Xf46KhRsm3hbCVVVsyNqI');

    expect(chaiHttpResponse.status).to.be.deep.equal(200);
  });

  it('Testando o get com login/role', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/login/role').set('authorization', 'eyJhbGciOiJII1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsInBhc3N3b3JkIjoiJDJhJDA4JHhpLkh4azFjekFPMG5aUi4uQjM5M3UxMGFFRDBSUTFOM1BBRVhRN0h4dExqS1BFWkJ1LlBXIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2Nzc1OTA1NDF9.QXwSdQYZKCYzLWS7njCAU4Xf46KhRsm3hbCVVVsyNqI');

    expect(chaiHttpResponse.status).to.be.deep.equal(401);
  });

  it('Testando o get com login/role', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/login/role')

    expect(chaiHttpResponse.status).to.be.deep.equal(401);
  });

});