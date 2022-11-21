import joi from "joi"

export function validateTransaction(req, res, next) {
    const transactionSchema = joi.object({
        cashValue: joi.number().required(),
        description: joi.string().min(3).required(),
        type: joi.required(),
        userId: joi.required()
    })

    const validation = transactionSchema.validate(transaction, {abortEarly: false})
    if(validation.error) {
        return res.status(400).send(validation.error.details)
    }

    next();
}