export function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "")

    if(!token) {
        return res.sendStatus(409)
    }

    next()
}