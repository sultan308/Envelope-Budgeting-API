

const { response } = require('express');
const express = require('express');

const envelopeRoute = express.Router();



const bodyValidator = (req,res,next) => {
    const envelope = req.body;
    envelope.budget = Number(envelope.budget);
    if(envelope.name !== undefined && !isNaN(envelope.budget))
    {
        req.envelope = envelope;
        next();
    }
    else
    {
        res.status(400).send("Request JSON needs to have name(string) and budget (number)")
    }
    
}

envelopeRoute.param('envelope',(req,res,next,envelope) => {
    try
    {
        let envelopeJSON = req.app.locals.envelopes.getEnvelopeJSON(envelope);
        req.envelopeJSON = envelopeJSON;
        next();       
    }
    catch(err)
    {
        res.status(404).send(err.message);
    }
})

envelopeRoute.get('/', (req,res) =>   res.status(200).send(req.app.locals.envelopes.getEnvelopesJSON()) );

envelopeRoute.get('/:envelope', (req,res,next) => 
{
    res.status(200).send(req.envelopeJSON);
});

envelopeRoute.post('/', bodyValidator,(req,res,next) =>  {
    try
    {
        req.app.locals.envelopes.addEnvelope(req.envelope.name,req.envelope.budget);
        res.status(201).send("Envelope added");
    }  
    catch(err)
    {
        res.status(400).send(err.message);
    } 
});
envelopeRoute.put('/',bodyValidator,(req,res,next) => {
    try
    {
        req.app.locals.envelopes.updateEnvelopeBudget(req.envelope.name,req.envelope.budget);
        res.status(200).send("Envelope updated successfully");
    }
    catch(err)
    {
        let response_status = 400;
        if(err.message === 'Envelope doesn\'t exist') response_status = 404;
        
        res.status(response_status).send(err.message);
    }

});
envelopeRoute.delete('/:envelope', (req,res,next) => {
    
    req.app.locals.envelopes.removeEnvelope(req.envelopeJSON.envelope_name);
    res.status(200).send("Envelope deleted successfully");

});

module.exports = envelopeRoute;