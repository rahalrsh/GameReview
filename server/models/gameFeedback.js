var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var GameFeedbackSchema = new mongoose.Schema({
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
    feedback: {
        type: String,
        required: true
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
});

var GameFeedback = mongoose.model('GameFeedback', GameFeedbackSchema);
module.exports = GameFeedback;