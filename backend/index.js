const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors")
connectToMongo();

const app = express();
const port = 5000;
app.use(cors())
//to use req.body, this middleware has to be used
app.use(express.json());

//available routes
app.get("/", (req, res) => {
  res.send("Hello world ");
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`);
});
