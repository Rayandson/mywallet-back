import { transactionSchema } from "../index.js";
import { transactionsCollection, sessionsCollection, balancesCollection } from "../database/db.js"
import dayjs from "dayjs";

export async function makeTransaction(req, res) {
    const token = req.headers.token;
    const transaction = req.body;
    const dayJsObject = dayjs();
    const cash = Number(transaction.cashValue).toFixed(2)

    const validation = transactionSchema.validate(transaction, {abortEarly: false})
    if(validation.error) {
        return res.status(400).send(validation.error.details)
    }

    try {
        console.log(token)
        const isAuthorized = await sessionsCollection.findOne({token});
        if(!isAuthorized) {
            res.sendStatus(401)
        }


        const balanceExists = await balancesCollection.findOne({userId: isAuthorized.userId})
        let balance = 0;
        if(!balanceExists) {
            balance = Number(transaction.cashValue).toFixed(2) 
            await transactionsCollection.insertOne({...transaction, cashValue: cash, userId: isAuthorized.userId, date: dayJsObject.format('DD/MM')}) 
            await balancesCollection.insertOne({balance, userId: isAuthorized.userId})
            return res.sendStatus(200) 
        } else if(transaction.type === "input"){
            balance = (Number(balanceExists.balance) + Number(transaction.cashValue)).toFixed(2)
        } else if(transaction.type === "output") {
            balance = (Number(balanceExists.balance) - Number(transaction.cashValue)).toFixed(2) 
        } else {
            return res.sendStatus(400) 
        }

    
        await transactionsCollection.insertOne({...transaction, cashValue: cash, userId: isAuthorized.userId, date: dayJsObject.format('DD/MM')})  
        await balancesCollection.updateOne({userId: isAuthorized.userId}, {$set: {balance: balance}}) 
        res.sendStatus(200)
    } catch {
        res.sendStatus(500) 
    }

}

export async function getTransactions(req, res) { 
    const token = req.headers.token

    try {
        const isAuthorized = await sessionsCollection.findOne({token})
        if(!isAuthorized) {
            res.status(401).send("Usuário não autorizado")
        }
    
        let transactions = await (await transactionsCollection.find({userId: isAuthorized.userId}).toArray()).reverse()
        let balance = await balancesCollection.findOne({userId: isAuthorized.userId})
        
        if(transactions.length === 0) { 
            balance = 0; 
        }
        
        res.status(200).send({transactions, balance: balance.balance}) 
    } catch {
        res.sendStatus(500)
    }
  
}