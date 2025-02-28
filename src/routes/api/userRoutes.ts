import { Router } from 'express';

import userController from '../../controllers/userController.js';

const router = Router();

// /api/users
router.route('/users')
  .get(userController.getAllUsers)
  .post(userController.createUser);


  // /api/users/:userId
router.route('/users/:Id')
  .get(userController.getUserById)
  .put(userController.updateUserById)
  .delete(userController.deleteUserById);

// /api/users/:userId/friends/:friendId
router.route('/users/:Id/friends/:Id')
  .post(userController.addFriend)
  .delete(userController.removeFriend);

export default router;