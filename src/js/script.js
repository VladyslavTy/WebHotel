const URL = "http://localhost:3000/reservations";
const URL_ROOMS = "http://localhost:3000/rooms";
const URL_CLIENTS = "http://localhost:3000/clients";


function roomBooking(obj) {
    document.getElementById("roomsBookingArea").style.display = "flex";
    document.getElementById("rooms-area").style.display = "none";
    let id = obj.querySelector(".roomNumber").innerHTML;

    fetch(URL)
        .then(r => r.json())
        .then(reservations => {
             return  reservations.filter(reservation =>
                reservation.room.number.toString() === id);
        })
        .then(renderRoomBooking)
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
    let fname = document.getElementById("firstname").innerHTML;
    let lname = document.getElementById("lastname").innerHTML;
    let phone = document.getElementById("phone").innerHTML;
    let now = new Date();
    return fetch(URL_CLIENTS ,{
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({
            firstname : fname,
            secondname : lname,
            phone: phone,
            odate : now
        })
    });

}

function createBooking() {
    let fname = document.getElementById("firstname").value;
    let lname = document.getElementById("lastname").value;
    let phone = document.getElementById("phone").value;
    let category = document.getElementById("inputGroupCategory").value;
    let size = document.getElementById("inputGroupSize").value;
    let roomNumber =  document.getElementById("inputGroupRoom").value;
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
                    number : roomNumber,
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

function updateRoomElement(roomElement, room) {
    roomElement.querySelector('.roomNumber').innerText = room.id;
    roomElement.querySelector('.room-size').innerText = room.type;
    roomElement.querySelector('.room-category').innerText = room.category;
}

function updateRoomBookingElement(bookingElement, booking) {
    bookingElement.querySelector('.bookingName').innerText = booking.client.firstname + " " + booking.client.secondname;
    bookingElement.querySelector('.bookingStartPeriod').innerText = booking.startBooking;
    bookingElement.querySelector('.bookingEndPeriod').innerText = booking.endBooking;
}

function updateClientElement(clientElement, client) {
    clientElement.querySelector('.clientNumber').innerText = client.id;
    clientElement.querySelector('.clientsName').innerText = client.secondname;
    clientElement.querySelector('.clientfName').innerText = client.firstname;
    clientElement.querySelector('.clientPhone').innerText = client.phone;
    clientElement.querySelector('.clientDate').innerText = client.odate;
}

function updateBookingElement(bookingElement, booking) {
    bookingElement.querySelector('.bookingNumber').innerText = booking.id;
    bookingElement.querySelector('.name').innerText = booking.client.firstname + " " + booking.client.secondname;
    bookingElement.querySelector('.room').innerText = booking.room.number;
    bookingElement.querySelector('.startPeriod').innerText = booking.startBooking;
    bookingElement.querySelector('.endPeriod').innerText = booking.endBooking;
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

function renderRoomBooking(bookingsList) {
    let templateEl = document.getElementById('roomBookingList');
    let bookingElement = templateEl.content.querySelector(".roomBooking");
    let bookingList = document.getElementById('roomsBooking');
    bookingList.innerHTML = " ";
    for (let booking of bookingsList) {
        let bookingClone = bookingElement.cloneNode(true);
        updateRoomBookingElement(bookingClone, booking);
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

function loadRooms() {
    document.getElementById("booking-area").style.display = "none";
    document.getElementById("booking-container").style.display = "none";
    document.getElementById("clients-area").style.display = "none";
    document.getElementById("roomsBookingArea").style.display = "none";
    document.getElementById("rooms-area").style.display = "flex";
    fetch(URL_ROOMS)
        .then(r => r.json())
        .then(renderRooms);
}

function loadClients() {
    document.getElementById("booking-area").style.display = "none";
    document.getElementById("rooms-area").style.display = "none";
    document.getElementById("roomsBookingArea").style.display = "none";
    document.getElementById("booking-container").style.display = "none";
    document.getElementById("clients-area").style.display = "flex";
    fetch(URL_CLIENTS)
        .then(r => r.json())
        .then(renderClients);
}

function loadBooking() {
    document.getElementById("booking-area").style.display = "flex";
    document.getElementById("clients-area").style.display = "none";
    document.getElementById("roomsBookingArea").style.display = "none";
    document.getElementById("booking-container").style.display = "none";
    document.getElementById("rooms-area").style.display = "none";
    fetch(URL)
        .then(r => r.json())
        .then(renderBooking);
}

function openCreatingForm() {
    document.getElementById("booking-area").style.display = "none";
    document.getElementById("booking-container").style.display = "flex";
    document.getElementById("addButton").style.display = "flex";
    document.getElementById("updateButton").style.display = "none";
}

function openEditForm(obj) {
    document.getElementById("clients-area").style.display = "none";
    document.getElementById("addButton").style.display = "none";
    let fname = document.getElementById("firstname");
    let lname = document.getElementById("lastname");
    let phone = document.getElementById("phone");

    let updateButton = document.getElementById("updateButton");
    updateButton.style.display = "flex";
    let id = obj.parentElement.parentElement.querySelector(".clientNumber");
    fetch(URL_CLIENTS + '/' + id.innerHTML)
        .then(r => r.json())
        .then(function (client) {
            fname.value = client.firstname;
            lname.value = client.secondname;
            phone.value = client.phone;
        });
    document.getElementById("booking-container").style.display = "flex";
}

function updateClient(id) {
    fetch(URL_CLIENTS + '/' + 2, {
        method: "PATCH",
        body: JSON.stringify({
            firstname: firstname.value,
            secondname: lastname.value,
            phone: phone.value
        })
    })
        .then(r => r.json())
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
            elem.value = room.id;
            elem.innerText = room.id;
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
    id.value = "";
    id.placeholder = "Incorrect data";
    return false;
}

function successMessage(id) {
    id.style.border = '2px solid green';
    return true;
}

function registration() {
    if(validateForm()){
       fetch(URL)
            .then(r => r.json())
            .then(createBooking)
            .then(createClient)
    }
}

function checkPeriod(bookings) {
    let bool = true;
    let startDate = document.getElementById("startBooking").value;
    let finishDate = document.getElementById("finishBooking").value;
    let roomNumber = document.getElementById("inputGroupRoom").value;
    let bookingroomnumber;
    for (let i = 0; i <= bookings.length; i++) {
        bookingroomnumber = bookings[i]["room"]["number"];
        if (bookingroomnumber === roomNumber) {
            if ((startDate > bookings[i].endBooking ||
                finishDate < bookings[i].startBooking)) {
                bool = true;
            }
            else {
                bool = false;
                break;
            }
        }
        return bool;
    }
}


