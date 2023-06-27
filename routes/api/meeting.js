const express = require("express");
const router = express.Router();
const passport = require("passport");
const Meeting = require("../../models/Meeting");

// router.get("/", async (req, res) => {
//   try {
//     const meetings = await Meeting.find();
//     return res.status(200).json(meetings);
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong" });
//   }
// });

router.get(
  "/my/scheduled/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const meetings = await Meeting.find({
        $or: [{ createdBy: req.user._id }, { meetingWith: req.user.email }],
      });
      return res.status(200).json(meetings);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

// router.post("/", async (req, res) => {
//   try {
//     const newMeeting = new Meeting(req.body);
//     await newMeeting.save();
//     res.status(200).json(newMeeting);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

module.exports = router;
