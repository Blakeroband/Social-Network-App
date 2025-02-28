// GET all thoughts
// GET a single thought by _id
// POST a new thought
// PUT to update a thought
// DELETE a thought
// POST to create a reaction
// DELETE to remove a reaction

import { Request, Response } from 'express';
import { Thought } from '../models/index.js';

export default {
  // GET all thoughts
  async getAllThoughts(_req: Request, res: Response) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET a thought by _id
  async getThoughtById(req: Request<{ thoughtId: string}>, res: Response) {
    try {
      const thought = await Thought.findOne({_id: req.params.thoughtId});
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // POST a new thought
  async createThought(req: Request, res: Response) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // PUT to update a thought by _id
  async updateThoughtById(req: Request<{ thoughtId: string}>, res: Response) {
    try {
      const thought = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, req.body, { new: true });
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // DELETE a thought by _id
  async deleteThoughtById(req: Request<{ thoughtId: string}>, res: Response) {
    try {
      const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId});
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // POST to create a reaction 
  async createReaction(req: Request<{ thoughtId: string}>, res: Response) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true }
      );
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // DELETE to remove a reaction
  async deleteReaction(req: Request<{ thoughtId: string, reactionId: string}>, res: Response) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET all reactions
  async getAllReactions(req: Request<{ thoughtId: string}>, res: Response) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (thought) {
        res.json(thought.reactions);
      } else {
        res.status(404).json({ message: 'Thought not found' });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
