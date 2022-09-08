import express from 'express';
import controller from '../controllers/post';
import auth from '../middlewares/authorizer';

const router = express.Router();
router.get('/fetchPosts', controller.fetchPosts);
router.get('/fetchPosts/:ownerId', controller.fetchPosts);
router.get('/:id', controller.getPost);
router.delete('/:id', auth, controller.deletePost);
router.post("/", auth, controller.createPost);
router.patch("/:id", auth, controller.updatePost);

export = router;