var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var GameBugSchema = new mongoose.Schema({
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
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
});

var GameBug = mongoose.model('GameBug', GameBugSchema);
module.exports = GameBug;