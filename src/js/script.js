const URL = "http://localhost:3000/reservations";

function init() {
    let form = document.getElementById("form");

    loadBooking();
    form.addEventListener("submit",function(event) {
        event.preventDefault();
        createBooking()
            .then(appendBooking);
    });




/*
    let deletebtn = document.getElementById("delete-button");
    console.log(deletebtn);
    deletebtn.addEventListener(onclick,function (event) {
        event.preventDefault();
        deleteBooking(deletebtn)
    });*/
}


window.onload = init;

function appendBooking(booking) {
    let templateEl = document.getElementById('bookingList');
    let bookingElement = templateEl.content.querySelector(".booking");
    let bookingList = document.getElementById('bookings');
    let bookingClone =  bookingElement.cloneNode(true);
    updateBookingElement(bookingClone, booking);
    bookingList.appendChild(bookingClone);
}

function renderBooking(bookingsList) {
    let templateEl = document.getElementById('bookingList');
    let bookingElement = templateEl.content.querySelector(".booking");
    let bookingList = document.getElementById('bookings');
    bookingList.innerHTML = " ";
    for( let booking of bookingsList ){
        let bookingClone =  bookingElement.cloneNode(true);
        updateBookingElement(bookingClone, booking);
        bookingList.appendChild(bookingClone);
    }
}

function updateBookingElement(bookingElement, booking) {
    bookingElement.querySelector('.bookingNumber').innerText = booking.id;
    bookingElement.querySelector('.name').innerText = booking.name;
    bookingElement.querySelector('.room').innerText = booking.room;
    bookingElement.querySelector('.startPeriod').innerText = booking.startBooking;
    bookingElement.querySelector('.endPeriod').innerText = booking.endBooking;
}

function loadBooking() {
    fetch(URL)
        .then(r => r.json())
        .then(renderBooking);
}

function createBooking() {
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let roomCharacteristic = document.getElementById("inputGroupSelect02").value + ", " + document.getElementById("inputGroupSelect01").value;
    let startBooking = document.getElementById("startBooking").value;
    let finishBooking = document.getElementById("finishBooking").value;

    return fetch(URL, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({name : name, room : roomCharacteristic, startBooking: startBooking, endBooking: finishBooking})
        }
    ).then(r => r.json());
}

function deleteBooking(obj) {
    let id = obj.parentElement.parentElement.querySelector(".bookingNumber").innerHTML;

    fetch(URL + '/' + id, {
        method: 'delete'
    })
        .then(r => r.json())
        .then(loadBooking)

}
