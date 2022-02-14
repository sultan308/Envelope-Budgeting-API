const request = require('supertest');
const {assert} = require('chai');

const api = require("../app");


const response_text = {
    added : 'Envelope added',
    updated : 'Envelope updated successfully',
    deleted : 'Envelope deleted successfully',
    wrong_body : 'Request JSON needs to have name(string) and budget (number)',
    already_exist : 'Envelope already exist',
    does_not_exist : 'Envelope doesn\'t exist',
    negative_number : 'Can not be a negative number'

}

describe('/', () => {
    describe('envelopes/', ()=> {
        afterEach(()=>{
            api.locals.envelopes.clear();
           

        })
        describe('POST', async () =>{
            it('Create a new Envelope {name} and {budget} as JSON in the body and responds with status 201 and "Envelope added"' , async () => {
                const envelope = {name : "Food", budget : 200};

                const excpected_status = 201;
                const excpected_text = response_text.added;

                const response = await request(api).post('/envelopes').send(envelope);

                assert.strictEqual(response.status,excpected_status);
                assert.strictEqual(response.text,excpected_text);
                assert.strictEqual(api.locals.envelopes.envelopes[envelope.name],envelope.budget)
            });
            it('Responds with status 400 and message "Request JSON needs to have name(string) and budget (number)" if empty body was given' , async () => {
                const envelope = {};

                const excpected_status = 400;
                const excpected_text = response_text.wrong_body;

                const response = await request(api).post('/envelopes').send(envelope);

                assert.strictEqual(response.status,excpected_status);
                assert.strictEqual(response.text,excpected_text);
                
            });
            it('Responds with status 400 and message "Request JSON needs to have name(string) and budget (number)" if only {name}' , async () => {
                const envelope = {name:"Food"};

                const excpected_status = 400;
                const excpected_text = response_text.wrong_body;

                const response = await request(api).post('/envelopes').send(envelope);

                assert.strictEqual(response.status,excpected_status);
                assert.strictEqual(response.text,excpected_text);
                
            });
            it('Responds with status 400 and message "Request JSON needs to have name(string) and budget (number)" if only {budget}' , async () => {
                const envelope = {budget:878};

                const excpected_status = 400;
                const excpected_text = response_text.wrong_body;

                const response = await request(api).post('/envelopes').send(envelope);

                assert.strictEqual(response.status,excpected_status);
                assert.strictEqual(response.text,excpected_text);
                
            });
            it('Responds with status 400 and message "Request JSON needs to have name(string) and budget (number)" if given budget as string`' , async () => {
                const envelope = {name : "tree", budget : 'one'};

                const excpected_status = 400;
                const excpected_text = response_text.wrong_body;

                const response = await request(api).post('/envelopes').send(envelope);

                assert.strictEqual(response.status,excpected_status);
                assert.strictEqual(response.text,excpected_text);
                
            });
            it('Responds with status 400 and message "Envelope already exist" when given an envelope name that is already there' , async () => {
                const envelope = {name : "a", budget : 1};

                const excpected_status = 400;
                const excpected_text = response_text.already_exist;

                api.locals.envelopes.addEnvelope(envelope.name,envelope.budget);
                const response = await request(api).post('/envelopes').send(envelope);

                assert.strictEqual(response.status,excpected_status);
                assert.strictEqual(response.text,excpected_text );
                
            });
            it(`Responds with status 400 and message "${response_text.negative_number}" when given an envelope name that is already there` , async () => {
                const envelope = {name : "a", budget : -1};

                const excpected_status = 400;
                const excpected_text = response_text.negative_number;

                
                const response = await request(api).post('/envelopes').send(envelope);

                assert.strictEqual(response.status,excpected_status);
                assert.strictEqual(response.text,excpected_text );
                
            });
            

            
            //it()
        });
        describe('PUT',async () => {
            it('Retuens status 200 , body Envelope updated successfully and updates the budget to a given {budget} of a given envelope name {name} in the body as JSON ', async () => {
                const envelope = {name : "a", budget : 1};
                const new_budget  =  20;

                const excpected_status = 200;
                const excpected_text = response_text.updated;

                api.locals.envelopes.addEnvelope(envelope.name,envelope.budget);
                envelope.budget = new_budget;

                const response = await request(api).put('/envelopes').send(envelope);

               assert.strictEqual(response.status,excpected_status);
               assert.strictEqual(response.text, excpected_text)
               assert.strictEqual(api.locals.envelopes.getEnvelopeBudget(envelope.name), envelope.budget);
            });
            it(`Retuens status 400 , body "${response_text.negative_number} if given a negative value for budget"`, async () => {
                const envelope = {name : "a", budget : 1};
                const new_budget  =  -20;

                const excpected_status = 400;
                const excpected_text = response_text.negative_number;

                api.locals.envelopes.addEnvelope(envelope.name,envelope.budget);
                envelope.budget = new_budget;

                const response = await request(api).put('/envelopes').send(envelope);

               assert.strictEqual(response.status, excpected_status);
               assert.strictEqual(response.text, excpected_text);
            });
            it(`Retuens status 404 , body "${response_text.does_not_exist} if the envelope name doesn't exist`, async () => {
                const envelope = {name : "a", budget : 1};
                

                const excpected_status = 404;
                const excpected_text = response_text.does_not_exist;

                

                const response = await request(api).put('/envelopes').send(envelope);

               assert.strictEqual(response.status, excpected_status);
               assert.strictEqual(response.text, excpected_text);
            });
            it(`Retuens status 400 , body "${response_text.wrong_body} if only {name} is given in the JSON`, async () => {
                const envelope = {name : "a"};
                

                const excpected_status = 400;
                const excpected_text = response_text.wrong_body;

                

                const response = await request(api).put('/envelopes').send(envelope);

               assert.strictEqual(response.status, excpected_status);
               assert.strictEqual(response.text, excpected_text);
            });
            it(`Retuens status 400 , body "${response_text.wrong_body} if only {budget} is given in the JSON`, async () => {
                const envelope = {budget : 12};
                

                const excpected_status = 400;
                const excpected_text = response_text.wrong_body;

                

                const response = await request(api).put('/envelopes').send(envelope);

               assert.strictEqual(response.status, excpected_status);
               assert.strictEqual(response.text, excpected_text);
            });
            it(`Retuens status 400 , body "${response_text.wrong_body} if given an empty JSON`, async () => {
                const envelope = {};
                

                const excpected_status = 400;
                const excpected_text = response_text.wrong_body;

                

                const response = await request(api).put('/envelopes').send(envelope);

               assert.strictEqual(response.status, excpected_status);
               assert.strictEqual(response.text, excpected_text);
            });
            it(`Retuens status 400 , body "${response_text.wrong_body} if given buget as a string`, async () => {
                const envelope = {name : "bills", budget : "two"};
                

                const excpected_status = 400;
                const excpected_text = response_text.wrong_body;

                

                const response = await request(api).put('/envelopes').send(envelope);

               assert.strictEqual(response.status, excpected_status);
               assert.strictEqual(response.text, excpected_text);
            });
    
        
        });
        describe('DELETE' , async () => {
            let envelope_name = 'a';
            let envelope_budget = 1;
            beforeEach(()=>{
                
                api.locals.envelopes.addEnvelope(envelope_name,envelope_budget);
            });

            it(`Deletes an envelope and return ${response_text.deleted} with status 200 when given it's name`,async ()=> {

                const end_point = '/envelopes/'+envelope_name;     
                const excpected_status = 200;
                const excpected_text = response_text.deleted;

                const response  = await request(api).delete(end_point).send();

                assert.strictEqual(response.status, excpected_status);
                assert.strictEqual(response.text, excpected_text);
                assert.isUndefined(api.locals.envelopes[envelope_name]);

            });
            it(`Responds with ${response_text.does_not_exist} with status 404 when given an envelope name that doesn't exist`,async ()=> {

                const end_point = '/envelopes/fdf';     
                const excpected_status = 404;
                const excpected_text = response_text.does_not_exist;

                const response  = await request(api).delete(end_point).send();

                assert.strictEqual(response.status, excpected_status);
                assert.strictEqual(response.text, excpected_text);
            

            });
            it(`Updates the total budget accordingly after deleting the envelope`, async ()=> {

                const end_point = '/envelopes/'+envelope_name;     
                const excpected_total = 0;

                const response  = await request(api).delete(end_point).send();

                
                assert.isUndefined(api.locals.total_budget,excpected_total);

            });

        });
        describe('GET' , async () => {
            
            let envelopes_data = [
                    {name : "a" , budget : 100},
                    {name : "b" , budget : 222},
                    {name : "c" , budget : 994},
                    {name : "d" , budget : 322},
                ];

            beforeEach(()=>{
                

                envelopes_data.forEach((envelope) => {
                    api.locals.envelopes.addEnvelope(envelope.name,envelope.budget);
                });
                
            });

            it(`Responds with JSON object with attributes (total_budget and  envelopes) and status 200`,async ()=> {

                const end_point = '/envelopes';   

                const excpected_status = 200;
                const expected_total = envelopes_data.reduce((total,envelope) => total+envelope.budget,0);
                const excpected_envelopes  = {};
                
                envelopes_data.forEach((envelope) => excpected_envelopes[envelope.name] = envelope.budget);
                
                const response  = await request(api).get(end_point).send();

                const responseJSON = JSON.parse(response.text);

                assert.strictEqual(response.status, excpected_status);
                assert.strictEqual(responseJSON.total_budget, expected_total);
                envelopes_data.forEach((envelope) => {
                    assert.strictEqual(responseJSON.envelopes[envelope.name],envelope.budget)
                })
               

            });
           
            

        })
    });
});

