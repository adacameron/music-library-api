/* eslint-disable @typescript-eslint/no-var-requires */
const getDb = require('../services/db');

exports.createAlbum = async (req, res) => {

  const db = await getDb();

  const { name, year } = req.body;
  const { artistId } = req.params;
  try {
    await db.query(
      `INSERT INTO Album (name, year, artistId) VALUES 
      ('${name}', '${year}', '${artistId}')`
    );

    res.status(201).json({ message: 'Album created' });
  } catch (err) {
    res.status(500).json(err);
  }

  db.close();
};

exports.readAlbum = async (req, res) => {
  const db = await getDb();

  try {
    const [albums] = await db.query(`SELECT * FROM Album`);
    res.status(200).json(albums);

  } catch (err) {
    res.sendStatus(500).json(err);
  }

  db.close();
};

exports.readById = async (req, res) => {
  const db = await getDb();
  const { artistId } = req.params;
  try {
    const [[albumEntry]] = await db.query(`SELECT * FROM Album WHERE artistId = ?`,
      [
        `${artistId}`
      ]);
    res.status(200).json(albumEntry);

  } catch (err) {
    res.sendStatus(500).json(err);
  }

  db.close();
};


exports.delete = async (req, res) => {
  const db = await getDb();
  try {
    const [albums] = await db.query('SELECT * from Album');
    const albumRecord = albums[0];
    const albumId = albumRecord.id;
    const [
      { affectedRows },
    ] = await db.query('DELETE FROM Album WHERE id = ?', [albumId]);
    if (!affectedRows) {
      res.sendStatus(404);
    } else {
      res.status(200).send();
    }
  } catch (err) {
    res.end('Record has been deleted')
  }

  db.close();
};

exports.update = async (req, res) => {
  const db = await getDb();
  const data = req.body;
  try {
    const [albums] = await db.query('SELECT * from Album');
    const albumRecord = albums[0]
    const albumId = albumRecord.id;
    const [
      { affectedRows },
    ] = await db.query('UPDATE Album SET ? WHERE id = ?', [data, albumId]);
    if (!affectedRows) {
      res.sendStatus(404);
    } else {
      res.status(200).send();
    }
  } catch (err) {
    res.sendStatus(500);
  }

  db.close();
};