const router = require('express').Router();
const {
  getThoughts,
  getSingleThoughts,
  createThoughts,
  editThoughts,
  deleteThoughts,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtsController');

// /api/users
router.route('/').get(getThoughts).post(createThoughts);

// /api/users/
router.route('/:thoughtsId').get(getSingleThoughts);

router.route('/:thoughtsId').put(editThoughts);

router.route('/:thoughtsId').delete(deleteThoughts);

// /api/users/:thoughtId/reactions
router.route('/:thoughtsId/reactions').post(addReaction)

// /api/users/:thoughtId/reactions/:reactionId
router.route('/:thoughtsIds/reactions').delete(deleteReaction)

module.exports = router;