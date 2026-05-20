const db = require("../db/queries");

async function listGenres(req, res, next) {
  try {
    const genres = await db.getAllGenres();
    res.render("genres/index", { genres });
  } catch (err) {
    next(err);
  }
}

async function showGenre(req, res, next) {
  try {
    const genre = await db.getGenreById(req.params.id);
    const games = await db.getGamesByGenre(req.params.id);
    res.render("genres/show", { genre, games });
  } catch (err) {
    next(err);
  }
}

async function newGenreForm(req, res) {
  res.render("genres/new");
}

async function createGenre(req, res, next) {
  try {
    const { name, description } = req.body;
    await db.createGenre(name, description);
    res.redirect("/genres");
  } catch (err) {
    next(err);
  }
}

async function editGenreForm(req, res, next) {
  try {
    const genre = await db.getGenreById(req.params.id);
    res.render("genres/edit", { genre });
  } catch (err) {
    next(err);
  }
}

async function updateGenre(req, res, next) {
  try {
    const { name, description } = req.body;
    await db.updateGenre(req.params.id, name, description);
    res.redirect("/genres");
  } catch (err) {
    next(err);
  }
}

async function deleteGenre(req, res, next) {
  try {
    await db.deleteGenre(req.params.id);
    res.redirect("/genres");
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listGenres,
  showGenre,
  newGenreForm,
  createGenre,
  editGenreForm,
  updateGenre,
  deleteGenre,
};