import prisma from '../models/prismaClient.js';

const heavePermission = async (req, res, next) => {

        const userId = req.session.user.userId;
        const route = req.originalUrl;

        const userPermission = await prisma.userPermission.findMany({
            where: { userId: parseInt(userId), route: ( route ) },
        })

        const userSuperOrAdmin = await prisma.user.findFirst({
            where: { id: parseInt(userId), 
                role: {
                    in: ['ADMIN', 'SUPER'],
                }, 
            },
        })      

        if ( (!userSuperOrAdmin) )
        {
            if ( userPermission.length === 0 ) 
            {
                return res.status(403).render('acesso-restrito');
            }
        }

        next();
};


export { heavePermission };