const router = require('express').Router();
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  newFriend,
  deleteFriend,

} = require('../../controllers/user-controller');
// /api/user
router.route('/')
  .get(getAllUser)
  .post(createUser);

// /api/user/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);
// /api/user/:userId/friends/:friendId


router
.route(':/userId/friends/:friendId')
.post(newFriend)
.delete(deleteFriend);

module.exports = router;