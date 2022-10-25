const { Thought, User, Reaction } = require("../models");

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((error) => res.status(500).json(error));
  },

  getOneThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) => {
        !thought
          ? res
              .status(404)
              .json({ message: "Couldn't find a thought with that ID." })
          : res.json(thought);
      })
      .catch((error) => res.status(500).json(error));
  },

  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {
        $addToSet: {
          reactions: {
            reactionBody: req.body.reactionBody,
            username: req.body.username,
          },
        },
      },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
    console.log(req.body.reactionBody, req.body.username);
  },

  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that id" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : User.findOneAndUpdate(
              { thought: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "Thought deleted" })
          : res.json({ message: "Thought Deleted!" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
