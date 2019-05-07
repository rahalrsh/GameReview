var express = require('express');
var router = express.Router();
const gameController = require('../controllers/gameController');
const auth = require('../auth/auth');

// Public Routes
router.get('/', gameController.getAllGames);         // api/games/
router.get('/:gameid', gameController.getGame);      // api/games/12345
// router.get('/games/:id', gameController.getGameById);
// router.get('/games/:id/comments/new', gameController.getGameById);


// private Routes
router.post('/new', auth.authenticated, gameController.createGame); // /games/new
router.post('/new/upload-cover-image', auth.authenticated, gameController.uploadCoverImage);             // '/api/games/new/upload-cover-image'
router.post('/new/upload-screenshot-images', auth.authenticated, gameController.uploadScreenshotImages); // '/api/games/new/pload-screenshot-images'

router.get('/:gameid/summary', auth.authenticated, gameController.getSummary);             // api/games/123/summary
// router.get('/:gameid/comments', auth.authenticated, gameController.getComments);        // api/games/123/comments
// router.get('/:gameid/feedbacks', auth.authenticated, gameController.getFeedbacks);      // api/games/123/feedbacks
// router.get('/:gameid/bugs', auth.authenticated, gameController.getBugs);                // api/games/123/bugs

module.exports = router;