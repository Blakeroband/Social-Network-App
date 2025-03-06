// GET all thoughts
// GET a single thought by _id
// POST a new thought
// PUT to update a thought
// DELETE a thought
// POST to create a reaction
// DELETE to remove a reaction
import { Thought } from '../models/index.js';
import { User } from '../models/index.js';
export default {
    // GET all thoughts
    async getAllThoughts(_req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // GET a thought by _id
    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // POST a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            // Update the user's thoughts array with the new thought ID
            await User.findOneAndUpdate({ _id: req.body.userId }, { $push: { thoughts: thought._id } }, { new: true });
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // PUT to update a thought by _id
    async updateThoughtById(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, { new: true });
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // DELETE a thought by _id
    async deleteThoughtById(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // DELETE all thoughts
    async deleteAllThoughts(_req, res) {
        try {
            const result = await Thought.deleteMany({});
            res.json({ message: `${result.deletedCount} thoughts deleted.` });
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // POST to create a reaction 
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $push: { reactions: req.body } }, { new: true });
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // DELETE to remove a reaction
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // GET all reactions
    async getAllReactions(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            if (thought) {
                res.json(thought.reactions);
            }
            else {
                res.status(404).json({ message: 'Thought not found' });
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
};
