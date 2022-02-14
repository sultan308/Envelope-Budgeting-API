const Envelopes = require('../envelopes');
const {assert} = require('chai');

let envelopes;

describe("Envelopes",()=> {
    beforeEach(()=>{
        envelopes = new Envelopes();
      
    });
    describe('Constructor',()=>{
            it('Creates an object with total budget of 0 and empty envelopes', ()=> {
                
                
                assert.strictEqual(envelopes._total_Budget , 0);
                assert.isEmpty(envelopes._envelopes);

            })
        });
    describe('Mutator Functions',() =>{
        
        describe('.addEnvelope',()=> {
            it('When given only a name argument creates an envelope with the name and budget of 0' , () => {
            
            
                let envelope_name = "Food";

                envelopes.addEnvelope(envelope_name);

                assert.strictEqual(envelopes._envelopes[envelope_name],0);

            });
            it('When given a name and a budget creates an envelope with the name and budget supplied' , () => {
                
                
                let envelope_name = "Health";
                let envelope_budget = 200;

                envelopes.addEnvelope(envelope_name,envelope_budget);

                assert.strictEqual(envelopes._envelopes[envelope_name],envelope_budget);

            });
            it('Throws an error("Envelope already exist") if the envelope name already exists' , () => { 

            
                let envelope_name = "Education"; 
                
                let addEnvelope = ()=>envelopes.addEnvelope(envelope_name);
                
                addEnvelope();

                assert.throws(addEnvelope, 'Envelope already exist');
                

            });
            it('Throws an error("Can not be a negative number") if the envelope a negative number is given and the creation of the envelope is ommited' , () => { 

                
                let envelope_name = "Bills";
                let envelope_budget = -1;
                
                let addEnvelop = ()=> envelopes.addEnvelope(envelope_name,envelope_budget);
                
                assert.throws(addEnvelop, 'Can not be a negative number');
                assert.isUndefined(envelopes._envelopes[envelope_name]);
    
            });
        });
        describe('.removeEnvelope',()=>{
            it('Removes a given envlope by name as an argument',()=>{
                
                let envelope_name = "Food";

                envelopes.addEnvelope(envelope_name);
                envelopes.removeEnvelope(envelope_name);

                assert.isUndefined(envelopes._envelopes[envelope_name]);

            });
            it('Removing an envelope that does not exist throw error("Envelope doesn\'t exist")',()=>{
            
                let envelope_name = "bills";

                
                let removeEnvelope = () => envelopes.removeEnvelope(envelope_name);

                assert.throws(removeEnvelope, 'Envelope doesn\'t exist');

            });
            
        });
        describe('.updateEnvelopeBudget',()=>{
            it('Updates the budget of a given envelope name',()=>{
                
                let envelope_name = "Food";
                let starting_budget = 10;
                let new_budget = 200;

                envelopes.addEnvelope(envelope_name,starting_budget);
                envelopes.updateEnvelopeBudget(envelope_name,new_budget);
                

                assert.strictEqual(envelopes._envelopes[envelope_name],new_budget);

            });
            it('Updateing an envelope that does not exist throw error("Envelope doesn\'t exist")',()=>{
            
                let envelope_name = "bills";
                let new_budget = 30;

                
                let updateEnvelope = () => envelopes.updateEnvelopeBudget(envelope_name,new_budget);

                assert.throws(updateEnvelope, 'Envelope doesn\'t exist');

            });
            it('Updateing an envelope that does not exist throw error("Envelope doesn\'t exist")',()=>{
            
                let envelope_name = "bills";
                let new_budget = 30;

                
                let updateEnvelope = () => envelopes.updateEnvelopeBudget(envelope_name,new_budget);

                assert.throws(updateEnvelope, 'Envelope doesn\'t exist');

            }); 
            it('Throws an error("Can not be a negative number") if the new budget is a negative' , () => { 

                
                let envelope_name = "Bills";
                let new_envelope_budget = -1;
                
                let updateEnvelop = ()=> envelopes.updateEnvelopeBudget(envelope_name,new_envelope_budget);

                envelopes.addEnvelope(envelope_name);
                
                assert.throws(updateEnvelop, 'Can not be a negative number');
                
    
            });
        });
        describe('.addToEnvelopeBudget',()=>{

            let envelope_name,envelope_budget;

            beforeEach(()=>{
                envelope_name = "Bills";
                envelope_budget = 200;

                envelopes.addEnvelope(envelope_name,envelope_budget);
            })
            it('Add the given amount to the given envelope name budget',()=>{
                let amount_to_add = 50;
                let excpected_budget = envelope_budget+amount_to_add;

                envelopes.addToEnvelopeBudget(envelope_name,amount_to_add);

                assert.strictEqual(envelopes._envelopes[envelope_name],excpected_budget);
            });
            it('Throws an error("Can not be a negative number") when given a negative amount',()=>{
                let amount_to_add = -50;
                let expected_error = 'Can not be a negative number'
                

                let addNegativeAmount = ()=> envelopes.addToEnvelopeBudget(envelope_name,amount_to_add);

                assert.throws(addNegativeAmount,expected_error)
                assert.strictEqual(envelopes._envelopes[envelope_name],envelope_budget);
            });
            it('Throws an error("Envelope doesn\'t exist") when given an envelope name that doesn\'t exist',()=>
            {
                let inexistent_envelope_name = 'School';
                let excpected_error = 'Envelope doesn\'t exist';

                let addToAnInexistentEnvelope = () => envelopes.addToEnvelopeBudget(inexistent_envelope_name,20); 


                assert.throws(addToAnInexistentEnvelope,excpected_error);
            });
        });
        describe('.deductFromEnvelopeBudget',()=>{
            let envelope_name,envelope_budget;

            beforeEach(()=>{
                envelope_name = "Bills";
                envelope_budget = 200;

                envelopes.addEnvelope(envelope_name,envelope_budget);
            })
            it('Deducts the given amount to the given envelope name budget',()=>{
                let amount_to_deduct = 50;
                let excpected_budget = envelope_budget-amount_to_deduct;

                envelopes.deductFromEnvelopeBudget(envelope_name,amount_to_deduct);

                assert.strictEqual(envelopes._envelopes[envelope_name],excpected_budget);
            });
            it('Throws an error("Insufficient envelope fund") if the amount given exceeds the envelope budget',()=>
            {
                let amount_to_deduct = envelope_budget+1;
                let excpected_error = 'Insufficient envelope fund';

                let deductMoreThanPossible = () => envelopes.deductFromEnvelopeBudget(envelope_name,amount_to_deduct); 


                assert.throws(deductMoreThanPossible,excpected_error);
            });
            it('Throws an error("Can not be a negative number") when given a negative amount',()=>{
                let amount_to_deduct = -50;
                let expected_error = 'Can not be a negative number'
                

                let deductNegativeAmount = ()=> envelopes.deductFromEnvelopeBudget(envelope_name,amount_to_deduct);

                assert.throws(deductNegativeAmount,expected_error)
                assert.strictEqual(envelopes._envelopes[envelope_name],envelope_budget);
            });
            it('Throws an error("Envelope doesn\'t exist") when given an envelope name that doesn\'t exist',()=>
            {
                let inexistent_envelope_name = 'School';
                let excpected_error = 'Envelope doesn\'t exist';

                let addToAnInexistentEnvelope = () => envelopes.deductFromEnvelopeBudget(inexistent_envelope_name,20); 


                assert.throws(addToAnInexistentEnvelope,excpected_error);
            });
            

        });
        describe('.transferBudget',()=>{
            let health_envelope,bills_envelope,health_budget,bills_budget;

            beforeEach(()=>{
                health_envelope = 'Health';
                health_budget = 400;

                bills_envelope = 'Bills';
                bills_budget = 600;

                envelopes.addEnvelope(health_envelope,health_budget);
                envelopes.addEnvelope(bills_envelope,bills_budget);
            });

            it('Transfer\'s a given amount between two given envelopes', ()=>{

                let amount_to_transfer = 200;
                let expected_health_budget = health_budget - amount_to_transfer;
                let expected_bills_budget = bills_budget + amount_to_transfer;

                envelopes.transferBudget(health_envelope,bills_envelope,amount_to_transfer);

                assert.strictEqual(envelopes._envelopes[health_envelope],expected_health_budget);
                assert.strictEqual(envelopes._envelopes[bills_envelope],expected_bills_budget);


            });

            it('Transfer\'s all the budget from sender envelope when an amount is not given', ()=>{

                let expected_health_budget = 0;
                let expected_bills_budget = bills_budget + health_budget;

                envelopes.transferBudget(health_envelope,bills_envelope);

                assert.strictEqual(envelopes._envelopes[health_envelope],expected_health_budget);
                assert.strictEqual(envelopes._envelopes[bills_envelope],expected_bills_budget);


            });

            it('Throws an error("Insufficient sender envelope fund") if there isn\'t enough in the sender budget', ()=>{

                let amount_to_transfer = 1000;
                let excpected_error = 'Insufficient sender envelope fund';
                

                let tranferMoreThanPossible = () => envelopes.transferBudget(health_envelope,bills_envelope,amount_to_transfer);

                
                assert.throws(tranferMoreThanPossible,excpected_error);

            });

            it('Throws an error("Can not be a negative number") if the amount given is negative', ()=>{

                let amount_to_transfer = -1;
                let excpected_error = 'Can not be a negative number';
                

                let tranferNegativeAmount = () => envelopes.transferBudget(health_envelope,bills_envelope,amount_to_transfer);

                
                assert.throws(tranferNegativeAmount,excpected_error);

            });
            it('Throws an error("Envelope doesn\'t exist") if sender doesn\'t exist', ()=>{

                let inexistent_sender = "Food";
                let excpected_error = 'Envelope doesn\'t exist';
                

                let tranferToInexistentEnvelope = () => envelopes.transferBudget(inexistent_sender,bills_envelope);

                
                assert.throws(tranferToInexistentEnvelope,excpected_error);

            });
            it('Throws an error("Envelope doesn\'t exist") if reciver doesn\'t exist', ()=>{

                let inexistent_reciver = "Food";
                let excpected_error = 'Envelope doesn\'t exist';
                

                let tranferFromInexistentEnvelope = () => envelopes.transferBudget(health_envelope,inexistent_reciver);

                
                assert.throws(tranferFromInexistentEnvelope,excpected_error);

            });



            
        });
        describe('.clear',()=>{
            it('Clears envelopes and sets total budget to 0', ()=> {
                envelopes.addEnvelope("a",1);
                envelopes.addEnvelope("b",2);
                envelopes.addEnvelope("c",3);
                envelopes.addEnvelope("d",4);
                envelopes.addEnvelope("e",5);
                envelopes.addEnvelope("f",6);
                envelopes.addEnvelope("g",7);

                envelopes.clear();

                assert.isEmpty(envelopes._envelopes);
                assert.strictEqual(envelopes._total_Budget, 0);
                
            })
        })
    });

    describe('Attribuite getters',() =>{
        let envelopes_data;
        beforeEach(() => {
            envelopes_data = [
                    {name : "a" , budget : 100},
                    {name : "b" , budget : 222},
                    {name : "c" , budget : 994},
                    {name : "d" , budget : 322},
                ]
               
            envelopes_data.forEach((envelope) => {
                    envelopes.addEnvelope(envelope.name,envelope.budget);
                });
        });

        describe('.totaBudget',() => {

            it('Return sum of all envelopes budgets',() => {
                        
                let excpected_total_budget = envelopes_data.reduce((total,envelope) => total + envelope.budget,0);

                let returned  = envelopes.totalBudget;

                assert.strictEqual(returned,excpected_total_budget);


            });
        });
        describe('.envelopes',() => {

            it('Return\'s all envelopes as key/value pairs name/budget',() => {
                        

                let returned  = envelopes.envelopes;

                envelopes_data.forEach((envelope) => assert.strictEqual(returned[envelope.name],envelope.budget));


            });
        });
    
    });

    describe('Accessors',() =>{
        let envelopes_data;
        beforeEach(() => {
            envelopes_data = [
                    {name : "a" , budget : 100},
                    {name : "b" , budget : 222},
                    {name : "c" , budget : 994},
                    {name : "d" , budget : 322},
                ]
               
            envelopes_data.forEach((envelope) => {
                    envelopes.addEnvelope(envelope.name,envelope.budget);
                });
        });
        describe('.getEnvelopesJSON', ()=>{
            it('Returns all envelopes as JSON where {total_budget} equal\'s sum of all envelopes and {envelopes} equal\'s all envelopes as key/value pairs name/budge',() => {
                
                let returned  = envelopes.getEnvelopesJSON();

                let excpected_total_budget = envelopes_data.reduce((total,envelope) => total + envelope.budget,0);

                

                assert.strictEqual(returned.total_budget,excpected_total_budget);
                envelopes_data.forEach((envelope) => {
                    assert.strictEqual( returned.envelopes[envelope.name] , envelope.budget )
                });
            
            });
        });
        describe('.getEnvelopesJSON', ()=>{
            it('Returns all envelopes as JSON where {envelope_name} envelope name and {envelope_budget} equal envelope budget given an envelope name ',() => {
                
                let envelope = envelopes_data[0];

                let returned  = envelopes.getEnvelopeJSON(envelope.name);
                
                assert.strictEqual(returned.envelope_name,envelope.name);
                assert.strictEqual(returned.envelope_budget , envelope.budget);
               
              
            
            });
            it('Returns all envelopes as JSON where {envelope_name} envelope name and {envelope_budget} equal envelope budget given an envelope name ',() => {
                
                let envelope = envelopes_data[1];

                let returned  = envelopes.getEnvelopeJSON(envelope.name);
                
                assert.strictEqual(returned.envelope_name,envelope.name);
                assert.strictEqual(returned.envelope_budget , envelope.budget);
               
              
            
            });
            it('Throws an error(Envelope doesn\'t exist) if the envelope name doesn\'t exist ',() => {
                
                let inexistentName = "aadsa";
                let excpected_error = 'Envelope doesn\'t exist';

                let getAnEnvelopeThatDoesNotExist  = ()=> envelopes.getEnvelopeJSON(inexistentName);
                
                
                assert.throws(getAnEnvelopeThatDoesNotExist,excpected_error);
                
            
            });
        });
        describe('.getEnvelopeBudget',() => {
            it('Returns the budget of a given envelope name', () => {
                let envelope = envelopes_data[1];

                let returned_budget  = envelopes.getEnvelopeBudget(envelope.name);

                assert.strictEqual(returned_budget,envelope.budget);

            });
            it('Returns the budget of another given envelope name', () => {
                let envelope = envelopes_data[2];

                let returned_budget  = envelopes.getEnvelopeBudget(envelope.name);

                assert.strictEqual(returned_budget,envelope.budget);

            })
            it('Throws an error(Envelope doesn\'t exist) if the given envelope name doesn\'t exist', () => {
                let inexistentName = "aadsa";
                let excpected_error = 'Envelope doesn\'t exist';

                let getAnEnvelopeThatDoesNotExist  = ()=> envelopes.getEnvelopeBudget(inexistentName);
                
                assert.throws(getAnEnvelopeThatDoesNotExist,excpected_error);

            })
        })

    });




});