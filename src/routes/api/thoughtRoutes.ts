import { Router } from 'express';
import thoughtController from '../../controllers/thoughtController.js';

const router = Router();

// /api/thoughts
router.route('/')
  .get(thoughtController.getAllThoughts)
  .post(thoughtController.createThought)
  .delete(thoughtController.deleteAllThoughts);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
  .get(thoughtController.getThoughtById)
  .put(thoughtController.updateThoughtById)
  .delete(thoughtController.deleteThoughtById);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .post(thoughtController.createReaction)
  .get(thoughtController.getAllReactions);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
  .delete(thoughtController.deleteReaction);
  
export default router;  