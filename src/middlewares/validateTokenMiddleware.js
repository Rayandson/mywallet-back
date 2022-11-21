export function validateToken(req, res, next) {
    const token = req.headers.token;

    if(!token) {
        return res.sendStatus(401)
    }

    next()
}