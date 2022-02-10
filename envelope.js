
class Envelopes {

    constructor(total_Budget)
    {
        this._envelopes = {}
        this._total_Budget = total_Budget;
        this._amount_used = 0; 
    }
    get totalBudget() {
        return this._total_Budget;
    }
    get amountUsed()
    {
        return this._amount_used;
    }
    get amountAvailable()
    {
        return this._total_Budget-this._total_used;
    }
    get envelopes() {
        return this._envelopes;
    }

    getEnvelopeBudget(name)
    {
        return this._envelopes[name];
    }
    addEnvelope(name,budget = 0)
    {
        if(this._envelopes[name]) throw new Error("Envelope already exist");
        if(budget > this.amountAvailable) throw new Error("Insufficient fund");
        this._envelopes[name] = budget;
    }
    updateEnvelopeBudget(name,new_budget)
    {
        if(!this._envelopes[name]) throw new Error("Envelope doesn't exist");

        if(budget > (this.amountAvailable+this._envelopes[name])) throw new Error("Insufficient fund");

        this._envelopes[name] = new_budget;
    }
    addToEnvelopeBudget(name,amount_to_add)
    {
        if(!this._envelopes[name]) throw new Error("Envelope doesn't exist");

        if(amount_to_add > this.amountAvailable) throw new Error("Insufficient fund");

        this._envelopes[name] += amount_to_add;
    }
    deductFromEnvelopeBudget(name,amount_to_deduct)
    {
        if(!this._envelopes[name]) throw new Error("Envelope doesn't exist");

        if(amount_to_deduct > this._envelopes[name]) throw new Error("Insufficient envelope fund");

        this._envelopes[name] -= amount_to_deduct;
    }

}







 


