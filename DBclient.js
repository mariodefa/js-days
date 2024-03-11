const mysql = require("mysql");

class DBclient {
  connection = null;
  constructor() {
    this.connection = mysql.createConnection({
      host: "sql11.freesqldatabase.com",
      user: "sql11690294",
      password: process.env.SECRET,
      database: "sql11690294",
      port: "3306",
    });
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.connection.connect((err) => {
        if (err) {
          console.error("Error connecting to db:", err);
          return reject(false);
        }
        console.log("Connected to DB successfully");
        return resolve(true);
      });
    });
  }

  disconnect() {
    if (this.connection) {
      this.connection.end();
    }
  }

  async delete() {
    await this.connect();
    return new Promise((resolve, reject) => {
      this.connection.query("DELETE FROM `Dates`;", (err, result) => {
        if (err) {
          console.error("Error deleting dates:", err);
          this.disconnect();
          return reject(false);
        }
        console.log("Old dates deleted successfully");
        this.disconnect();
        return resolve(true);
      });
    });
  }

  async save(dates) {
    const sDates = JSON.stringify(dates);
    await this.connect();
    return new Promise((resolve, reject) => {
      this.connection.query(
        "INSERT INTO `Dates` (`Raw`) VALUES (?)",
        [sDates],
        (err, result) => {
          if (err) {
            console.error("Error saving date:", err);
            this.disconnect();
            return reject(false);
          }
          console.log("Date saved successfully");
          this.disconnect();
          return resolve(true);
        }
      );
    });
  }

  async getAllDates() {
    await this.connect();
    return new Promise((resolve, reject) => {
      this.connection.query("SELECT `Raw` FROM `Dates`", (err, rows) => {
        if (err) {
          console.error("Error retrieving dates:", err);
          this.disconnect();
          return reject(err);
        }
        this.disconnect();
        if (rows.length > 0) {
          return resolve(rows[0].Raw);
        } else {
          return resolve(null);
        }
      });
    });
  }
}

module.exports = DBclient;
