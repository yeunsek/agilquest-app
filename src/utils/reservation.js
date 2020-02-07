const fs = require("fs");

const addReservation = (location, name, startDate, endDate) => {
  const reservations = loadReservations();
  const id = 1 + reservations.length;
  const reservationStartDate = new Date(startDate).toLocaleString()
  const reservationEndDate = new Date(endDate).toLocaleString()
  const duplicateReservation = reservations.find(
    reservation =>
      reservation.name.toLowerCase() === name.toLowerCase() &&
      reservation.location.toLowerCase() === location.toLowerCase() &&
      reservation.startDate === reservationStartDate &&
      reservation.endDate === reservationEndDate
  );
  
  if (!duplicateReservation) {
    reservations.push({
      id: id,
      location,
      name,
      startDate: reservationStartDate,
      endDate: reservationEndDate
    });
    saveReservations(reservations);
    return { message: "Reserved" };
  } else {
    return { message: "Duplicated Reservation" };
  }
};

const saveReservations = reservations => {
  const dataJSON = JSON.stringify(reservations);
  fs.writeFileSync("reservations.json", dataJSON);
};

const loadReservations = () => {
  try {
    const dataBuffer = fs.readFileSync("reservations.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addReservation,
  loadReservations
};
