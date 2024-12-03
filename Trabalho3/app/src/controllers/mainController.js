import prisma from '../models/prismaClient.js';

export const renderRelatorios = (req, res) => {
    const userId = req.session.user?.userId;
    res.render('relatorios', { userId });
};

export const renderProdutos = (req, res) => {
    const userId = req.session.user?.userId;
    res.render('produtos', { userId });
};

export const renderFinanceiro = (req, res) => {
    const userId = req.session.user?.userId;
    res.render('financeiro', { userId });
};

export const renderGestao = (req, res) => {
    const userId = req.session.user?.userId;
    res.render('gestao', { userId });
};

export const getUserById = async (req, res) => {
    const id = req.params.id;

        // Busca o usuário e suas permissões em uma única consulta
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
            include: { userPermissions: true },
        });

        // Lista de módulos disponíveis
        const allModules = [
            { value: "/relatorios", label: "Módulo de Relatórios" },
            { value: "/financeiro", label: "Módulo Financeiro" },
            { value: "/produtos", label: "Módulo de Produtos" },
        ];

        const userPermissions = user.userPermissions.map((perm) => perm.route);

        res.render('editar-usuario', { user, allModules, userPermissions });
};

export const editarPermissoes = async (req, res) => { 
    const modulesArray = value => Array.isArray(req.body.modules) ? req.body.modules : [req.body.modules];
    const modules = modulesArray(modulesArray);
    const userId = parseInt(req.params.id);

    await prisma.userPermission.deleteMany({ 
        where: { userId: parseInt(userId) },
    });

    if (typeof modules !== "undefined" && modules[0] !== undefined) {
        const newPermissions = modules.map((route) => ({
            userId,
            route,
        }));

        await prisma.userPermission.createMany({ data: newPermissions });
    }

    res.redirect('/gestao'); 
}