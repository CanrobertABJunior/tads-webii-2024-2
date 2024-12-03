import bcrypt from 'bcrypt';
import prisma from '../models/prismaClient.js';

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const encrypted = bcrypt.hashSync("CHAVE" + password, 10);

    await prisma.user.create({
        data: { name, email, password: encrypted },
    });

    res.redirect('/login');
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isValid = bcrypt.compareSync("CHAVE" + password, user.password);
    if (!isValid) return res.status(400).json({ error: 'invalid credentials' });

    req.session.user = {
        userId: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
    };

    res.redirect('/home');
};

export const logoutUser = (req, res) => {
    res.status(200);
    req.session.destroy();
    res.redirect('/');
};
