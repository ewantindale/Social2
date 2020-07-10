const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");

// GET /api/posts
// PRIVATE
// Returns a list of all posts
router.get("/", auth, (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((error) => res.status(500).json({ error }));
});

// POST /api/posts
// PRIVATE
// Create a new post
router.post("/", auth, (req, res) => {
  const newPost = new Post({
    authorId: req.user.id,
    authorName: req.user.name,
    body: req.body.body,
  });

  newPost
    .save()
    .then((post) => res.json(post))
    .catch((error) => res.status(500).json({ error }));
});

module.exports = router;
