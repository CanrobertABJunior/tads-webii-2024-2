const isAdminOrSuper = (req, res, next) => {
    if (req.session.user?.role === "SUPER" || req.session.user?.role === 'ADMIN') {
        return next();
    }

    return res.status(403).render('acesso-restrito');
};

export { isAdminOrSuper };