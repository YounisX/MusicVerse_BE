import cloudinary from "../../utils/cloudinary.config.js";
import Song from "./../../../DB/Models/song/Song.model.js";

export const createSong = async (req, res, next) => {
  try {
    const audioFile = req.files.audio;
    const imageFile = req.files.image;

    const { secure_url: audioSecureUrl, public_id: audioPublicId,duration } = await cloudinary.uploader.upload(
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

    console.log({ audioSecureUrl, audioPublicId, imageSecureUrl, imagePublicId });

    const song = await Song.create(req.body);
    //saving the duration and clip the decimal number to 2
    song.duration = Number(duration.toFixed(2));
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
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ error: "Song not found" });
    }
    // Access the audio and image URLs
    const audioUrl = song.audioUrl;
    const imageUrl = song.imageUrl;
    // other song properties
    return res.json({ audioUrl, imageUrl });
  } catch (error) {
    console.error("Error retrieving song:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
