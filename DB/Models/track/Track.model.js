import { Schema } from 'mongoose';
import { Types } from 'mongoose';


const trackSchema = new mongoose.Schema({

    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Album',
    },
    song: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Song',
    },
    order: Number, // The order of the song in the album
    // Other metadata specific to the song-album relationship
  });
  
  const Track = mongoose.model('Track', trackSchema);