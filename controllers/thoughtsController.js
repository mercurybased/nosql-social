const { User, Thoughts} = require('../models');

module.exports = {
    //get all thoughts
    getThoughts(req, res) {
        Thoughts.find()
            .select('-__v')
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    //get single thought by id
    getSingleThought(req, res) {
        Thoughts.findOne({ _id: req.params.thoughtsId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create a new thought
    createThought(req, res) {
        Thoughts.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: 'thoughts created, but found no user with that ID' })
                    : res.json('Created the thoughts 🎉')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    //update thought by id
    editThought(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtsId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
            !user
            ? res
            .status(404)
            .json({ message: 'thought updated, but found no user with that ID' })
            : res.json('Updated the thought 🎉')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    //delete thought by id
    deleteThought(req, res) {
        Thoughts.findOneAndDelete(
            { _id: req.params.thoughtsId }
        )
            .then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: 'no thought found' })
                    : Reactions.deleteMany({ _id: { $in: thought.Reactions } })
            )
            .then(() => res.json({ message: 'though deleted' }))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    //add reaction to thought
    addReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought ? res.status(404).json({ msg: 'no thought with this ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err))
    },
    //delete reaction from thought
    deleteReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionsId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ msg: 'no thought with this ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err))
    }
};