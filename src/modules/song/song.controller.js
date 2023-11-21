import cloudinary from "../../utils/cloudinary.config.js";

export const createSong = async (req, res, next) => {
  const buffer = req.file.buffer;

  const upload = cloudinary.uploader
    .upload_stream(
      {
        folder: `${process.env.APP_NAME}/${req.user._id}`,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          console.error("Error uploading file to Cloudinary:", error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(result);
      }
    )
    .end(buffer);
};
