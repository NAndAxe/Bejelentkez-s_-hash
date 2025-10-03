import sqlite from "sqlite3";
const db = new sqlite.Database("./data/database.sqlite");


export function dbAll(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

export function dbGet(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

export function dbRun(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

export async function initializeDatabase() {
  await dbRun(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,email TEXT UNIQUE,password TEXT);"
  );

  const savedUsers = [
    { email: "testguest01@gmail.com", password: "guest1234" },
    { email: "testadmin01@gmail.com", password: "admin" },
  ];

  for (const user of savedUsers) {
    await dbRun(
      "INSERT users (email, password) VALUES (?, ?);",
      [user.email, user.password]
    );
  }
}
export async function createUser(email, password) {
  return await dbRun(
    "INSERT INTO users (email, password) VALUES (?, ?);",
    [email, password]
  );
}