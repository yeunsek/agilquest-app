const path = require("path");
const express = require("express");
const hbs = require("hbs");
const reservation = require("./utils/reservation");

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));
app.use(express.urlencoded({extended:false}))

app.get("", (req, res) => {
  res.render("index", {
    title: "Agilquest",
    name: "Eun"
  });
});

app.post("/reservation", (req, res) => {
  if (!req.query.name || !req.query.startDate || !req.query.endDate || !req.query.location) {
    return res.send({
      error: "You must provide all information"
    });
  }
  return res.send(
    reservation.addReservation(
      req.query.location,
      req.query.name,
      req.query.startDate,
      req.query.endDate
    )
  );
});

app.get("/list", (req, res) => {
  res.render("list", {
    title: "Reservation List",
    name: "Eun",
    data: reservation.loadReservations()
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Eun",
    errorMessage: "Page Not Found"
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000. (Agilquest)");
});
