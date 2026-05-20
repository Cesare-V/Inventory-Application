const express = require("express");
const router = express.Router();
const genresController = require("../controllers/genresController");

router.get("/", genresController.listGenres);
router.get("/new", genresController.newGenreForm);
router.post("/", genresController.createGenre);
router.get("/:id", genresController.showGenre);
router.get("/:id/edit", genresController.editGenreForm);
router.post("/:id/update", genresController.updateGenre);
router.post("/:id/delete", genresController.deleteGenre);

module.exports = router;
