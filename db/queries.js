const pool = require("./pool");

// ---------- GENERI ----------
async function getAllGenres() {
    const { rows } = await pool.query("SELECT * FROM genres ORDER BY name");
    return rows;
}

async function getGenreById(id) {
    const { rows } = await pool.query(
        "SELECT * FROM genres WHERE id = $1",
        [id]
    );
    return rows[0];
}

// ---------- CREA, AGGIORNA E CANCELLA GENERE ----------
async function createGenre(name, description) {
    const { rows } = await pool.query(
        "INSERT INTO genres (name, description) VALUES ($1, $2) RETURNING *",
        [name, description]
    );
    return rows[0];
}

async function updateGenre(id, name, description) {
  const { rows } = await pool.query(
    "UPDATE genres SET name = $1, description = $2 WHERE id = $3 RETURNING *",
    [name, description, id]
  );
  return rows[0];
}

async function deleteGenre(id) {
  await pool.query("DELETE FROM genres WHERE id = $1", [id]);
}


// ---------- GIOCHI ----------
async function getAllGames() {
    const { rows } = await pool.query(`
    SELECT games.*, genres.name AS genre_name
    FROM games
    JOIN genres ON games.genre_id = genres.id
    ORDER BY games.title
  `);
  return rows;
}

async function getGameById(id) {
  const { rows } = await pool.query(`
    SELECT games.*, genres.name AS genre_name
    FROM games
    JOIN genres ON games.genre_id = genres.id
    WHERE games.id = $1
  `, [id]);
  return rows[0];
}

async function getGamesByGenre(genreId) {
  const { rows } = await pool.query(
    "SELECT * FROM games WHERE genre_id = $1 ORDER BY title",
    [genreId]
  );
  return rows;
}

async function createGame(title, description, price, stock, genreId, imageUrl) {
  const { rows } = await pool.query(
    `INSERT INTO games (title, description, price, stock, genre_id, image_url)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [title, description, price, stock, genreId, imageUrl]
  );
  return rows[0];
}

async function updateGame(id, title, description, price, stock, genreId, imageUrl) {
  const { rows } = await pool.query(
    `UPDATE games
     SET title = $1, description = $2, price = $3, stock = $4,
         genre_id = $5, image_url = $6
     WHERE id = $7 RETURNING *`,
    [title, description, price, stock, genreId, imageUrl, id]
  );
  return rows[0];
}

async function deleteGame(id) {
  await pool.query("DELETE FROM games WHERE id = $1", [id]);
}

module.exports = {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
  getAllGames,
  getGameById,
  getGamesByGenre,
  createGame,
  updateGame,
  deleteGame,
};