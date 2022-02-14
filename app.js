const Envelopes = require('./envelope');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const envelopeRoute = require('./routes/envelopesRoute');
const transferRoute = require('./routes/transferRoute');

app.locals.envelopes = new Envelopes();

app.use(bodyParser.json());
app.use('/envelopes',envelopeRoute);
app.use('/transfer',transferRoute)

const PORT = process.env.PORT || 4001;
app.listen(PORT,()=>console.log(`Listening on port ${PORT}`));

module.exports = app;