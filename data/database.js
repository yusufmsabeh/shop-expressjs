const sqlite = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");
let db;
let openDatabase = async () => {
  try {
    db = await open({
      filename: path.join(
        path.dirname(require.main.filename),
        "data",
        "database.db"
      ),
      driver: sqlite.Database,
    });

    db.get("PRAGMA foreign_keys =ON");

    await db.migrate({
      migrationsPath: path.join(
        path.dirname(require.main.filename),
        "data",
        "migrations"
      ),
    });
  } catch (e) {
    console.error("Failed to open database", e);
  }
};

exports.openDatabase = openDatabase;
exports.db = db;
