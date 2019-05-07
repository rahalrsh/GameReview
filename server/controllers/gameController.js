const User = require('../models/user');
const Image = require('../models/image');
const Game = require('../models/game');
const Consts = require('../consts/consts');
const slugify = require('slugify');
const sanitizeHtml = require('sanitize-html');
// const mongoose = require('mongoose');
// const async = require('async');

function getYouTubeVideoId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return false;
    }
}

module.exports = {
    uploadScreenshotImages: async(req, res, next) => {
        console.log('------ Screen Shot Image File -------');
        console.log(req.files.screenshot_images);
        console.log('-------------');

        const screenshotImages = req.files.screenshot_images;

        if(!screenshotImages || screenshotImages.length == 0) {
            return res.status(200).json({
                success: false,
                message: 'Please Select One Or More Images'
            });
        }

        if(screenshotImages.length > 6) {
            return res.status(200).json({
                success: false,
                message: 'Only 6 Images Allowed'
            });
        }

        let screenshotImageIds = [];
        for(let i in screenshotImages) {
            let image = screenshotImages[i];

            if(image.size >= 20*1024*1024) {
                return res.status(200).json({
                    success: false,
                    message: 'Image ' + image.name + ' is too large. Max 20MB'
                });
            }

            if(image.mimetype != 'image/jpeg' && image.mimetype != 'image/png') {
                return res.status(200).json({
                    success: false,
                    message: 'File type not supported. jpeg and png only'
                });
            }
            // All checks passed
            
            const prefix     =  __dirname + '/..';
            const publicPath =  '/public/uploads/screenshot_images/' + 
                                res.locals.user.id + 
                                '_' + 
                                (new Date()).getTime() +
                                '_' +
                                image.name;
            const path       =  prefix + publicPath;
    
            console.log(path);

            // Move Image to public path
            try {
                await image.mv(path);
            } catch(err) {
                console.log(err);
                return res.status(200).json({
                    success: false,
                    message: 'Image save failed'
                });
            }

            // save path in DB
            const newImage  = new Image();
            newImage.type   = Consts.IMAGE.TYPE_SCREEN_SHOT;
            newImage.path   = publicPath;
            newImage.user   = res.locals.user.id;

            let savedImage;
            try {
                savedImage = await newImage.save();
            } catch(err) {
                console.log(err);
                return res.status(200).json({
                    success: false,
                    message: 'Image save to DB failed'
                });
            }

            console.log('====== IMAGE SAVED TO DB =====');
            console.log(savedImage);
            screenshotImageIds.push(savedImage._id);
        }

        console.log('--- screenshotImageIds ---');
        console.log(screenshotImageIds);

        // response with image id
        return res.status(200).json({
            success: true,
            message: 'Screenshot Images Uploaded',
            payload: {
                screenshotImageIds: screenshotImageIds
            }
        });
    },

    uploadCoverImage: async(req, res, next) => {
        // console.log(saveImage);
        console.log('------ Cover Image File -------');
        console.log(req.files.cover_image);
        console.log('-------------');

        const coverImage = req.files.cover_image;

        if(!coverImage) {
            return res.status(200).json({
                success: false,
                message: 'Please Select an Image'
            });
        }
        if(coverImage.size >= 20*1024*1024) {
            return res.status(200).json({
                success: false,
                message: 'File is too large. Max 20MB'
            });
        }
        if(coverImage.mimetype != 'image/jpeg' && coverImage.mimetype != 'image/png') {
            return res.status(200).json({
                success: false,
                message: 'File type not supported. jpeg and png only'
            });
        }
        // All checks passed
        // console.log('__dirname: ' + __dirname);
        const prefix     =  __dirname + '/..';
        const publicPath =  '/public/uploads/cover_images/' + 
                            res.locals.user.id + 
                            '_' + 
                            (new Date()).getTime() +
                            '_' +
                            coverImage.name;
        const path       =  prefix + publicPath;

        console.log(path);

        // Move Image to public path
        try {
            await coverImage.mv(path);
        } catch(err) {
            console.log(err);
            return res.status(200).json({
                success: false,
                message: 'Image save failed'
            });
        }

        // save path in DB
        const newImage  = new Image();
        newImage.type   = Consts.IMAGE.TYPE_COVER_IMAGE;
        newImage.path   = publicPath;
        newImage.user   = res.locals.user.id;

        let savedImage;
        try {
            savedImage = await newImage.save();
        } catch(err) {
            console.log(err);
            return res.status(200).json({
                success: false,
                message: 'Image save to DB failed'
            });
        }

        console.log('====== IMAGE SAVED TO DB =====');
        console.log(savedImage);

        // response with image id
        return res.status(200).json({
            success: true,
            message: 'Cover Image Uploaded',
            payload: {
                coverImageId: savedImage.id
            }
        });
    },
    // private Routes
    createGame: async(req, res, next) => {
        const { body } = req;
        const { title,
                description,
                longDescription,
                status,
                genre,
                steam,
                appleappstore,
                googleplaystore,
                amazonappstore,
                trailer,
                tags,
                coverImageId,
                screenshotImageIds } = body;

        // Empty Checks
        if(!title) {
            return res.status(200).json({
                success: false,
                message: 'Title cant be empty'
            });
        }
        if(!description) {
            return res.status(200).json({
                success: false,
                message: 'Short description cant be empty'
            });
        }
        if(!longDescription) {
            return res.status(200).json({
                success: false,
                message: 'Description cant be empty'
            });
        }
        if(!genre) {
            return res.status(200).json({
                success: false,
                message: 'Genre cant be empty'
            });
        }
        if(!tags || tags.length < 1) {
            return res.status(200).json({
                success: false,
                message: 'Please Enter one or more tags'
            });
        }
        if(!coverImageId) {
            return res.status(200).json({
                success: false,
                message: 'Please upload a cover image'
            });
        }
        if(!screenshotImageIds || screenshotImageIds.length == 0) {
            return res.status(200).json({
                success: false,
                message: 'Please upload one or more screenshots image'
            });
        }

        // Validations
        /* 
            1) check if image.userid == userid
            2) check if trailer URL is valid
            3) sanitize input?
        */

        // Format Inputs
        const slugTitle = slugify(title, {
            lower: true,
            remove: /[*+~.()'"!:@]/g    //remove *+~.()'"!:@
        });

        let trailerUrl = null;
        if(trailer) {
            youtubeVideoId = getYouTubeVideoId(trailer);
            if(youtubeVideoId)
                trailerUrl = 'https://www.youtube.com/embed/'+youtubeVideoId;
        }

        let sanitizedLongDescription = sanitizeHtml(longDescription);

        // Save Game in DB
        const newGame               = new Game();
        newGame.title               = title;
        newGame.slug                = slugTitle
        newGame.description         = description;
        newGame.longDescription     = sanitizedLongDescription;
        newGame.user                = res.locals.user.id;
        newGame.status              = status;
        newGame.genre               = genre;
        newGame.storelinks          = {
            steam: steam,
            appleappstore: appleappstore,
            googleplay: googleplaystore,
            amazonappstore: amazonappstore
        }
        newGame.tags                = tags;
        newGame.trailer             = trailerUrl;
        newGame.coverImage          = coverImageId;
        newGame.screenshotImages    = screenshotImageIds;

        let savedGame;
        try {
            savedGame = await newGame.save();
        } catch(err) {
            console.log(err);
            return res.status(200).json({
                success: false,
                message: 'Game save to DB failed'
            });
        }

        console.log('------------- GAME SAVED ------------');
        console.log(savedGame);

        // Now update Cover Image with gameId and inUse
        let coverImage
        try {
            coverImage = await Image.findById(coverImageId);
        } catch (err) {
            console.log('Failed to find image by id:'+coverImageId);
            console.log(err);
            return res.status(200).json({
                success: false,
                message: 'Game Save Failed'
            });
        }

        coverImage.game  = savedGame.id;
        coverImage.inUse = true;
        
        try {
            await coverImage.save();
        } catch(err) {
            console.log('Failed to update cover image inUse state. id:'+coverImageId);
            console.log(err);
            return res.status(200).json({
                success: false,
                message: 'Game Save Failed'
            });
        }
        
        return res.status(200).json({
            success: true,
            message: 'Game Created!'
        });
    },

    getAllGames: async (req, res, next) => {

        let games;
        try {
            games = await Game.find({}, 'title slug meta description date')
                            .populate('user', 'name')
                            .populate('coverImage', 'path')
                            .exec();
            return res.status(200).json({
                success: true,
                message: 'success',
                payload: {
                    games: games
                }
            });
        } catch (err) {
            console.log('Get games failed');
            console.log(err);
            return res.status(200).json({
                success: false,
                message: 'Something went wrong'
            });
        }
    },

    getGame: async (req, res, next) => {
        console.log(req.params.gameid);
        const { gameid } = req.params;

        // checks
        if(!gameid) {
            return res.status(200).json({
                success: false,
                message: 'Not a valid game id'
            });
        }

        let game;
        try {
            game = await Game.findById(gameid)
                            .populate('user', 'name')
                            .populate('coverImage', 'path')
                            .populate('screenshotImages', 'path')
                            // .populate('comments', 'comment')
                            .populate({
                                path: 'comments',
                                select: 'comment date',
                                options: {
                                    sort: {
                                        'date': -1
                                    }
                                },
                                populate :{
                                    path: 'user',
                                    select: 'name'
                                }
                            })
                            .exec();
            return res.status(200).json({
                success: true,
                message: 'success',
                payload: {
                    game: game
                }
            });
        } catch (err) {
            console.log('Find game failed');
            console.log(err);
            return res.status(200).json({
                success: false,
                message: 'Something went wrong'
            });
        }
    },

    getSummary: async (req, res, next) => {
        const { gameid } = req.params;

        // checks
        if(!gameid) {
            return res.status(200).json({
                success: false,
                message: 'Not a valid game id'
            });
        }

        let game;
        try {
            game = await Game.findById(gameid);
        } catch (err) {
            console.log('Find game failed');
            console.log(err);
            return res.status(200).json({
                success: false,
                message: 'Something went wrong'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'success',
            payload: {
                game: game,
                summary: {
                    comments: 20,
                    bugs: 4,
                    feedback: 8,
                    views: 24,
                    rating: 79
                }
            }
        });
    }
};