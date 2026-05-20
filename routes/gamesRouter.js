const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/gamesController");

router.get("/", gamesController.listGames);
router.get("/new", gamesController.newGameForm);
router.post("/", gamesController.createGame);
router.get("/:id", gamesController.showGame);
router.get("/:id/edit", gamesController.editGameForm);
router.post("/:id/update", gamesController.updateGame);
router.post("/:id/delete", gamesController.deleteGame);

module.exports = router;