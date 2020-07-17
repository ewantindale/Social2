const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Message = require("../../models/Message");
const User = require("../../models/User");

// GET /api/messages
// PRIVATE
// Returns a list of the users messages
router.get("/", auth, (req, res) => {
  Message.find({ $or: [{ toId: req.user._id }, { authorId: req.user._id }] })
    .sort({ date: 1 })
    .then((messages) => res.json(messages))
    .catch((error) => res.status(500).json({ error }));
});

// POST /api/messages
// PRIVATE
// Create a new message
router.post("/", auth, (req, res) => {
  User.findById(req.body.toId).then((user) => {
    const toName = user.name;

    const newMessage = new Message({
      authorId: req.user._id,
      authorName: req.user.name,
      toId: req.body.toId,
      toName: toName,
      body: req.body.body,
    });

    newMessage
      .save()
      .then((message) => res.json(message))
      .catch((error) => res.status(500).json({ error }));
  });
});

module.exports = router;
