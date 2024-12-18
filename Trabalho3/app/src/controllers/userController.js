import bcrypt from 'bcrypt';
import prisma from '../models/prismaClient.js';

export const getUsers = async (req, res) => {
    const users = await prisma.user.findMany({
        select: { id: true, name: true, email: true, role: true, userPermissions: true, profileImage: true },
    });
    return (users);
};

export const getUserById = async (req, res) => {
    const userId = req.session.user?.userId;
    const user = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
        include: { userPermissions: true, accessLogs: true, profileImage: true },
    });
    res.render('perfil', { user, userId });
};

export const updateProfileImage = async (req, res) => {
    const id = req.session.user?.userId;
    const imageId = req.file.filename;

    try {
        const existingProfileImage = await prisma.profileImage.findUnique({
            where: { userId: parseInt(id) },
        });

        if (existingProfileImage) {
            await prisma.profileImage.update({
                data: { imageId: imageId },
            });
        } else {
            await prisma.profileImage.create({
                data: {
                    userId: parseInt(id),
                    imageId: imageId,
                },
            });
        }
        res.json({ success: true, imageId: imageId });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Erro ao atualizar a imagem de perfil' });
    }
};

export const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    const modules = req.body.modules;
    const encrypted = bcrypt.hashSync("CHAVE" + password, 10);
    const selectedModules = [modules] || [];

    const newUser = await prisma.user.create({
        data: { 
            name, 
            email, 
            password: encrypted, 
            role, 
        },
    });

    if (selectedModules.length > 0) {
        await prisma.userPermission.createMany({
            data: selectedModules.map(module => ({
                userId: newUser.id,
                route: module,
            })),
        });
    }

    res.redirect('/gestao');
};
