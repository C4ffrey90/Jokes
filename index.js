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

app.post("/get-joke", async (req, res) => {
	const { search, category, "safe-mode": safe } = req.body;
	let query = search ? `?contains=${search.toLowerCase()}` : "";
	// Only add this paremeter to the query if it was marked by the user
	if (safe) {
		query += `?safe-mode`;
	}
	try {
		let joke = await axios.get(`https://v2.jokeapi.dev/joke/${category}${query}`);
		// checking if it's a twopart joke or a single one
		if (joke.data.type === "twopart") {
			res.render("index.ejs", { setup: joke.data.setup, delivery: joke.data.delivery });
		} else {
			res.render("index.ejs", { joke: joke.data.joke });
		}
	} catch (err) {
		console.log(err.response.status);
		res.render("index.ejs", { error: `This joke could not be found. Please try another.` });
	}
});
app.listen(port, () => {
	console.log(`Listening to server on port ${port}`);
});
