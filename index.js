console.log("Server Start Up")
const express = require("express");
const Datastore = require("nedb");
var fs = require('fs');

const app = express();
let port = 3000;

app.listen(port, () => console.log(`Listening at port ${port}`));
app.use(express.static("public"));
app.use(express.json({limit: "1mb"}));

const databaseLoginHistory = new Datastore("data/loginHistory.db");
databaseLoginHistory.loadDatabase();

app.post('/login', (request, response) => {
    fs.readFile('data/userData.json', 'utf-8', (err, data) => {
      if (err) {
        return response.status(500).send({ message: 'Error reading the file' });
      }
  
      const userData = JSON.parse(data);
      const { username, password } = request.body;
      const user = userData.find(
        (user) => user.username === username && user.password === password
      );
  
      if (!user) {
        response.json({ message: false});
        databaseLoginHistory.insert({message: false, username: user.username});
      } else {
        response.json({ message: true, user });
        databaseLoginHistory.insert({message: true, username: user.username})
      }
    });
});