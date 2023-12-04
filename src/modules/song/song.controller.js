import cloudinary from "../../utils/cloudinary.config.js";
import Song from "./../../../DB/Models/song/Song.model.js";

export const createSong = async (req, res, next) => {
  try {
    const audioFile = req.files.audio;
    const imageFile = req.files.image;

    const { secure_url: audioSecureUrl, public_id: audioPublicId,duration,size } = await cloudinary.uploader.upload(
      audioFile[0].path,
      {
        folder: `/${process.env.APP_NAME}/${req.user._id}`,
        resource_type: "auto",
      }
    );

    const { secure_url: imageSecureUrl, public_id: imagePublicId } = await cloudinary.uploader.upload(
      imageFile[0].path,
      {
        folder: `/${process.env.APP_NAME}/${req.user._id}`,
        resource_type: "auto",
      }
    );

    req.body.audioUrl = { secure_url: audioSecureUrl, public_id: audioPublicId };
    req.body.imageUrl = { secure_url: imageSecureUrl, public_id: imagePublicId };


    const song = await Song.create(req.body);
    //saving the duration and clip the decimal number to 2
    song.duration = Number(duration.toFixed(2));
    song.size = audioFile[0].size
    await song.save();
    if (!song) {
      return next(new Error("Error adding this song"), { cause: 400 });
    }
    return res.json({ song });
  } catch (error) {
    console.error(error);
    return res.json({ error });
  }
};


export const getSong = async (req, res, next) => {
  try {
    const song = await Song.find({});
    if (!song) {
      return res.status(404).json({ error: "Song not found" });
    }

    return res.json({song });
  } catch (error) {
    console.error("Error retrieving song:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const streamSong = async (req, res, next) => {
  try {
const {songId} = req.params;
console.log({songId});
const song = await Song.findOne({_id:songId});
console.log({song});

    if (!song) {
      return res.status(404).json({ error: "Song not found" });
    }
    const url = song.audioUrl.secure_url;
    console.log({ url });

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Content-Length", song.size);
    res.setHeader("Content-Disposition", "attachment; filename=" + song.title + ".mp3");
    res.redirect(url);
  } catch (error) {
    console.error("Error streaming song:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// export const likeSong = async(req,res,next)=>{
//   try {
//     const {songId} = req.params;
//       const song = await Song.findByIdAndUpdate(
//         songId,
//         {
//           $inc: { 'likeCount': 1 },
//           $addToSet: { 'likes': req.user._id},
//         },
//         { new: true }
//       );
//       res.json(song);
//     } catch (error) {
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
// }

export const likeSong = async (req, res, next) => {
  try {
    const { songId } = req.params;
    const userId = req.user._id;

    // Use findOneAndUpdate to atomically check and update
    const song = await Song.findOneAndUpdate(
      {
        _id: songId,
        'likes': { $ne: userId }, // Check if userId is not in the array
      },
      {
        $inc: { 'likeCount': 1 },
        $addToSet: { 'likes': userId },
      },
      { new: true }
    );

    if (!song) {
      return res.status(400).json({ error: 'Song already liked by the user' });
    }

    res.json(song);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const disLike = async (req, res, next) => {
  try {
    const { songId } = req.params;
    const userId = req.user._id;

    // Use findOneAndUpdate to atomically check and update
    const song = await Song.findOneAndUpdate(
      {
        _id: songId,
        'likes': userId, // Check if userId is in the array
      },
      {
        $inc: { 'likeCount': -1 },
        $pull: { 'likes': userId },
      },
      { new: true }
    );

    if (!song) {
      return res.status(400).json({ error: 'User has not liked the song' });
    }

    res.json(song);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


  