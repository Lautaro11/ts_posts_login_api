import express from 'express';
import controller from '../controllers/posts';
import auth from '../middlewares/authorizer';

const router = express.Router();
router.post('/getPosts', controller.getPosts);
router.post('/getPost', controller.getPost);
router.get('/:id', auth, controller.deletePost);
router.post("/", auth, controller.createPost);
router.patch("/:url", auth, controller.updatePost);

export = router;