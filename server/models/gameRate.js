var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var GameRateSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    game: {
        type: Schema.Types.ObjectId,
        ref: 'Game',
        required: true
    },
    overallRate: {
        type: Number,
        default: 0,
        required: true
    },
    graphicsRate: {
        type: Number,
        default: 0
    },
    storyRate: {
        type: Number,
        default: 0
    },
    cinematicsRate: {
        type: Number,
        default: 0
    },
    musicRate: {
        type: Number,
        default: 0
    },
    contentRate: {
        type: Number,
        default: 0
    },
    controlsRate: {
        type: Number,
        default: 0
    },
    gameplayRate: {
        type: Number,
        default: 0
    },
    other: {
        type: String,
        default: 0
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
});

var GameRate = mongoose.model('GameRate', GameRateSchema);
module.exports = GameRate;