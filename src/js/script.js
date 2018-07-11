const URL = "http://localhost:3000/reservations";
const URL_ROOMS = "http://localhost:3000/rooms";
const URL_CLIENTS = "http://localhost:3000/clients";

function updateBookingElement(bookingElement, booking) {
    bookingElement.querySelector('.bookingNumber').innerText = booking.id;
    bookingElement.querySelector('.name').innerText = booking.name;
    bookingElement.querySelector('.room').innerText = booking.room;
    bookingElement.querySelector('.startPeriod').innerText = booking.startBooking;
    bookingElement.querySelector('.endPeriod').innerText = booking.endBooking;
}

function loadBooking() {
    document.getElementById("booking-area").style.display = "flex";
    document.getElementById("clients-area").style.display = "none";
    document.getElementById("rooms-area").style.display = "none";
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
    )
        .then(r => r.json())
        .then(loadBooking)
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

function renderRooms(roomList) {
    let templateEl = document.getElementById('roomList');
    let roomElement = templateEl.content.querySelector(".room");
    let roomsList = document.getElementById('rooms');
    roomsList.innerHTML = " ";
    for( let room of roomList ){
        let roomClone =  roomElement.cloneNode(true);
        updateRoomElement(roomClone, room);
        roomsList.appendChild(roomClone);
    }
}

function updateRoomElement(roomElement, room) {
    roomElement.querySelector('.roomNumber').innerText = room.number;
    roomElement.querySelector('.room-size').innerText = room.type;
    roomElement.querySelector('.room-category').innerText = room.category;
}

function loadRooms() {
    document.getElementById("booking-area").style.display = "none";
    document.getElementById("clients-area").style.display = "none";
    document.getElementById("rooms-area").style.display = "flex";
    fetch(URL_ROOMS)
        .then(r => r.json())
        .then(renderRooms);
}

function renderClients(clientList) {
    let templateEl = document.getElementById('clientList');
    let clientElement = templateEl.content.querySelector(".client");
    let clientsList = document.getElementById('clients');
    clientsList.innerHTML = " ";
    for( let client of clientList ){
        let clientClone =  clientElement.cloneNode(true);
        updateClientElement(clientClone, client);
        clientsList.appendChild(clientClone);
    }
}

function updateClientElement(clientElement, client) {
    clientElement.querySelector('.clientNumber').innerText = client.id;
    clientElement.querySelector('.clientsName').innerText = client.secondname;
    clientElement.querySelector('.clientfName').innerText = client.firstname;
    clientElement.querySelector('.clientPhone').innerText = client.phone;
}

function loadClients() {
    document.getElementById("booking-area").style.display = "none";
    document.getElementById("rooms-area").style.display = "none";
    document.getElementById("clients-area").style.display = "flex";
    fetch(URL_CLIENTS)
        .then(r => r.json())
        .then(renderClients);
}

function deleteClient(obj) {
    let id = obj.parentElement.parentElement.querySelector(".clientNumber").innerHTML;

    fetch(URL_CLIENTS + '/' + id, {
        method: 'delete'
    })
        .then(r => r.json())
        .then(loadClients)
}