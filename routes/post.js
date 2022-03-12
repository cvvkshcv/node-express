const express = require('express');
const router = express.Router();
const Post = require('../schemas/PostSchema');


router.post('/add', async (req, res) => {
  const { title, body } = req.body;
  try {
    const post = new Post({ title, body, postedBy: req.user._id });
    const result = await post.save();
    res.json({ message: 'Post added', result });
  } catch (error) {
    res.status(500).json({ message: 'Error while adding post', error });
  }
})

router.post('/get_all', async (req, res) => {
  // 622c6596c53cdf858e2701ba
  const allPost = await Post.find({ postedBy: req.user._id })
                      .populate({path: 'postedBy', select: 'name email'})
                      .populate({path: 'comments.userId', select: 'name email'});
  res.json({
    posts: allPost
  });
})

router.post('/add_comments', async (req, res) => {
  // Post id: 622c70770409a57f5837ae9b
  const { post_id, comment } = req.body;
  try {
    const post = await Post.findById(post_id);
    if (post) {
      post.comments.push({ userId: req.user._id, comment });
      post.save();
      res.json({ message: "comment added" });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
})

router.post('/update_comment', async(req, res) => {
  // comment id: 622c748672646e868e3e923b
  const { post_id, comment_id, comment } = req.body;
  const post = await Post.findOneAndUpdate({ 'comments._id' : comment_id }, {
    $set: {
      "comments.$.comment": comment
    }
  }, { new : true });
  res.json({
    post,
    message: "Post added"
  });
})

router.post('/delete_post', async (req, res) => {
  const { post_id, comment_id } = req.body;
  try {
    const post = await Post.findOneAndUpdate({ _id : post_id }, {
      $pull: {
        comments: {_id: comment_id}
      }
    }, { new: true });
    res.json({
      post,
      message: "Post deleted"
    });
  } catch (error) {
    res.json({
      error,
      message: "error deleting post"
    });
  }
})

// router.post('/', (req, res) => {
//   res.json();
// })

module.exports = router;
