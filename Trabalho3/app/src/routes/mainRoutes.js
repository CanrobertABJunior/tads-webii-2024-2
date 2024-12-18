import express from 'express';
import { 
    renderRelatorios, 
    renderProdutos, 
    renderFinanceiro,
    getUserById,
    editarPermissoes
} from '../controllers/mainController.js';
import { isAuth } from '../middlewares/is-auth.js';
import { isAdminOrSuper } from '../middlewares/is-admin-or-super.js';
import { heavePermission } from '../middlewares/heave-permission.js';
import { getUsers, registerUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/login');
});
router.get('/relatorios', isAuth, heavePermission, renderRelatorios);
router.get('/produtos', isAuth, heavePermission, renderProdutos);
router.get('/financeiro', isAuth, heavePermission, renderFinanceiro);

router.get('/home', isAuth, async (req, res) => {
    const userName = req.session.user?.name;
    const userId = req.session.user?.userId;
    const users = await getUsers();
    res.render('home', { users, userName, userId });
});
router.get('/gestao', isAuth, isAdminOrSuper, async (req, res) => {
    const users = await getUsers();
    const sessionUser = req.session.user; 
    res.render('gestao', { users, sessionUser });
});
router.get('/cria-novo', isAuth, isAdminOrSuper, (req, res) => {
    const sessionUser = req.session.user;
    res.render('cria-novo', { sessionUser });
    res.status(200);
});
router.post('/registerNew', registerUser);

// router.get('/editar-usuario/:id', isAuth, isAdminOrSuper, getUserById);
// router.get("/editar-permissoes/:id", isAuth, isAdminOrSuper )
router.post('/editar-permissoes/:id', isAuth, editarPermissoes);
export default router;
