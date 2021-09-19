/* eslint-disable @typescript-eslint/no-var-requires */
const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('delete album', () => {
    let db;
    let albums;
    let artistId;

    beforeEach(async () => {
        db = await getDb();

        const [artists] = await db.query('INSERT INTO Artist (name, genre) VALUES(?, ?)', [
            'Joanna Gruesome',
            'noise pop',
        ]);

        artistId = artists.insertId;

        await db.query('INSERT INTO Album (name, year, artistId) VALUES(?, ?, ?)', [
            'Weird Sister',
            '2013',
            `${artistId}`
        ]);

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
        describe('DELETE', () => {
            it('deletes a single album with the correct id', async () => {

                [albums] = await db.query('SELECT * from Album');

                              // console.log('DELETE TEST - albums', [albums])

                const album = albums[0];
                              // console.log('DELETE TEST', { album })

                const res = await request(app).delete(`/album/artist/${artistId}`).send();

                expect(res.status).to.equal(200);

                const [
                    [deletedAlbumRecord],
                ] = await db.query('SELECT * FROM Album WHERE id = ?', [album.id]);

                expect(!!deletedAlbumRecord).to.be.false;
            });
        });
    });
});