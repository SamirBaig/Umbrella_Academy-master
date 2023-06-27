// Chat schema
const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
    patientname: {
      type: String,
    },
    psychologistname: {
      type: String,
    },
  },
  { timestamps: true }
);
const Chat = mongoose.model("Chat", chatSchema);

module.exports.Chat = Chat;
