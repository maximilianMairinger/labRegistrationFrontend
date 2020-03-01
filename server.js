const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = 5500;
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

function sendFile(res, p) {
  res.sendFile(path.join(__dirname + "/" + p));
}

app.use('/dist', express.static('dist'))
app.use('/res', express.static('res'))

app.get('*', (req, res) => {
  sendFile(res, "index.html")
});

app.post("/LDAPAuth", (req, res) => {
  setTimeout(() => {
    res.send('{"valid": true, "data": {"fullName": "Maximilian Mairinger", "class": "lehrer"}}')
  }, 2000)
})


app.listen(port);
console.log("Listening on Port: " + port);
