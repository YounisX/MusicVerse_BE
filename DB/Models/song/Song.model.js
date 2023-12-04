import mongoose from "mongoose";
const songSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  artist: {
    type: String,
    ref:'Artist'
  },
  album: {
    type: String,
    ref:'Album'
  },
  duration: {
    type: Number,
  },
  genre: {
    type: String,
  },
  releaseDate: {
    type: Date,
  },
  imageUrl: {
    type: Object,
  },
  audioUrl: {
    type: Object,
  },
  size:{
    type:Number
  },
likeCount:{
  type:Number,
  default:0
},
likes:[
  {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
],

});

const Song = mongoose.model("Song", songSchema);

export default Song;