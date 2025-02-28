import { Request, Response } from 'express';
import { User } from '../models/userModel';
import { Thought } from '../models/thoughtModel';
import { get } from 'mongoose';

export default {
  // GET all users from /api/users
  async getAllUsers(_req: Request, res: Response) {
    try {
      const users = await User.find().populate('thoughts;');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET a user by _id and populate thought and friend data
  async getUserById({  })
}