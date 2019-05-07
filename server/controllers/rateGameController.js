const User = require('../models/user');
const Game = require('../models/game');
const GameRate = require('../models/gameRate');
const GameFeedback = require('../models/gameFeedback');
const GameBug = require('../models/gameBug');
const GameComment = require('../models/gameComment');
const ObjectId = require('mongodb').ObjectId; 
const Consts = require('../consts/consts');

module.exports = {
    rateGame: async (req, res, next) => {
        const { body }    = req;
        const { overallRate,
                graphicsRate,
                storyRate,
                cinematicsRate,
                musicRate,
                contentRate,
                controlsRate,
                gameplayRate,
                other }   = body;
        const { gameid }  = req.params;
        const userid      = res.locals.user.id;

        // checks
        if(!gameid) {
            return res.status(200).json({
                success: false,
                message: 'Not a valid game id'
            });
        }

        // Save GameRate in DB
        const newGameRate           = new GameRate();
        newGameRate.user            = userid;
        newGameRate.game            = gameid;
        newGameRate.overallRate     = overallRate;
        newGameRate.graphicsRate    = graphicsRate;
        newGameRate.storyRate       = storyRate;
        newGameRate.cinematicsRate  = cinematicsRate;
        newGameRate.musicRate       = musicRate;
        newGameRate.contentRate     = contentRate;
        newGameRate.controlsRate    = controlsRate;
        newGameRate.gameplayRate    = gameplayRate;
        newGameRate.other           = other;

        let savedGameRate;
        try {
            savedGameRate = await newGameRate.save();
        } catch(err) {
            console.log(err);
            return res.status(200).json({
                success: false,
                message: 'Submit Failed. Please Try Again Later'
            });
        }

        console.log('------------- GAME RATING SAVED ------------');
        console.log(savedGameRate);

        // Now Game with game.ratings array
        let updatedGame
        try {
            updatedGame = await Game.findByIdAndUpdate(gameid,
                {$push: {rates: savedGameRate._id}},
                {new: true});
        } catch (err) {
            console.log(err);
            return res.status(200).json({
                success: false,
                message: 'Submit Failed. Please Try Again Later'
            });
        }

        console.log('------------- GAME UPDATED ------------');
        console.log(updatedGame);

        return res.status(200).json({
            success: true,
            message: 'Thank You For Your Feedback'
        });
    },

    feedbackGame: async (req, res, next) => {
        const { body }    = req;
        const { feedback } = body;
        const { gameid }  = req.params;
        const userid      = res.locals.user.id;

        // checks
        if(!gameid) {
            return res.status(200).json({
                success: false,
                message: 'Not a valid game id'
            });
        }
        if(!feedback || feedback=="") {
            return res.status(200).json({
                success: false,
                message: 'Feedback can\'t be empty'
            });
        }

        // Save GameRate in DB
        const newGameFeedback        = new GameFeedback();
        newGameFeedback.user         = userid;
        newGameFeedback.game         = gameid;
        newGameFeedback.feedback     = feedback;

        let savedGameFeedback;
        try {
            savedGameFeedback = await newGameFeedback.save();
        } catch(err) {
            console.log(err);
            return res.status(200).json({
                success: false,
                message: 'Submit Failed. Please Try Again Later'
            });
        }

        console.log('------------- GAME FEEDBACK SAVED ------------');
        console.log(savedGameFeedback);

        // Now Game with game.ratings array
        let updatedGame
        try {
            updatedGame = await Game.findByIdAndUpdate(gameid,
                {$push: {feedbacks: savedGameFeedback._id}},
                {new: true});
        } catch (err) {
            console.log(err);
            return res.status(200).json({
                success: false,
                message: 'Submit Failed. Please Try Again Later'
            });
        }

        console.log('------------- GAME UPDATED ------------');
        console.log(updatedGame);

        return res.status(200).json({
            success: true,
            message: 'Thank You For Your Feedback'
        });
    },

    reportGameBug: async (req, res, next) => {
        const { body }         = req;
        const { title,
                description }  = body;
        const { gameid }       = req.params;
        const userid           = res.locals.user.id;

        // checks
        if(!gameid || (gameid === 'undefined')) {
            return res.status(200).json({
                success: false,
                message: 'Not a valid game id'
            });
        }
        if(!title || title=="") {
            return res.status(200).json({
                success: false,
                message: 'Bug title can\'t be empty'
            });
        }

        if(!description || description=="") {
            return res.status(200).json({
                success: false,
                message: 'Bug description can\'t be empty'
            });
        }

        // Save GameRate in DB
        const newGameBug        = new GameBug();
        newGameBug.user         = userid;
        newGameBug.game         = gameid;
        newGameBug.title        = title;
        newGameBug.description  = description;

        let savedGameBug;
        try {
            savedGameBug = await newGameBug.save();
        } catch(err) {
            console.log(err);
            return res.status(200).json({
                success: false,
                message: 'Submit Failed. Please Try Again Later'
            });
        }

        console.log('------------- GAME BUG SAVED ------------');
        console.log(savedGameBug);

        // Now Game with game.ratings array
        let updatedGame
        try {
            updatedGame = await Game.findByIdAndUpdate(gameid,
                {$push: {bugs: savedGameBug._id}},
                {new: true});
        } catch (err) {
            console.log(err);
            return res.status(200).json({
                success: false,
                message: 'Submit Failed. Please Try Again Later'
            });
        }

        console.log('------------- GAME UPDATED ------------');
        console.log(updatedGame);

        return res.status(200).json({
            success: true,
            message: 'Thank You For Your Comment'
        });
    },

    commentGame: async (req, res, next) => {
        const { body }    = req;
        const { comment } = body;
        const { gameid }  = req.params;
        const userid      = res.locals.user.id;

        // checks
        if(!gameid || (gameid === 'undefined')) {
            return res.status(200).json({
                success: false,
                message: 'Not a valid game id'
            });
        }
        if(!comment || comment=="") {
            return res.status(200).json({
                success: false,
                message: 'Comment can\'t be empty'
            });
        }

        // Save GameRate in DB
        const newGameComment        = new GameComment();
        newGameComment.user         = userid;
        newGameComment.game         = gameid;
        newGameComment.comment      = comment;

        let savedGameComment;
        try {
            savedGameComment = await newGameComment.save()
        } catch(err) {
            console.log(err);
            return res.status(200).json({
                success: false,
                message: 'Submit Failed. Please Try Again Later'
            });
        }

        console.log('------------- GAME COMMENT SAVED ------------');
        console.log(savedGameComment);

        // Now Game with game.ratings array
        let updatedGame
        try {
            updatedGame = await Game.findByIdAndUpdate(gameid,
                {$push: {comments: savedGameComment._id}},
                {new: true});
        } catch (err) {
            console.log(err);
            return res.status(200).json({
                success: false,
                message: 'Submit Failed. Please Try Again Later'
            });
        }

        console.log('------------- GAME UPDATED ------------');
        console.log(updatedGame);

        try {
            await GameComment.populate(savedGameComment, {
                                            path: 'user',
                                            select: 'name'
                                        })
        } catch (err) {
            console.log(err);
            return res.status(200).json({
                success: false,
                message: 'Submit Failed. Please Try Again Later'
            });
        }

        console.log('------------- POPULATED WITH USER ------------');
        console.log(savedGameComment);


        return res.status(200).json({
            success: true,
            message: 'Thank You For Your Comment',
            payload: {
                comment : savedGameComment
            }
        });
    },

    getRatings: async (req, res, next) => {
        const { gameid } = req.params;

        let gameRatings;
        try {
            gameRatings = await GameRate.find({'game': gameid})
                                        .populate('user', 'name')
                                        .exec();
        } catch(err) {
            console.log(err);
            return res.status(200).json({
                success: false,
                message: 'Failed. Please Try Again Later'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'success',
            payload: {
                ratings: gameRatings
            }
        });
    },

    getFeedbacks: async (req, res, next) => {
        const { gameid } = req.params;

        let gameFeedbacks;
        try {
            gameFeedbacks = await GameFeedback.find({'game': gameid})
                                        .populate('user', 'name')
                                        .exec();
        } catch(err) {
            console.log(err);
            return res.status(200).json({
                success: false,
                message: 'Failed. Please Try Again Later'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'success',
            payload: {
                feedbacks: gameFeedbacks
            }
        });
    },

    getBugs: async (req, res, next) => {
        const { gameid } = req.params;

        let gameBugs;
        try {
            gameBugs = await GameBug.find({'game': gameid})
                                        .populate('user', 'name')
                                        .exec();
        } catch(err) {
            console.log(err);
            return res.status(200).json({
                success: false,
                message: 'Failed. Please Try Again Later'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'success',
            payload: {
                bugs: gameBugs
            }
        });
    },

    getComments: async (req, res, next) => {
        const { gameid } = req.params;

        let gameComments;
        try {
            gameComments = await GameComment.find({'game': gameid})
                                        .populate('user', 'name')
                                        .exec();
        } catch(err) {
            console.log(err);
            return res.status(200).json({
                success: false,
                message: 'Failed. Please Try Again Later'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'success',
            payload: {
                comments: gameComments
            }
        });
    }

    // getGameComments: async (req, res, next) => {
    //     const { gameid }  = req.params;

    //     // checks
    //     if( (!gameid) || (gameid === 'undefined')) {
    //         return res.status(200).json({
    //             success: false,
    //             message: 'Not a valid game id'
    //         });
    //     }

    //     console.log('------------- GET GAME COMMENTS ------------');
    //     console.log('Game ID ' + gameid);

    //     let gameComments;
    //     try {
    //         var OID = new ObjectId(gameid);
    //         gameComments = await GameComment.find({"game": ObjectId(OID)});
    //     } catch(err) {
    //         console.log(err);
    //         return res.status(200).json({
    //             success: false,
    //             message: 'Failed to get comments'
    //         });
    //     }
        
    //     return res.status(200).json({
    //         success: true,
    //         message: 'Found Comments' ,
    //         payload: {
    //             comments : gameComments
    //         }
    //     });
    // },
};