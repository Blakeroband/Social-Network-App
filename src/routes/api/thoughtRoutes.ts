import { Router } from 'express';
import thoughtController from '../../controllers/thoughtController';

const router = Router();

// /api/thoughts
router.route('/')
  .get(thoughtController.getAllThoughts)
  .post(thoughtController.createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
  .get(thoughtController.getThoughtById)
  .put(thoughtController.updateThoughtById)
  .delete(thoughtController.deleteThoughtById);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .post(thoughtController.createReaction)
  .get(thoughtController.getAllReactions);

export default router;
  