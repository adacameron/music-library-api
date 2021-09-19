/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const albumController = require('../controllers/album')

const router = express.Router();

router.post('/artist/:artistId', albumController.createAlbum);
router.get('/', albumController.readAlbum);
router.get('/artist/:artistId', albumController.readById);
router.delete('/artist/:artistId', albumController.delete);
router.patch('/artist/:artistId', albumController.update);

// album read route in test:
//      /album
// in route.js
//      /

// album post route in test:
//      /album/artist/${id}
//  in route.js
//             /artist/:artistId

module.exports = router;


