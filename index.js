const express = require("express");
require("dotenv").config();
const DaysCalculator = require("./DaysCalculator.js");
const DBclient = require("./DBclient.js");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname + "/public")); // webpage.html

let savedDates = [];

app.post("/add-json-dates", (req, res) => {
  const { dates } = req.body;
  savedDates = dates;
  try {
    const dbClient = new DBclient();
    const dbClient2 = new DBclient();
    dbClient.delete().then(() => dbClient2.save(savedDates)); //overwrite all items
  } catch (error) {
    console.error("Error saving dates:", error);
  }
  res.status(201).send("Dates added successfully");
});

app.post("/add-date", (req, res) => {
  const { date } = req.body;
  savedDates.push(date);
  try {
    const dbClient = new DBclient();
    const dbClient2 = new DBclient();
    dbClient.delete().then(() => dbClient2.save(savedDates)); //overwrite all items
  } catch (error) {
    console.error("Error saving dates:", error);
  }
  res.status(201).send("Date added successfully");
});

app.get("/days", async (req, res) => {
  if (savedDates || savedDates.length === 0) {
    try {
      const dbClient = new DBclient();
      savedDates = await dbClient.getAllDates(); //string to json automatic from db
    } catch (err) {
      console.error("Error retrieving dates from DB:", err);
      res.status(500).send("DB error retrieving dates");
      return;
    }
  }
  const result = DaysCalculator.calculate(savedDates);
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server index in http://localhost:${PORT}/webpage.html`);
});
