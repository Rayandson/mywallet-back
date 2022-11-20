import { usersCollection, sessionsCollection, signUpSchema, signInSchema } from "../index.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';

export async function signUp(req, res) {
    const user = req.body;
    
    const validation = signUpSchema.validate(user, {abortEarly: false})
    if(validation.error) {
        const messages = validation.error.details.map((error) => error.message)
        return res.status(400).send(messages)
    }

        try {
            const isUser = await usersCollection.findOne({email: user.email})
            if (isUser) {
                return res.status(401).send("O usuário já existe!")
            } else {
                const hashPassword = bcrypt.hashSync(user.password, 10)
                delete user.passwordConfirmation
                await usersCollection.insertOne({...user, password: hashPassword})
                res.sendStatus(200)
            }
        } catch (err) {
            res.sendStatus(500)
        }
   
}

export async function signIn(req, res) {
    const user = req.body;

    const validation = signInSchema.validate(user, { abortEarly: false})
    if(validation.error) {
        const messages = validation.error.details.map((error) => error.message)
        return res.status(400).send(messages)
    }

    const token = uuid()

    try {
        const isUser = await usersCollection.findOne({email: user.email})

        if(!isUser) { 
            return res.status(409).send("usuário incorreto") 
        }    

        const passwordIsOk = bcrypt.compareSync(user.password, isUser.password)

        if(!passwordIsOk) {
            return res.status(409).send("Senha incorreta")
        }

        delete isUser.password
        const session = await sessionsCollection.findOne({userId: isUser._id})

        if(!session) {
            await sessionsCollection.insertOne({token, userId: isUser._id})
            return res.status(200).send({...isUser, token})
        }
        return res.status(200).send({...isUser, token:session.token})
               
    } catch {
        res.sendStatus(500)
    }
}