const express = require('express');

const transferRoute = express.Router();

const transferValidator = (req,res,next) => {
    const transfer = req.body;
    try
    {
        if(transfer.sender_envelope !== undefined && 
            transfer.reciver_envelope !== undefined )
        {
            if(transfer.amount !== undefined && isNaN(Number(transfer.amount))) throw new Error("Provided amount is not a number") 
            req.transfer = transfer;
            next();
        }
        else
        {
            throw new Error("Request JSON needs to have sender_envelope  and reciver_envelope")
        }
    }
    catch(err)
    {
        res.send(err.message);
    }
    
}


transferRoute.put('/',transferValidator,(req,res) => {
    try
    {
        if(req.transfer.amount) req.app.locals.envelopes.transferBudget(req.transfer.sender_envelope,
                                                         req.transfer.reciver_envelope,
                                                         req.transfer.amount);

        else req.app.locals.transferBudget(req.transfer.sender_envelope,req.transfer.reciver_envelope);

        res.status(200).send("Transfer completed")

    }
    catch(err)
    {
        res.send(400).send(err.message);
    }
})

module.exports = transferRoute;