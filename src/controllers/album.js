/* eslint-disable @typescript-eslint/no-var-requires */
const getDb = require('../services/db');

exports.createAlbum = async (req, res) => {

  const db = await getDb();

  const { name, year } = req.body;
  const { artistId } = req.params;
                          // console.log('ALBUM CTRL CREATE', { name, year, artistId })
  try {
    await db.query(
      `INSERT INTO Album (name, year, artistId) VALUES 
      ('${name}', '${year}', '${artistId}')`  
    );

    res.status(201).json({ message: 'Album created' });
    // when Express app server receives HTTP req, we can use the res object to send a response to the client
          // res.status() sets the HTTP status code (server only)
          // res.sendStatus() sets the HTTP status code AND sends it to client
          // can't use sendStatus() with .json()

          // .json() not necessary here? Bc 'Created' is sent to client as part of the 201 status with sendStatus()?
          // res.send(status) is deprecated
  } catch (err) {
                          // console.log('ALBUM CTRL CREATE', err)
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
                            // console.log( 'ALBUM CTRL READ ID', { artistId } )
  try {
    const [[albumEntry]] = await db.query(`SELECT * FROM Album WHERE artistId = ?`, 
    [
      `${artistId}`
    ]);
                            // console.log('ALBUM CTRL READ ID', {albumEntry} )
    res.status(200).json(albumEntry);

  } catch (err) {
    res.sendStatus(500).json(err);
  }

  db.close();
};


exports.delete = async (req, res) => {
  const db = await getDb();
                            // console.log('ALBUM CTRL DELETE', { artistId })
  try {
    const [albums] = await db.query('SELECT * from Album');
                            // console.log('ALBUM CTRL DELETE - albums', albums)
    const albumRecord = albums[0];
     // this isn't right, but I can't figure out how to select only one album from the same artist! I was trying to do something like this:

    //  const albumData = await db.query(
    //   `SELECT * FROM Album
    //    WHERE id = ?`, [`${albumId}`])
  
    const albumId = albumRecord.id;
                            // console.log('ALBUM CTRL DELETE', {albumRecord});
                            // console.log('ALBUM CTRL DELETE', {albumId});
    const [
      { affectedRows },
    ] = await db.query('DELETE FROM Album WHERE id = ?', [albumId]);

                            // console.log('ALBUM CTRL DELETE', { affectedRows })
    if (!affectedRows) {
      res.sendStatus(404);
    } else {
      res.status(200).send();
    }
  } catch (err) {
    res.end('Record has been deleted')
    // res.send sends the HTTP response. It checks output and automatically sets headers 
      // it also uses res.end to end the request... 
    // res.end ENDS the response without any data - so, the string isn't being sent?
  }

  db.close();
};

exports.update = async (req, res) => {
  const db = await getDb();
  const data = req.body;
                            // console.log('ALBUM CTRL UPDATE', { data })
  try {
    const [albums] = await db.query('SELECT * from Album');
                            // console.log('ALBUM CTRL UPDATE - albums', albums)
    const albumRecord = albums[0]
                            // console.log('ALBUM CTRL UPDATE', { albumRecord })
    const albumId = albumRecord.id;
                            // console.log('ALBUM CTRL UPDATE', { albumId })
    const [
      { affectedRows },
    ] = await db.query('UPDATE Album SET ? WHERE id = ?', [data, albumId]);
                            // console.log('ALBUM CTRL UPDATE - affected rows', affectedRows)
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