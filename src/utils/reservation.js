const fs = require('fs')

const addReservation = (name, startDate, endDate) => {
    const reservations = loadReservations()
    const duplicateReservation = reservations.find((reservation) => 
        (reservation.name === name && reservation.startDate === startDate && reservation.endDate === endDate)
    )
    if (!duplicateReservation) {
        reservations.push({
            name,
            startDate,
            endDate
        })
        saveReservations(reservations)
        return {message:"Reservation Booked"}
    } else {
        return {message: "Duplicated Reservation"}
    }
}

const saveReservations = (reservations) => {
    const dataJSON = JSON.stringify(reservations)
    fs.writeFileSync('reservations.json', dataJSON)
}

const loadReservations = () => {
    try {
        const dataBuffer = fs.readFileSync('reservations.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    addReservation
}