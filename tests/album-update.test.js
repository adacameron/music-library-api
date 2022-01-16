/* eslint-disable @typescript-eslint/no-var-requires */
const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('update album', () => {
  let db;
  let albums;
  let artistId;

  beforeEach(async () => {
    db = await getDb();

    const [artists] = await db.query(`INSERT INTO Artist (name, genre) VALUES (?, ?)`, [
      'Joanna Gruesome',
      'noise pop'
    ]);

    artistId = artists.insertId;

    await db.query('INSERT INTO Album (name, year, artistId) VALUES(?, ?, ?)', [
      'Weird Sister',
      '2013',
      `${artistId}`
    ]),

      await db.query('INSERT INTO Album (name, year, artistId) VALUES(?, ?, ?)', [
        'Peanut Butter',
        '2015',
        `${artistId}`
      ]);
  });

  afterEach(async () => {
    await db.query(`SET FOREIGN_KEY_CHECKS = 0`);
    await db.query('DELETE FROM Artist');
    await db.query('DELETE FROM Album');
    await db.close();
  });

  describe('/album/artist/:artistId', () => {
    describe('PATCH', () => {
      it('updates a single album with the correct id', async () => {

        [albums] = await db.query('SELECT * from Album');

        const album = albums[0];

        const res = await request(app)
          .patch(`/album/artist/${artistId}`)
          .send({ name: 'new name', year: 9999 });

        expect(res.status).to.equal(200);

        const [
          [newAlbumRecord],
        ] = await db.query('SELECT * FROM Album WHERE id = ?', [album.id]);

        expect(newAlbumRecord.name).to.equal('new name');
      });

      it('returns a 404 if the artist is not in the database', async () => {
        const res = await request(app)
          .patch('/artist/999999')
          .send({ name: 'new name' });

        expect(res.status).to.equal(404);
      });
    });
  });
});