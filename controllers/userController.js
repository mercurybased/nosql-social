const { User, Thoughts } = require('../models');

module.exports = {
    //get all users
    getUsers(req,res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err))
    },
    //get user by id
    getSingleUser(req,res) {
        User.findOne({_id:req.params.userId})
        .select('-__v')
        .then((user)=>
        !user
        ? res.status(404).json({message: 'no user with this id!'})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err))
    },
    //creating a user
    createUser(req,res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err)
            return res.status(500).json(err)
        })
    },
    //updating a user
    updateUser(req,res) {
        User.findOneAndUpdate(
            {_id:req.params.userId},
            {$set: req.body},
            {new:true}
        )
        .then ((user) =>
        !user
            ? res.status(404).json({message:'No user with this id!'})
            : res.json(user)
            )
            .catch((err) => res.status(500).json(err))
    },
    //delete user and associated data(thoughts)
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : Thoughts.deleteMany({ _id: { $in: user.thoughts } })
          )
          .then(() => res.json({ message: 'user and their thoughts deleted!' }))
          .catch((err) => res.status(500).json(err));
      },
    //adding a friend to user
    addFriend(req,res) {
        User.findOneAndUpdate(
            {_id:req.params.userId},
            {$addToSet: { friends: req.body}},
            {runValidators: true, new: true}
            )
            .then ((user) =>
            !user
            ? res.status(404).json({message:'No user with this id!'})
            : res.json(user)
            )
            .catch((err) => res.status(500).json(err))
        },
        //delete friend
    deleteFriend(req,res) {
        User.delete(
            {_id:req.params.userId},
            {$addToSet: { friends: req.body}},
            {runValidators: true, new: true}
            )
            .then ((user) =>
            !user
            ? res.status(404).json({message:'No user with this id!'})
            : res.json(user)
            )
            .catch((err) => res.status(500).json(err))
        }
}

