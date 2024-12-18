const isSuper = (req, res, next) => {
    if (req.session.user?.role !== "SUPER") {
        return res.status(403).render('acesso-restrito');
    }   
    next();
}

export { isSuper };