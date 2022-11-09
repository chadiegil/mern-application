require("dotenv").config();

const express = require("express");
const workoutsRoutes = require("./routes/workouts");
const mongoose = require("mongoose");
const { send } = require("vite");

const app = express();

const PORT = process.env.PORT;

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutsRoutes);

// connect to db
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(
        `connected to db and listening to port http://localhost:${PORT}`
      )
    );
  })
  .catch((err) => console.log(err));
