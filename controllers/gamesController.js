const db = require("../db/queries");

async function listGames(req, res, next) {
  try {
    const games = await db.getAllGames();
    res.render("games/index", { games });
  } catch (err) {
    next(err);
  }
}

async function showGame(req, res, next) {
  try {
    const game = await db.getGameById(req.params.id);
    res.render("games/show", { game });
  } catch (err) {
    next(err);
  }
}

async function newGameForm(req, res, next) {
  try {
    const genres = await db.getAllGenres();
    res.render("games/new", { genres });
  } catch (err) {
    next(err);
  }
}

async function createGame(req, res, next) {
  try {
    const { title, description, price, stock, genre_id, image_url } = req.body;
    await db.createGame(title, description, price, stock, genre_id, image_url);
    res.redirect("/games");
  } catch (err) {
    next(err);
  }
}

async function editGameForm(req, res, next) {
  try {
    const game = await db.getGameById(req.params.id);
    const genres = await db.getAllGenres();
    res.render("games/edit", { game, genres });
  } catch (err) {
    next(err);
  }
}

async function updateGame(req, res, next) {
  try {
    const { title, description, price, stock, genre_id, image_url } = req.body;
    await db.updateGame(req.params.id, title, description, price, stock, genre_id, image_url);
    res.redirect("/games");
  } catch (err) {
    next(err);
  }
}

async function deleteGame(req, res, next) {
  try {
    await db.deleteGame(req.params.id);
    res.redirect("/games");
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listGames,
  showGame,
  newGameForm,
  createGame,
  editGameForm,
  updateGame,
  deleteGame,
};