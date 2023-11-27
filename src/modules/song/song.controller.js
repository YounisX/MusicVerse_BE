import Song from "../../../DB/Models/song/Song.model.js";
import cloudinary from "../../utils/cloudinary.config.js";
export const createSong  =  async(req,res,next) =>{ 


  const audio = req.files.audio;
  const image = req.files.image;

  const {secure_url,public_id} = await cloudinary.uploader.upload(req.files.audio[0].path,{folder:`/${process.env.APP_NAME}/Category/SubCategory/Products/${req.body.customId}`})
  req.body.mainImage = {secure_url,public_id} ; 
  
  console.log({audio,image});
}


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