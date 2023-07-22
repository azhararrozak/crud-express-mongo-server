const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    artists: {
        required: true,
        type: String
    },
    album: {
        required: true,
        type: String
    }
}, {
    collection: 'Songs'
  });
module.exports = mongoose.model("Song", songSchema);