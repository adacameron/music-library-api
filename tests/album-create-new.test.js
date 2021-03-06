/* eslint-disable @typescript-eslint/no-var-requires */
const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('create album', () => {
    let db;
    let artistId;

    beforeEach(async () => {

        db = await getDb();

        const [artistInsert] = await db.query(
            `INSERT INTO Artist (name, genre) VALUES (?, ?)`, [
            'Ride',
            'shoegaze'
        ]);
        artistId = artistInsert.insertId;
    });

    afterEach(async () => {
        await db.query(`SET FOREIGN_KEY_CHECKS = 0`);
        await db.query('DELETE FROM Artist');
        await db.query('DELETE FROM Album');
        await db.close();
    });

    describe('/artist/:artistId/album', () => {
        describe('POST', () => {
            it('creates a new album in the database', async () => {
                const res = await request(app).post(`/album/artist/${artistId}`).send(
                    {
                        name: 'Nowhere',
                        year: 1990
                    });

                expect(res.status).to.equal(201);

                const [[albumEntries]] = await db.query(
                    `SELECT * FROM Album WHERE artistId = ${artistId}`
                );

                expect(albumEntries.name).to.equal('Nowhere');
                expect(albumEntries.year).to.equal(1990);
            });
        });
    });
});