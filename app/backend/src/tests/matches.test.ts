import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import matchesMock from './mocks/matches.mock';

import { Response } from 'superagent';
import Match from '../database/models/match.model';
import Team from '../database/models/teams.model';
import IMatch from '../Interfaces/IMatch';
import * as jsonwebtoken from 'jsonwebtoken';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testando a rota /matches', () => {

  let response: Response;

  afterEach(function() { sinon.restore() });

  describe('Testando GET na rota /matches', () => {
    it('E posivel obter todos os dados', async () => {

      sinon.stub(Match, "findAll").resolves(matchesMock as unknown as Match[]);

      const response = await chai
              .request(app)
              .get('/matches');


      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(matchesMock);
    });
  });

  describe('Testando GET na rota /matches?inProgress=true', () => {
    it('Obtem todas as partidas que em progresso', async () => {

      const matchesInProgress = matchesMock.filter((match) => match.inProgress === true);

      sinon.stub(Match, "findAll").resolves(matchesInProgress as unknown as Match[]);

      const response = await chai
              .request(app)
              .get('/matches?inProgress=true');


      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(matchesInProgress);
    });

    it('Obtem todas as partidas finalizadas', async () => {

      const matchesFinished = matchesMock.filter((match) => match.inProgress === false);

      sinon.stub(Match, "findAll").resolves(matchesFinished as unknown as Match[]);

      const response = await chai
              .request(app)
              .get('/matches?inProgress=false');


      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(matchesFinished);
    });
  });

  describe('Testando PATCH n rota /:id', () => {
    it('Atualiza os gols de uma partida', async () => {

      sinon.stub(Match, "update").resolves();

      const response = await chai
              .request(app)
              .patch('/matches/1')
              .send(
                {
                  homeTeamGoals: 3,
                  awayTeamGoals: 1
                });

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({ message: 'Match is updated!' });
    });
  });

  describe('Testando método PATCH para a rota /:id/finish', () => {
    it('Atualiza uma partida como finalizada', async () => {

      sinon.stub(Match, "update").resolves();

      const response = await chai
              .request(app)
              .patch('/matches/1/finish');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({ message: 'Finished' });
    });
  });

  describe('Testando POST na rota /matches', () => {
    it('Insere uma nova partida', async () => {

      const result = {
        id: 20,
        homeTeam: 16,
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
        inProgress: true
      }

      sinon.stub(jsonwebtoken, 'verify').resolves({ email: 'admin@admin.com', password: 'secret_admin' });
      sinon.stub(Team, "findByPk")
      .onCall(0).resolves({ id: 1, teamName: 'Palmeiras'} as any)
      .onCall(1).resolves({ id: 1, teamName: 'Palmeiras'} as any);
      sinon.stub(Match, "create").resolves(result as IMatch | any);


      const response = await chai
              .request(app)
              .post('/matches')
              .send(
                {
                  homeTeam: 16,
                  awayTeam: 8,
                  homeTeamGoals: 2,
                  awayTeamGoals: 2,
              })
              .set('authorization', 'toksdfsdfsfd234234en');

      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.deep.equal(result);
    });

    it('Não é possível inserir uma partida sem um token de autorização', async () => {

      sinon.stub(jsonwebtoken, 'verify').resolves();

      const response = await chai
              .request(app)
              .post('/matches')
              .send(
                {
                  homeTeam: 16,
                  awayTeam: 8,
                  homeTeamGoals: 2,
                  awayTeamGoals: 2,
              })
              .set('authorization', '');

      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({ message: 'Token not found' });
    });

    it('Não é possível inserir uma partida sem um token de autorização válido', async () => {

      sinon.stub(jsonwebtoken, 'verify').throws();

      const response = await chai
              .request(app)
              .post('/matches')
              .send(
                {
                  homeTeam: 16,
                  awayTeam: 8,
                  homeTeamGoals: 2,
                  awayTeamGoals: 2,
              })
              .set('authorization', 'dadsdasdasdas');

      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({ message: 'Token must be a valid token' });
    });

    it('Não é possível inserir uma partida com dois times iguais', async () => {

      sinon.stub(jsonwebtoken, 'verify').resolves({ email: 'admin@admin.com', password: 'secret_admin' });

      const response = await chai
              .request(app)
              .post('/matches')
              .send(
                {
                  homeTeam: 8,
                  awayTeam: 8,
                  homeTeamGoals: 2,
                  awayTeamGoals: 2,
              })
              .set('authorization', 'dadsdasdasdas');

      expect(response.status).to.be.equal(422);
      expect(response.body).to.be.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
    });
  });
});