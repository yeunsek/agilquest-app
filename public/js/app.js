const reservationForm = document.querySelector('form')
const name = document.querySelector('input[name ="name"]')
const startDate = document.querySelector('input[name="startDate"]')
const endDate = document.querySelector('input[name="endDate"]')
const messageOne = document.querySelector('#message-1')

// messageOne.textContent = 'From JavaScript'

reservationForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const reservationName = name.value
    const reservationStartDate = startDate.value
    const reservationEndDate = endDate.value
    

    messageOne.textContent = 'Loading...'

    fetch('http://localhost:3000/reservation?name='+ encodeURIComponent(reservationName) + 
        '&startDate='+encodeURIComponent(reservationStartDate)+'&endDate=' + 
            encodeURIComponent(reservationEndDate)).then((response) => {
    response.json().then((data) => {
        if (data.error) {
           messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.message
        }
    })
})
})