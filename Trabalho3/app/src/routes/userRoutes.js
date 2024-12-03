import express from 'express';
import multer from 'multer';
import { getUsers, getUserById } from '../controllers/userController.js';
import { updateProfileImage } from '../controllers/userController.js';
import { isAuth } from '../middlewares/is-auth.js';
import { isAdmin } from '../middlewares/is-admin.js';

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.get('/:id', isAuth, getUserById);
router.post('/atualizar-perfil-imagem/:id', upload.single('foto'), updateProfileImage);



export default router;
