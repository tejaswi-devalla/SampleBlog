const express = require("express");
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("blog.db");

const app = express();
const port = process.env.PORT || 5000;

app.use((request, response, next) => {
  console.log(
    `Timestamp: ${new Date().toLocaleString()} -- URL: ${request.url}`
  );
  next();
});

app.get("/posts", (request, response) => {
  const post_data = "SELECT * FROM Post";
  db.all(post_data, (err, posts) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    response.json(posts);
  });
});

app.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});
