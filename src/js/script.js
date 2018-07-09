const URL = "http://localhost:3000/reservations";

function init() {
    //let form = document.getElementById("form");
    loadBookings();
   /* form.addEventListener("submit",function(event) {
        event.preventDefault();
        createStudent()
            .then(appendStudent);
    })*/
}

window.onload = init;

function renderBookings(bookingsList) {
    let templateEl = document.getElementById('bookingList');
    let bookingElement = templateEl.content.querySelector(".booking");
    let bookingList = document.getElementById('bookings');

    for( let booking of bookingsList ){
        let bookingClone =  bookingElement.cloneNode(true);
        updateBookingElement(bookingClone, booking);
        bookingList.appendChild(bookingClone);
    }
}

function updateBookingElement(bookingElement, booking) {
    bookingElement.querySelector('name').innerText = booking.name;
    bookingElement.querySelector('room').innerText = booking.room;
    bookingElement.querySelector('startPeriod').innerText = booking.startBooking;
    bookingElement.querySelector('endPeriod').innerText = booking.endBooking;
}

function loadBookings() {
    fetch(URL)
        .then(r => r.json())
        .then(renderBookings);
}

function createStudent() {
    let sName = document.getElementById("studentName").value;
    let sLevel = document.getElementById("studentLevel").value;
    console.log(sName,sLevel);
    return fetch(URL, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({name : sName, level : sLevel})
        }
    ).then(r => r.json());
}