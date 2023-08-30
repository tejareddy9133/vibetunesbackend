const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: Boolean,
    isSub: Boolean,
  },
  { versonKey: false }
);

const User = mongoose.model("user", UserSchema);
module.exports = { User };
