const express = require("express");
const path = require("path");

const genresRouter = require("./routes/genresRouter");
const gamesRouter = require("./routes/gamesRouter");

const app = express();

// ---------- MIDDLEWARE ----------
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

// ---------- MOTORE VIEW ----------
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));

// ---------- ROUTES ----------
app.get("/", (req, res) => res.redirect("/genres"));
app.use("/genres", genresRouter);
app.use("/games", gamesRouter);

// ---------- ERROR HANDLER ----------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Qualcosa è andato storto: " + err.message);
});

// ---------- START SERVER ----------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server avviato su http://localhost:${PORT}`));