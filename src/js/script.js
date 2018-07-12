const URL = "http://localhost:3000/reservations";
const URL_ROOMS = "http://localhost:3000/rooms";
const URL_CLIENTS = "http://localhost:3000/clients";

function updateBookingElement(bookingElement, booking) {
    bookingElement.querySelector('.bookingNumber').innerText = booking.id;
    bookingElement.querySelector('.name').innerText = booking.client.firstname + " " + booking.client.secondname;
    bookingElement.querySelector('.room').innerText = booking.room.number;
    bookingElement.querySelector('.startPeriod').innerText = booking.startBooking;
    bookingElement.querySelector('.endPeriod').innerText = booking.endBooking;
}

function loadBooking() {
    document.getElementById("booking-area").style.display = "flex";
    document.getElementById("clients-area").style.display = "none";
    document.getElementById("booking-container").style.display = "none";
    document.getElementById("rooms-area").style.display = "none";
    fetch(URL)
        .then(r => r.json())
        .then(renderBooking);
}

function createBooking() {
    let fname = document.getElementById("firstname").value;
    let lname = document.getElementById("lastname").value;
    let phone = document.getElementById("phone").value;
    let category = document.getElementById("inputGroupCategory").value;
    let size = document.getElementById("inputGroupSize").value;
    let roomn =  document.getElementById("inputGroupRoom").value;
    let startBooking = document.getElementById("startBooking").value;
    let finishBooking = document.getElementById("finishBooking").value;
    document.getElementById("booking-container").style.display = "none";
    return fetch(URL, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({
                client : {
                    firstname : fname,
                    secondname : lname,
                    phone : phone
                },
                room : {
                    number : roomn,
                    category : category,
                    type : size
                },
                startBooking : startBooking,
                endBooking : finishBooking
            })
        }
    )
        .then(r => r.json())
        .then(loadBooking)


}

function deleteBooking(obj) {
    let id = obj.parentElement.parentElement.querySelector(".bookingNumber").innerHTML;
    fetch(URL + '/' + id, {
        method: 'delete'
    })
        .then(r => r.json())
        .then(loadBooking)
}

function createClient() {
    let fname = document.getElementById("firstname").value;
    let lname = document.getElementById("lastname").value;
    let phone = document.getElementById("phone").value;

    return fetch(URL_CLIENTS ,{
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({
            firstname : fname,
            secondname : lname,
            phone: phone
        })
    });

}

function renderBooking(bookingsList) {
    let templateEl = document.getElementById('bookingList');
    let bookingElement = templateEl.content.querySelector(".booking");
    let bookingList = document.getElementById('bookings');
    bookingList.innerHTML = " ";
    for (let booking of bookingsList) {
        let bookingClone = bookingElement.cloneNode(true);
        updateBookingElement(bookingClone, booking);
        bookingList.appendChild(bookingClone);
    }
}

function renderRooms(roomList) {
    let templateEl = document.getElementById('roomList');
    let roomElement = templateEl.content.querySelector(".room");
    let roomsList = document.getElementById('rooms');
    roomsList.innerHTML = " ";
    roomList.forEach((room) => {
        let roomClone = roomElement.cloneNode(true);
        updateRoomElement(roomClone, room);
        roomsList.appendChild(roomClone);
    });
}

function updateRoomElement(roomElement, room) {
    roomElement.querySelector('.roomNumber').innerText = room.number;
    roomElement.querySelector('.room-size').innerText = room.type;
    roomElement.querySelector('.room-category').innerText = room.category;
}

function loadRooms() {
    document.getElementById("booking-area").style.display = "none";
    document.getElementById("booking-container").style.display = "none";
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
    for (let client of clientList) {
        let clientClone = clientElement.cloneNode(true);
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
    document.getElementById("booking-container").style.display = "none";
    document.getElementById("clients-area").style.display = "flex";
    fetch(URL_CLIENTS)
        .then(r => r.json())
        .then(renderClients);
}

function openCreatingForm() {
    document.getElementById("booking-area").style.display = "none";
    document.getElementById("booking-container").style.display = "flex";
}

function formRoomsGroup() {
    fetch(URL_ROOMS)
        .then(r => r.json())
        .then(createRoomSelect)
}

function createRoomSelect(roomsList) {
    let roomContainer = document.getElementById("inputGroupRoom");
    roomContainer.innerHTML = "";
    roomsList.forEach(room =>{
        if(room.category === document.getElementById("inputGroupCategory").value &&
            room.type === document.getElementById("inputGroupSize").value){
            let elem = document.createElement('option');
            elem.value = room.number;
            elem.innerText = room.number;
            roomContainer.appendChild(elem);
        }
    })

}

function validateForm() {
    return (validate(firstname, /^[A-Za-zА-Яа-я]+$/) &&
    validate(lastname, /^[A-Za-zА-Яа-я]+$/) &&
    validate(phone, /\d{12}/) &&
    validate(inputGroupRoom, /\d/))
}

function validate(id, condition) {
   return (id.value.match(condition)) ? successMessage(id) : errorMessage(id);
}

function errorMessage(id) {
    id.style.border = '2px solid red';
    id.placeholder = "Incorrect data";
    return false;
}

function successMessage(id) {
    id.style.border = '2px solid green';
    return true;
}

function allowRegistration() {
       fetch(URL)
            .then(r => r.json())
            .then(checkPeriod)
}

function checkPeriod(bookings) {
    bookings.forEach(booking => {
        if(booking.room.number === document.getElementById("inputGroupRoom").value)
        {
        if((document.getElementById("startBooking").value > booking.endBooking ||
              document.getElementById("finishBooking").value < booking.startBooking)){
            createBooking();
        }
        else {
            console.log("fail");
        }
        }
    })
}