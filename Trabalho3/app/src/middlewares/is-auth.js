import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
})

const isAuth = async (req, res, next) => {
    if (req.session.user === undefined) {
        return res.status(403).render('acesso-restrito');
        
    }
    next();
}

export { isAuth };