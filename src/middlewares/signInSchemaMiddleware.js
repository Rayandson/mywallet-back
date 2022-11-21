import joi from "joi";

export function signInSchema(req, res, next) {
    const user = req.body;

    const signInSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(3).required(),
    })

    const validation = signInSchema.validate(user, { abortEarly: false})
    if(validation.error) {
        const messages = validation.error.details.map((error) => error.message)
        return res.status(400).send(messages)
    }

    next()
}
