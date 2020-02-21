//Set up Express app
const express = require('express');
const app = express();
app.use(express.static(__dirname + '/'));

//Server listens on native port, or on 3000 if in a local environment
var port = process.env.PORT || 3000;
var server = app.listen(port, () => {
    console.log('Magellan server listening on port', port);
});
