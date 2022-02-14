class Envelopes {
    
    constructor()
    {
        this._envelopes = {}
        this._total_Budget = 0
    }

    // Getter methods -----

    get totalBudget() {
        return this._total_Budget;
    }
    get envelopes() {
        return this._envelopes;
    }
    getEnvelopesJSON()
    {
        return { 
                 total_budget : this._total_Budget,
                 envelopes : this._envelopes
               }
    }
    getEnvelopeJSON(envelope_name)
    {
        this._throwErrorIfDoesNotExist(envelope_name);

        return { 
                 envelope_name : envelope_name,
                 envelope_budget : this._envelopes[envelope_name]
               }
    }
    getEnvelopeBudget(envelope_name)
    {
        this._throwErrorIfDoesNotExist(envelope_name);
        return this._envelopes[envelope_name];
    }
    // Helper methods ----
    
    _throwErrorIfDoesNotExist(envelope_name)
    {
        if(this._envelopes[envelope_name] === undefined){

             throw new Error("Envelope doesn't exist");
        }
    }
    _throwErrorIfExists(envelope_name)
    {
        if(this._envelopes[envelope_name] !== undefined){
            
             throw new Error("Envelope already exist");
        }
    }
    _throwErrorIfNegative(amount)
    {
        if(amount < 0){
            
             throw new Error("Can not be a negative number");
        }
    }
   
   
    

    // Mutator methods -----
    
    addEnvelope(envelope_name,budget = 0)
    {
        this._throwErrorIfExists(envelope_name);

        this._throwErrorIfNegative(budget);

        this._envelopes[envelope_name] = budget;
        this._total_Budget+=budget;
    }

    updateEnvelopeBudget(envelope_name,new_budget)
    {
        this._throwErrorIfDoesNotExist(envelope_name);
         
        this._throwErrorIfNegative(new_budget);
        

        this._total_Budget -= this._envelopes[envelope_name];

        this._envelopes[envelope_name] = new_budget;

        this._total_Budget += new_budget;
        
    }

    addToEnvelopeBudget(envelope_name,amount_to_add)
    {
        this._throwErrorIfDoesNotExist(envelope_name);

        this._throwErrorIfNegative(amount_to_add);

        this._envelopes[envelope_name] += amount_to_add;
        this._total_Budget += amount_to_add;

    }
    deductFromEnvelopeBudget(envelope_name,amount_to_deduct)
    {
        this._throwErrorIfDoesNotExist(envelope_name);
        
        this._throwErrorIfNegative(amount_to_deduct);

        if(amount_to_deduct > this._envelopes[envelope_name]) throw new Error("Insufficient envelope fund");

        this._envelopes[envelope_name] -= amount_to_deduct;
        this._total_Budget -= amount_to_deduct;
    }
    transferBudget(sender_envelope,reciver_envelope , amount = undefined)
    {
        this._throwErrorIfDoesNotExist(sender_envelope);
        this._throwErrorIfDoesNotExist(reciver_envelope);


        if(amount === undefined) amount = this._envelopes[sender_envelope];

        this._throwErrorIfNegative(amount);

        if(amount > this._envelopes[sender_envelope]) throw new Error("Insufficient sender envelope fund")

        this._envelopes[reciver_envelope] += amount;
        this._envelopes[sender_envelope] -= amount;

    }
    removeEnvelope(envelope_name)
    {
        this._throwErrorIfDoesNotExist(envelope_name);

        this._total_Budget -= this._envelopes[envelope_name];
        delete this._envelopes[envelope_name];
    }
    clear()
    {
        this._total_Budget = 0;
        this._envelopes = {};
    }

}

module.exports = Envelopes;






 


