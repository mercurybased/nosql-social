const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  editThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtsController');

// /api/users
router.route('/').get(getThoughts).post(createThought);

// /api/users/:userId
router.route('/:thoughtId').get(getSingleThought);

router.route('/:thoughtId').put(editThought);

router.route('/:thoughtId').delete(deleteThought);

// /api/users/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction)

// /api/users/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions').delete(deleteReaction)

module.exports = router;