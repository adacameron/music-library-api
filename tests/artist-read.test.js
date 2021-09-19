/* eslint-disable @typescript-eslint/no-var-requires */
const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('read artist', () => {
  let db;
  let artists;

  beforeEach(async () => {
    db = await getDb();
    await Promise.all([
      db.query('INSERT INTO Artist (name, genre) VALUES(?, ?)', [
        'Ride',
        'shoegaze',
      ]),
      db.query('INSERT INTO Artist (name, genre) VALUES(?, ?)', [
        'Joanna Gruesome',
        'noise pop',
      ]),
      db.query('INSERT INTO Artist (name, genre) VALUES(?, ?)', [
        'Microphones',
        'indie rock',
      ]),
    ]);

    [artists] = await db.query('SELECT * from Artist');
    // console.log('ARTIST READ TEST', [artists], 'ARTIST READ TEST')
  });

  afterEach(async () => {
    await db.query(`SET FOREIGN_KEY_CHECKS = 0`);
    await db.query('DELETE FROM Artist');
    await db.close();
  });

  describe('/artist', () => {
    describe('GET', () => {
      it('returns all artist records in the database', async () => {
        const res = await request(app).get('/artist').send();

        expect(res.status).to.equal(200);
        // 200 is successful HTTP GET

        expect(res.body.length).to.equal(3);

        res.body.forEach((artistRecord) => {
          const expected = artists.find((a) => a.id === artistRecord.id);

                                // console.log('ARTIST READ TEST', {artistRecord})

                                // console.log('ARTIST READ TEST', {artistRecord.id})

          expect(artistRecord).to.deep.equal(expected);
        });
      });
    });
  });

  describe('/artist/:artistId', () => {
    describe('GET', () => {
      it('returns a single artist with the correct id', async () => {
        const expected = artists[0];
                                // console.log('ARTIST READ TEST', { expected } )
        const res = await request(app).get(`/artist/${expected.id}`).send();

        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(expected);
      });

      it('returns a 404 if the artist is not in the database', async () => {
        const res = await request(app).get('/artist/999999').send();

        expect(res.status).to.equal(404);
      });
    });
  });
});