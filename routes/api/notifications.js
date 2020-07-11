const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Notification = require("../../models/Notification");

// GET /api/notifications
// PRIVATE
// Returns a list of the users notifications
router.get("/", auth, (req, res) => {
  Notification.find({ userId: req.user.id })
    .sort({ date: -1 })
    .then((notifications) => res.json(notifications))
    .catch((error) => res.status(500).json({ error }));
});

module.exports = router;
