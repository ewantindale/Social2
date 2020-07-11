const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const User = require("../../models/User");

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
    likedBy: [],
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
      // Check if the user has already liked the post. If so, remove the like.
      // Otherwise add the like and create a notification for the post's author
      if (updatedPost.likedBy.includes(req.user.id)) {
        updatedPost.likedBy = updatedPost.likedBy.filter(
          (e) => e !== req.user.id
        );
      } else {
        updatedPost.likedBy.push(req.user.id);
        const newNotification = new Notification({
          userId: post.authorId,
          authorId: req.user.id,
          authorName: req.user.name,
          action: "like",
        });
        newNotification.save();
      }
      updatedPost
        .save()
        .then(() => res.json({ postId: req.params.id, userId: req.user.id }));
    })
    .catch((error) => res.status(500).json({ error }));
});

// POST /api/posts/:id/comment
// PRIVATE
// Add a comment on a specific post
router.post("/:id/comment", auth, (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      const updatedPost = post;
      const comment = {
        authorId: req.user.id,
        authorName: req.user.name,
        body: req.body.body,
        likedBy: [],
      };
      updatedPost.comments.unshift(comment);
      updatedPost
        .save()
        .then((post) =>
          res.json({ id: req.params.id, comment: post.comments[0] })
        );
    })
    .catch((error) => res.status(500).json({ error }));
});

// POST /api/posts/:postId/:commentId/like
// PRIVATE
// Toggle like on comment specified by commentId, on post specified by postId
router.post("/:postId/:commentId/like", auth, (req, res) => {
  Post.findById(req.params.postId)
    .then((post) => {
      const comment = post.comments.id(req.params.commentId);
      if (comment.likedBy.includes(req.user.id)) {
        comment.likedBy = comment.likedBy.filter((e) => e !== req.user.id);
      } else {
        comment.likedBy.push(req.user.id);
      }
      post.save().then((post) => res.json(post));
    })
    .catch((error) => res.status(500).json({ error }));
});

module.exports = router;
