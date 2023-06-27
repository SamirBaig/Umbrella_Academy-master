const express = require("express");
const router = express.Router();
const { Chat } = require("../../models/chat");

//post a new chat

router.post("/", async (req, res) => {
  const newChat = new Chat({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const saveChat = await newChat.save();
    res.status(200).json(saveChat);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get chat by id

router.get("/:userId", async (req, res) => {
  try {
    const chat = await Chat.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get specific chat

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const chat = await Chat.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    if (!chat) {
      throw new Error("Chat not found");
    }
    res.status(200).json(chat);
  } catch (err) {
    const newChat = new Chat({
      members: [req.params.firstUserId, req.params.secondUserId],
    });

    try {
      const saveChat = await newChat.save();
      res.status(200).json(saveChat);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
