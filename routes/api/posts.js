const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const Like = require("../../models/Like");

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
    likes: [],
  });

  newPost
    .save()
    .then((post) => res.json(post))
    .catch((error) => res.status(500).json({ error }));
});

// POST /api/posts/:id/like
// PRIVATE
// Toggle like on post specified by id
router.post("/:id/like", auth, (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      const updatedPost = post;
      if (updatedPost.likedBy.includes(req.user.id)) {
        updatedPost.likedBy = updatedPost.likedBy.filter(
          (e) => e !== req.user.id
        );
      } else {
        updatedPost.likedBy.push(req.user.id);
      }
      updatedPost.save().then((post) => res.json(post));
    })
    .catch((error) => res.status(500).json({ error }));
});

module.exports = router;
