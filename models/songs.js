const mongoose = require("mongoose");

const songsShema = mongoose.Schema(
  { title: String, artist: String, url: String, image_url: String },
  { versonKey: false }
);

const SongsModel = mongoose.model("allSongs", songsShema);

module.exports = { SongsModel };
