const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
    ref:'Artist'
  },
  album: {
    type: String,
    required: true,
    ref:'Album'
  },
  duration: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
  },
  releaseDate: {
    type: Date,
  },
  imageUrl: {
    type: String,
  },
  audioUrl: {
    type: String,
    required: true,
  },
});

const Song = mongoose.model("Song", songSchema);

export default Song;