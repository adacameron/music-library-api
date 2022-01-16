/* eslint-disable @typescript-eslint/no-var-requires */
const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('read album', () => {
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

            [albums] = await db.query('SELECT * from Album');
    });

    afterEach(async () => {
        await db.query(`SET FOREIGN_KEY_CHECKS = 0`);
        await db.query('DELETE FROM Artist');
        await db.query('DELETE FROM Album');
        await db.close();
    });

    describe('/album', () => {
        describe('GET', () => {
            it('returns all album records in the database', async () => {

                const res = await request(app).get('/album').send(albums);

                expect(res.status).to.equal(200);
                expect(res.body.length).to.equal(1);
            });
        });
    });

    describe('/album/artist/:artistId', () => {
        describe('GET', () => {
            it('returns a single album with the correct id', async () => {

                const [[albumEntry]] = await db.query(`SELECT * FROM Album WHERE artistId = ${artistId}`)

                const res = await request(app).get(`/album/artist/${artistId}`).send(albumEntry);

                                // console.log('ALBUM READ TEST', { albumEntry })

                                // console.log('ALBUM READ TEST', { artistId })

                expect(res.status).to.equal(200);
                expect(res.body).to.deep.equal(albumEntry);
            });
        });
    });
});