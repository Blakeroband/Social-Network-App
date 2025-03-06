import { Router } from 'express';
import userController from '../../controllers/userController.js';
const router = Router();
// /api/users
router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)
    .delete(userController.deleteAllUsers);
// /api/users/:userId
router.route('/:userId')
    .get(userController.getUserById)
    .put(userController.updateUserById)
    .delete(userController.deleteUserById);
// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(userController.addFriend)
    .delete(userController.removeFriend);
export default router;
