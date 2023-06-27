const express = require("express");
const router = require("express").Router();
const { Message } = require("../../models/message");

//add new message

router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const saveMessage = await newMessage.save();
    res.status(200).json(saveMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get message with chat id

router.get("/:chatId", async (req, res) => {
  try {
    const messages = await Message.find({
      chatId: req.params.chatId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

// const Message = require("../../models/message");
// var mongoose = require("mongoose");

// let express = require("express");
// let router = express.Router();

// const getAllMessagesForUser = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     // Find all messages where the user is either the sender or receiver
//     const messages = await Message.find({
//       $or: [
//         { sender: userId.replace(/\"/g, "") },
//         { receiver: userId.replace(/\"/g, "") },
//       ],
//     })
//       .sort({ created_at: "desc" })
//       .populate("sender", "username")
//       .populate("receiver", "username");

//     // Group messages by the sender
//     const groupedMessages = {};
//     messages.forEach((message) => {
//       const senderId = message.sender._id;
//       if (!groupedMessages[senderId]) {
//         groupedMessages[senderId] = [];
//       }
//       groupedMessages[senderId].push(message);
//     });

//     // Sort the grouped messages based on the latest message
//     const sortedMessages = Object.values(groupedMessages).sort(
//       (a, b) => new Date(b[0].created_at) - new Date(a[0].created_at)
//     );

//     res.json({ success: true, data: sortedMessages });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// router.get("/:userId", getAllMessagesForUser);

// module.exports = router;
