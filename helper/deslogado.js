module.exports = {
    deslogado: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next()
        }
        else {
            console.log(req.user)
            return res.status(401).json({ message: 'Unauthorized Request' });
        }

    }
}