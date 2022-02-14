# **Envelope Budgeting API**
 

## Introduction 
This is an API that helps the user with budgeting useing the [envolpe budgeting method](https://www.thebalance.com/what-is-envelope-budgeting-1293682). This project is a part of Codecademy back end carrer path.
## Features
* Viewing envolpes
* Adding envelopes
* Amending envelopes
* Removeing envolopes
## Installation
```bash
$ git clone https://github.com/sultan308/Envelope-Budgeting-API working-directory-name
$ cd working-directory-name
$ npm install
``` 
## Usage
### ```GET``` Requests:
#### ```{host}/envelopes/```
If successful will return status ```200``` and JSON with attributes :
* ```total_budget``` the sum of all envelopes budgets.
* ```envelopes``` an object where keys are the envlopes' names and the values are the budgets.
  
Example JSON
```json
{ 
    "total_budget" : 200,

    "envelopes" : {
        "bills" : 50,
        "grocceris" : 100,
        "health" : 50
    }
}
```
#### ```{host}/envelopes/:envelope_name```
Where ```:envelope_name``` is the name of the requested envelope
  
If successful will return status ```200``` and JSON with attributes :
* ```envelope_name``` the requested envelope name.
* ```envelope_budget``` the requested envelope budget.
  
Example JSON
```json
{ 
    "envelope_name" : "bills",
    "envelope_budget" : 50
}
```
If the envelope wasn't found will return status ```404``` and with text ```Envelope doesn't exist```
### ```POST``` Requests:
#### ```{host}/envelopes/```

A JSON needs to be in the body of the request and contain the following attributes :
* ```name``` where the value is the envelope's name
* ```budget``` where the value is the envelope's budget, can't be negative and it has to be of type number

Example JSON 
```json
{ 
    "name" : "bills",
    "budget" : 50
}
```
Responses :
* Status : ```201```  and text ```"Envelope added"```, if the envelope was added succesfuly.
* Status : ```400```  and text ```"Envelope already exist"```, if the envelope already exists.
* Status : ```400```  and text ```"Can not be a negative number"```, if budget is a negative number.
* Status : ```400``` and text ```"Request JSON needs to have name(string) and budget (number)"```, if the one of the attributes was missing or a wrong value type was provided.  
  
### ```PUT``` Requests:
#### ```{host}/envelopes/```

A JSON needs to be in the body of the request and contain the following attributes :
* ```name``` where the value is the envelope's name
* ```budget``` where the value is the new envelope's budget, can't be negative and it has to be of type number

 
Example JSON
```json
{ 
    "name" : "bills",
    "budget" : 100
}
```
Responses :
* Status : ```200```  and text ```"Envelope updated successfully"```, if the envelope was updated succesfuly.
* Status : ```404```  and text ```"Envelope doesn't exist"```, if the envelope doesn't exist.
* Status : ```400```  and text ```"Can not be a negative number"```, if budget is a negative number.
* Status : ```400``` and text ```"Request JSON needs to have name(string) and budget (number)"```, if the one of the attributes was missing or a wrong value type was provided.  
  
#### ```{host}/transfer/```
A JSON needs to be in the body of the request and contain the following attributes :
* ```sender_envelope``` where the value is the sender envelope name.
* ```reciver_envelope``` where the value is the reciveing envelope name.
* ```amount``` **(optional : defaults to maximum)** where the value is tha amount to transfer, can't be negative and it has to be of type number.
  
Example JSON
Sends all the bills budget to health
```json
{ 
    "sender_envelope" : "bills",
    "reciver_envelope" : "health"
}
```

-or-
Sends 100 of the bills budget to health
```json
{ 
    "sender_envelope" : "bills",
    "reciver_envelope" : "health",
    "amount" : 100
}
```
Responses :
* Status : ```200```  and text ```"Transfer completed"```, if the tranfer has been made.
* Status : ```404```  and text ```"Envelope doesn't exist"```, if one or both of the envelopes deosn't exist.
* Status : ```400```  and text ```"Can not be a negative number"```, if the amount is neagtive.
* Status : ```400``` and text ```""Insufficient sender envelope fund""```, the amount exceeds the sender budget.
* Status : ```400``` and text ```""Provided amount is not a number""```, the amount was not of type number.
* Status : ```400``` and text ```"Request JSON needs to have sender_envelope  and reciver_envelope"```, if ```sender_envelope``` and/or ```sender_envelope```attributes was missing. 
### ```DELETE``` Requests:

#### ```{host}/envelopes/:envelope_name```
Where ```:envelope_name``` is the name of the envelope to be deleted.
Responses :
* Status : ```200```  and text ```"Envelope deleted successfully"```, if the envelope was deleted.
* Status : ```404```  and text ```"Envelope doesn't exist"```, if one or both of the envelopes deosn't exist.

## Contributing
This project was created to practice newly accured skills and is not intended for real usage however, if you have any recomndations for emprovements or have noticed something that could have been implemented better please don't hesitate to open a new issue I would really appricate it as will help me in my learning journey. 
