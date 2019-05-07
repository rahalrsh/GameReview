var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var GameCommentSchema = new mongoose.Schema({
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
    comment: {
        type: String,
        required: true
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
});

var GameComment = mongoose.model('GameComment', GameCommentSchema);
module.exports = GameComment;