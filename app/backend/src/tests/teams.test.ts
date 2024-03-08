import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/teams.model';
import ITeam from '../Interfaces/ITeam';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do Teams', () => {

  let chaiHttpResponse: Response;

  afterEach(()=>{
    sinon.restore();
  })

  it('Get retorna todas os times', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/teams')

    expect(chaiHttpResponse.status).to.be.deep.equal(200);
  });

  it('Testando get by id retorna um time', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/teams/2');

    expect(chaiHttpResponse.status).to.be.deep.equal(200);
  });

});