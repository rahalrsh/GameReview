var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var GameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    longDescription: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String
    },
    genre: {
        type: String
    },
    storelinks: {
        steam: String,
        appleappstore: String,
        googleplay: String,
        amazonappstore: String
    },
    coverImage: {
        type: Schema.Types.ObjectId,
        ref: 'Image',
        required: true
    },
    screenshotImages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Image',
        }
    ],
    trailer: {
        type: String
    },
    tags: [String],
    rates: [
        {
            type: Schema.Types.ObjectId,
            ref: 'GameRate',
        }
    ],
    feedbacks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'GameFeedback',
        }
    ],
    bugs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'GameBug',
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'GameComment',
        }
    ],
    meta: {
        votes: {
            type: Number,
            default: 0
        },
        favs: {
            type: Number,
            default: 0
        }
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
});

var Game = mongoose.model('Game', GameSchema);
module.exports = Game;