/* eslint-disable @typescript-eslint/no-var-requires */
const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('create artist', () => {
  let db;
  beforeEach(async () => (db = await getDb()));

  // connects to the db before each test
  // stores connection as db

  afterEach(async () => {
    await db.query('DELETE FROM Artist');
    await db.close();
  });

  // deletes all records in Artist table after tests run
  // closes db connection

  describe('/artist', () => {
    describe('POST', () => {
      it('creates a new artist in the database', async () => {
        const res = await request(app).post('/artist').send({
          name: 'Tame Impala',
          genre: 'rock',
        });

        expect(res.status).to.equal(201);

        const [[artistEntries]] = await db.query(
          `SELECT * FROM Artist WHERE name = 'Tame Impala'`
        );

        expect(artistEntries.name).to.equal('Tame Impala');
        expect(artistEntries.genre).to.equal('rock');
      });
    });
  });
});