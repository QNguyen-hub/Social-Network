const router = require("express").Router();

const {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  createFriend,
  deleteFriend,
} = require("../../controllers/userControllers");

router.route("/").get(getUsers).post(createUser);

router.route("/:userId").get(getOneUser).delete(deleteUser);

router.route("/:userId").put(updateUser);
router.route("/:userId/friends").post(createFriend);

router.route("/:userId/friends/:friendsId").delete(deleteFriend);

module.exports = router;
