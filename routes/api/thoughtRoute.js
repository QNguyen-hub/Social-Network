const router = require("express").Router();

const {
  getThoughts,
  getOneThought,
  createThought,
  updateThought,
  addReaction,
  deleteReaction,
  deleteThought,
} = require("../../controllers/thoughtControllers");

router.route("/").get(getThoughts).post(createThought);

router.route("/:thoughtId").get(getOneThought).delete(deleteThought);

router.route("/:thoughtId/reactions/").post(addReaction);

router.route("/:thoughtId/reactions/:reactionId").post(addReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

router.route("/update/:thoughtId").put(updateThought);

module.exports = router;
