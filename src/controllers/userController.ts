import { Request, Response } from 'express';
import { User } from '../models/index.js';

export default {

  // POST create a new user
  async createUser(req: Request, res: Response) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  // GET all users from /api/users
  async getAllUsers(_req: Request, res: Response) {
    try {
      const users = await User.find().populate('thoughts');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET a user by _id and populate thought and friend data
  async getUserById( req: Request<{ userId: string}>, res: Response) {
    try {
      const user = await User.findOne({_id: req.params.userId}).populate('thoughts');
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // PUT to update a user by _id
  async updateUserById(req: Request<{ userId: string}>, res: Response) {
    try {
      const user = await User.findOneAndUpdate({_id: req.params.userId, }, req.body, { new: true });
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // DELETE remove user by _id
  async deleteUserById(req: Request<{ userId: string}>, res: Response) {
    try {
      const user = await User.findOneAndDelete({_id: req.params.userId});
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // DELETE to remove all users
  async deleteAllUsers(_req: Request, res: Response) {
    try {
      const users = await User.deleteMany();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // POST to add a new friend to a user's friend list
  async addFriend(req: Request<{ userId: string, friendId: string}>, res: Response) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // DELETE to remove a friend from a user's friend list
  async removeFriend(req: Request<{ userId: string, friendId: string}>, res: Response) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};