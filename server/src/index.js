const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoute = require("../routes/userRoute");
const chatRoute = require("../routes/chatRoute");
const messageRoute = require("../routes/messageRoute");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.json({ success: "Express on Vercel" });
});

app.get("/api", (req, res) => {
  res.json({ success: "Express on API" });
});
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

const port = process.env.PORT || 2002;
const uri = process.env.ATLAS_URI;

app.listen(port, (req, res) => {
  console.log("listening on port", port);
});

app.get("/", (req, res) => {
  res.send("Welcome to the Channel");
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongoose Connected Successfully");
  })
  .catch((error) => {
    console.log("Mongoose connect error: " + error);
  });

export default app;
