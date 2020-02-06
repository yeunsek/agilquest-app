const reservationForm = document.querySelector('form')
const reservationList = document.querySelector('table')
const name = document.querySelector('input[name ="name"]')
const loc = document.querySelector('input[name ="location"]')
const startDate = document.querySelector('input[name="startDate"]')
const endDate = document.querySelector('input[name="endDate"]')
const messageOne = document.querySelector('#message-1')

// messageOne.textContent = 'From JavaScript'

reservationForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const reservationName = name.value
    const reservationLocation = loc.value
    const reservationStartDate = startDate.value
    const reservationEndDate = endDate.value
  
    messageOne.textContent = 'Loading...'

    fetch('http://localhost:3000/reservation?name='+ encodeURIComponent(reservationName) + 
    '&location='+encodeURIComponent(reservationLocation) +
        '&startDate='+encodeURIComponent(reservationStartDate)+'&endDate=' + 
            encodeURIComponent(reservationEndDate), {
                method: 'post',
                body: JSON.stringify({
                    name: reservationName,
                    location: reservationLocation,
                    startDate: reservationStartDate,
                    endDate: reservationEndDate
                }),
                headers: {'Content-Type':'application/json'}
            }).then((response) => {
    response.json().then((data) => {
        if (data.error) {
           messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.message
        }
    })
})
})