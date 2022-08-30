import express from 'express';
import controller from '../controllers/user';
import auth from '../middlewares/authorizer';

const router = express.Router();
router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/validate', auth, controller.validateToken);

export = router;