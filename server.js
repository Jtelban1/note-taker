const express = require("express");
const path = require("path");
const api = require("./api.js");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/notes", function(req, res) {
  res.sendFile(path.resolve(__dirname + "/public/notes.html"));
});
/*app.get("*", function(req, res) {
  res.sendFile(path.resolve(__dirname + "/public/index.html"));
});*/

// Append api routes

new api(app);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
