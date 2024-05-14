import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

// API link: https://sv443.net/jokeapi/v2/
// Available joke categories: Any, Misc, Programming, Dark, Pun, Spooky, Christmas
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.render("index.ejs");
});

app.post("/get-joke", (req, res) => {
	console.log(req.body);
	res.render("index.ejs");
});
app.listen(port, () => {
	console.log(`Listening to server on port ${port}`);
});
