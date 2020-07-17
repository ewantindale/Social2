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
    authorId: req.user._id,
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
      if (updatedPost.likedBy.includes(req.user._id)) {
        updatedPost.likedBy = updatedPost.likedBy.filter(
          (e) => e !== req.user._id
        );
      } else {
        updatedPost.likedBy.push(req.user._id);
        const newNotification = new Notification({
          userId: post.authorId,
          authorId: req.user._id,
          authorName: req.user.name,
          postId: post._id,
          action: "likePost",
        });
        newNotification.save();
      }
      updatedPost
        .save()
        .then(() => res.json({ postId: req.params.id, userId: req.user._id }));
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
        authorId: req.user._id,
        authorName: req.user.name,
        body: req.body.body,
        likedBy: [],
      };
      updatedPost.comments.unshift(comment);
      const newNotification = new Notification({
        userId: post.authorId,
        authorId: req.user._id,
        authorName: req.user.name,
        postId: post._id,
        action: "comment",
      });
      newNotification.save();
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
      if (comment.likedBy.includes(req.user._id)) {
        comment.likedBy = comment.likedBy.filter((e) => e !== req.user._id);
      } else {
        comment.likedBy.push(req.user._id);
        const newNotification = new Notification({
          userId: comment.authorId,
          authorId: req.user._id,
          authorName: req.user.name,
          postId: post._id,
          action: "likeComment",
        });
        newNotification.save();
      }
      post.save().then((post) => res.json(post));
    })
    .catch((error) => res.status(500).json({ error }));
});

//  DELETE /api/posts/:id
//  Deletes a specific post
router.delete("/:id", auth, (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (req.user._id !== post.authorId) {
        return res
          .status(401)
          .json({ msg: "Incorrect user ID, authorization denied" });
      }
      post.remove().then(() => res.json({ success: true }));
    })
    .catch((error) => res.status(500).json({ error }));
});

module.exports = router;
