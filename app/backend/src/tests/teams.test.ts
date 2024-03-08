import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp from 'chai-http';

import { App } from '../app'
import teamsMock from './mocks/team.mock';

import { Response } from 'superagent';
import Team from '../database/models/teams.model';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testa a rota /teams', () => {

  let response: Response;

  afterEach(function() { sinon.restore() });

  describe('Teste GET na rota /teams', () => {
    it('Lista todos os times', async () => {

      sinon.stub(Team, "findAll").resolves(teamsMock as unknown as Team[]);

      const response = await chai
              .request(app)
              .get('/teams');


      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(teamsMock);

    });
    it('Buscar um time especifico pelo Id', async () => {

      sinon.stub(Team, "findByPk").resolves(teamsMock[0] as unknown as Team);

      const response = await chai
              .request(app)
              .get('/teams/1');


      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(teamsMock[0]);

    });
  });
});