/* eslint-disable @typescript-eslint/no-var-requires */
const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('create artist', () => {
  let db;
  beforeEach(async () => (db = await getDb()));

  afterEach(async () => {
    await db.query(`SET FOREIGN_KEY_CHECKS = 0`);
    await db.query('DELETE FROM Artist');
    await db.close();
  });

  describe('/artist', () => {
    describe('POST', () => {
      it('creates a new artist in the database', async () => {
        const res = await request(app).post('/artist').send({
          name: 'Joanna Gruesome',
          genre: 'noise pop'
        });

        expect(res.status).to.equal(201);

        const [[artistEntries]] = await db.query(
          `SELECT * FROM Artist WHERE name = 'Joanna Gruesome'`
        );

        expect(artistEntries.name).to.equal('Joanna Gruesome');
        expect(artistEntries.genre).to.equal('noise pop');
      });
    });
  });
});