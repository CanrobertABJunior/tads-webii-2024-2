const isAdmin = (req, res, next) => {
    if (req.session.user?.role !== "ADMIN") {
        return res.status(403).render('acesso-restrito');
    }   
    next();
}

export { isAdmin };