import joi from "joi";

export function signUpSchema(req, res, next) {

    const signUpSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(3).required(),
        passwordConfirmation: joi.string().min(3).valid(joi.ref('password')).required()
    })

    const user = req.body;
    
    const validation = signUpSchema.validate(user, {abortEarly: false})
    if(validation.error) {
        const messages = validation.error.details.map((error) => error.message)
        return res.status(400).send(messages)
    }

    next()
}