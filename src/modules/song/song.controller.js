import Song from "../../../DB/Models/song/Song.model.js";
import cloudinary from "../../utils/cloudinary.config.js";

// export const createSong = async (req, res, next) => {
//   const buffer = req.file.buffer;

//   const upload = cloudinary.uploader
//     .upload_stream(
//       {
//         folder: `${process.env.APP_NAME}/${req.user._id}`,
//         resource_type: "auto",
//       },
//       (error, result) => {
//         if (error) {
//           console.error("Error uploading file to Cloudinary:", error);
//           return res.status(500).json({ error: "Internal Server Error" });
//         }
//         return res.json(result);
//       }
//     )
//     .end(buffer);
// };

export const createSong = async (req, res, next) => {
  const audioBuffer = req.files.audio[0].buffer;
  const imageBuffer = req.files.image[0].buffer;

  // Upload audio file to Cloudinary
  const audioResult = await cloudinary.uploader.upload(audioBuffer, {
    folder: `${process.env.APP_NAME}/${req.user._id}`,
    resource_type: "auto",
  });

  // Upload image file to Cloudinary
  const imageResult = await cloudinary.uploader.upload(imageBuffer, {
    folder: `${process.env.APP_NAME}/${req.user._id}`,
    resource_type: "image",
  });

  // Perform any additional processing or save the results to the database
  // ...

  // Return the uploaded audio and image details
  return res.json({ audio: audioResult, image: imageResult });

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