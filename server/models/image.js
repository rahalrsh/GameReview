var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ImageSchema = new mongoose.Schema({
    type: {
        type: String,   // cover-image or screen-shot
        required: true
    },
    path: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    game: {
        type: Schema.Types.ObjectId,
        ref: 'Game',
    },
    inUse: {
        type: Boolean,        // if image is currently in use
        default: false
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
});

var Image = mongoose.model('Image', ImageSchema);
module.exports = Image;