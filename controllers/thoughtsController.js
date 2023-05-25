const { User, Thoughts } = require('../models');

module.exports = {
    getThoughts(req, res) {
      Thoughts.find({})
        .select('-__v')
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
      Thoughts.findOne({ _id: req.params.thoughtsId })
        .select('-__v')
        .then((thoughts) =>
          !thoughts
            ? res.status(404).json({ message: 'No thoughts with that ID' })
            : res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err));
    },
    // create a new thoughts
    createThoughts(req, res) {
      Thoughts.create(req.body)
        .then((thoughts) => {
          return Post.findOneAndUpdate(
            { _id: req.body.postId },
            { $addToSet: { thoughts: thoughts._id } },
            { new: true }
          );
        })
        .then((user) =>
          !user
            ? res
                .status(404)
                .json({ message: 'thoughts created, but found no post with that ID' })
            : res.json('Created the thoughts 🎉')
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
  };