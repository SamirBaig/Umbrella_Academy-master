var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var meetingSchema = new Schema({
  createdBy: {
    type: String,
    required: true,
  },
  meetingWith: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  creatorName: {
    type: String,
    required: true,
  },
  meetingId: {
    type: Number,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  timezone: {
    type: String,
    required: true,
  },
  start_url: {
    type: String,
    required: true,
  },
  join_url: {
    type: String,
    required: true,
  },
  created_at: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("meeting", meetingSchema);
