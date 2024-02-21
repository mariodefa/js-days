const mysql = require("mysql");

class DBclient {
  constructor() {
    this.connection = mysql.createConnection({
      host: "sql11.freesqldatabase.com",
      user: "sql11690294",
      password: process.env.SECRET,
      database: "sql11690294",
      port: "3306",
    });

    this.connection.connect((err) => {
      if (err) throw err;
      console.log("Connected to DB successfully");
    });
  }

  delete() {
    return new Promise((resolve, reject) => {
      this.connection.query("DELETE FROM `Dates`;", (err, result) => {
        if (err) {
          console.error("Error deleting dates:", err);
          return reject(false);
        }
        console.log("Old dates deleted successfully");
        resolve(true);
      });
    });
  }

  save(dates) {
    const sDates = JSON.stringify(dates);
    return new Promise((resolve, reject) => {
      this.connection.query(
        "INSERT INTO `Dates` (`Raw`) VALUES (?)",
        [sDates],
        (err, result) => {
          if (err) {
            console.error("Error saving date:", err);
            return reject(false);
          }
          console.log("Date saved successfully");
          resolve(true);
        }
      );
    });
  }

  getAllDates() {
    return new Promise((resolve, reject) => {
      this.connection.query("SELECT `Raw` FROM `Dates`", (err, rows) => {
        if (err) {
          console.error("Error retrieving dates:", err);
          return reject(err);
        }
        if (rows.length > 0) {
          resolve(rows[0]);
        } else {
          resolve(null);
        }
      });
    });
  }
}

module.exports = DBclient;
