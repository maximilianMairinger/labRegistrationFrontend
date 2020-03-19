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

app.get('/', (req, res) => {
  sendFile(res, "index.html")
});


app.post("/studentSignOut", ({ body: param }, res) => {
  console.log("studentSignOut: ")
  console.log("sessKey", param.sessKey)
  console.log("hours", param.hours)
  console.log("subject", param.subject)
  console.log("classroom", param.classroom)


  res.send({})
})

app.post("/startUnit", ({ body: param }, res) => {
  console.log("start Unit: ")
  console.log("sessKey", param.sessKey)
  console.log("hours", param.hours)
  console.log("subject", param.subject)
  console.log("classroom", param.classroom)


  res.send({})
})

app.post("/LDAPAuth", (req, res) => {
  setTimeout(() => {
    if (req.body.username === "s") {
      res.send({valid: true, data: {fullName: "Maximilian Mairinger", username: "mmairinger", employeetype: "student", registered: ["gone", "active", "active", "toBeGone"]}})
    }
    else if (req.body.username === "t") {
      res.send({valid: true, data: {fullName: "Domenik Dolezal", username: "ddolezal", employeetype: "teacher", sessKey: "sessKeyDummy"}})
    }
    else res.send({valid: false})
  }, 300)
})

app.post("/cardAuth", (req, res) => {
  if (req.body.cardId === "t") {
    res.send({entry: true, data: {employeetype: "teacher", username: "ddolezal", fullName: "Domenik Dolezal", sessKey: "sessKeyDummy"}})
  }
  else if (req.body.cardId === "s") {
    res.send({entry: true, data: {employeetype: "student", username: "mmairinger", fullName: "Maximilian Mairinger", registered: ["active", "active", "active", "active"]}})
  }
  else {
    res.send({entry: false})
  }
  
})

app.post("/destroySession", (req, res) => {
  setTimeout(() => {
    res.send({})
  }, 6000)
})



app.listen(port);
console.log("Listening on Port: " + port);
