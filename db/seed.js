const pool = require("./pool");

async function seed() {
  console.log("Seeding database...");

  await pool.query(`
    INSERT INTO genres (name, description) VALUES
      ('Action', 'Giochi ad alto ritmo con combattimenti e sfide rapide'),
      ('RPG', 'Giochi di ruolo con storie profonde e progressione del personaggio'),
      ('Sport', 'Simulazioni sportive realistiche'),
      ('Horror', 'Giochi spaventosi e atmosfere tese'),
      ('Puzzle', 'Giochi che mettono alla prova la logica e il ragionamento')
    ON CONFLICT (name) DO NOTHING
  `);

  const { rows: genres } = await pool.query("SELECT * FROM genres");
  const byName = Object.fromEntries(genres.map(g => [g.name, g.id]));

  await pool.query(`
    INSERT INTO games (title, description, price, stock, genre_id, image_url) VALUES
      ('The Legend of Zelda: Breath of the Wild', 'Un open world epico', 59.99, 12, $1, 'https://upload.wikimedia.org/wikipedia/en/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg'),
      ('Dark Souls III', 'Un action RPG brutalmente difficile', 29.99, 8, $2, 'https://upload.wikimedia.org/wikipedia/en/3/37/Dark_Souls_III_cover_art.jpg'),
      ('FIFA 24', 'Il simulatore di calcio più famoso al mondo', 49.99, 20, $3, NULL),
      ('Resident Evil 4 Remake', 'Il classico horror reimmaginato', 39.99, 15, $4, NULL),
      ('Portal 2', 'Puzzle geniale con portali dimensionali', 9.99, 30, $5, NULL)
    ON CONFLICT DO NOTHING
  `, [byName['RPG'], byName['Action'], byName['Sport'], byName['Horror'], byName['Puzzle']]);

  console.log("Seed completato!");
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});