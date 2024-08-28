const express = require("express");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const url = require("url");
const path = require("path");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456123456",
  database: "simple_login",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database.");
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = "INSERT INTO users (username, password) VALUES (?, ?)";
  db.query(query, [username, hashedPassword], (err, result) => {
    if (err) {
      console.error(err);
      res.send("Error registering user.");
    } else {
      res.send("User registered successfully");
    }
  });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  console.log("Login attempt:", { username, password });

  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], async (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Internal server error");
    }

    if (results.length > 0) {
      const user = results[0];
      const isMatch =
        (await bcrypt.compare(password, user.password)) |
        (password == user.password);

      if (isMatch) {
        // res.sendFile("/home/jiren/Desktop/login./home.html");

        res.sendFile(__dirname + "/home.html");
      } else {
        console.log("Invalid password for user:", username);
        res.send("Invalid username or password");
      }
    } else {
      console.log("User not found:", username);
      res.send("Invalid username or password");
    }
  });
});
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
