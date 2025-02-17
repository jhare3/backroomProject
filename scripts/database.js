const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./backroomData.db', (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

module.exports = db;

// Create the table if it doesn't exist
db.serialize(() => {
  db.run(`
      CREATE TABLE IF NOT EXISTS performance_data (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          submit_date TEXT NOT NULL,
          cph INTEGER,
          zph INTEGER,
          zfph INTEGER,
          cph_goal INTEGER,
          zph_goal INTEGER,
          zfph_goal INTEGER,
          processing_hours REAL,
          pallets_processed INTEGER,
          cartons_processed INTEGER
          remaining_pallets INTEGER
  
      )
  `, (err) => {
      if (err) {
          console.error('Error creating table:', err.message);
      } else {
          console.log('Table created or already exists.');
      }
  });
});

// Function to insert data into the table
function insertData(submitDate, cph, zph, zfph, cphGoal, zphGoal, zfphGoal, processingHours, palletsProcessed, cartonsProcessed, remainingPallets) {
  const sql = `
      INSERT INTO performance_data (submit_date, cph, zph, zfph, cph_goal, zph_goal, zfph_goal, processing_hours, pallets_processed, remaining_pallets)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.run(sql, [submitDate, cph, zph, zfph, cphGoal, zphGoal, zfphGoal, processingHours, palletsProcessed, cartonsProcessed, remainingPallets], function(err) {
      if (err) {
          console.error('Error inserting data:', err.message);
      } else {
          console.log(`Data inserted with row ID ${this.lastID}`);
      }
  });
}

