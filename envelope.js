
class Envelopes {

    constructor(total_Budget)
    {
        this._envelopes = {}
        this._total_Budget = total_Budget;
        this._amount_allocated = 0; 
    }
    get totalBudget() {
        return this._total_Budget;
    }
    get amountAllocated()
    {
        return this._amount_allocated;
    }
    get amountAvailable()
    {
        return this._total_Budget-this._amount_allocated;
    }
    get envelopes() {
        return this._envelopes;
    }

    getEnvelopeBudget(envelope)
    {
        return this._envelopes[envelope];
    }
    addEnvelope(envelope,budget = 0)
    {
        if(this._envelopes[envelope]) throw new Error("Envelope already exist");
        if(budget > this.amountAvailable) throw new Error("Insufficient fund");
        this._envelopes[envelope] = budget;
    }
    updateEnvelopeBudget(envelope,new_budget)
    {
        if(!this._envelopes[envelope]) throw new Error("Envelope doesn't exist");

        if(budget > (this.amountAvailable+this._envelopes[envelope])) throw new Error("Insufficient fund");

        this._envelopes[envelope] = new_budget;
    }
    addToEnvelopeBudget(envelope,amount_to_add)
    {
        if(!this._envelopes[envelope]) throw new Error("Envelope doesn't exist");

        if(amount_to_add > this.amountAvailable) throw new Error("Insufficient fund");

        this._envelopes[envelope] += amount_to_add;
    }
    deductFromEnvelopeBudget(envelope,amount_to_deduct)
    {
        if(!this._envelopes[envelope]) throw new Error("Envelope doesn't exist");

        if(amount_to_deduct > this._envelopes[envelope]) throw new Error("Insufficient envelope fund");

        this._envelopes[envelope] -= amount_to_deduct;
    }
    transferBudget(sender_envelope,reciver_envelope , amount = undefined)
    {
        if(!this._envelopes[sender_envelope] || !this._envelopes[reciver_envelope]) throw new Error("Envelope doesn't exist");

        if(!amount) amount = this._envelopes[sender_envelope];

        this._envelopes[reciver_envelope] += amount;
        this._envelopes[sender_envelope] -= amount;

    }

}







 


