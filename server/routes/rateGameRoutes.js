var express = require('express');
var router = express.Router();
const rateGameController = require('../controllers/rateGameController');
const auth = require('../auth/auth');

router.post('/:gameid/rate_game', auth.authenticated, rateGameController.rateGame); // /games/rate/:gameid/rate_game
router.post('/:gameid/feedback_game', auth.authenticated, rateGameController.feedbackGame); // /games/rate/:gameid/feedback_game
router.post('/:gameid/report_game_bug', auth.authenticated, rateGameController.reportGameBug); // /games/rate/:gameid/report_game_bug
router.post('/:gameid/comment_game', auth.authenticated, rateGameController.commentGame); // /games/rate/:gameid/comment_game

// router.get('/:gameid/comments', rateGameController.getGameComments); // /games/rate/:gameid/comments
router.get('/:gameid/ratings', rateGameController.getRatings); // /games/rate/:gameid/ratings
router.get('/:gameid/feedbacks', rateGameController.getFeedbacks); // /games/rate/:gameid/feedbacks
router.get('/:gameid/bugs', rateGameController.getBugs); // /games/rate/:gameid/bugs
router.get('/:gameid/comments', rateGameController.getComments); // /games/rate/:gameid/comments


module.exports = router;