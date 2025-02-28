import { Router } from 'express';
import thoughtController from '../../controllers/thoughtController.js';

const router = Router();

// /api/thoughts
router.route('/thoughts')
  .get(thoughtController.getAllThoughts)
  .post(thoughtController.createThought);

// /api/thoughts/:thoughtId
router.route('/thoughts/:Id')
  .get(thoughtController.getThoughtById)
  .put(thoughtController.updateThoughtById)
  .delete(thoughtController.deleteThoughtById);

// /api/thoughts/thought/:Id/reactions
router.route('/thoughts/:Id/reactions')
  .post(thoughtController.createReaction)
  .get(thoughtController.getAllReactions);

// /api/thoughts/thought/:Id/reactions/:reactionId
router.route('/thoughts/:Id/reactions/:Id')
    .delete(thoughtController.deleteReaction);

export default router;  