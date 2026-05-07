// henter alle bookings når siden åpnes
getBookings()

// legger til booking
async function bookFlight() {

    let from = document.getElementById("from").value
    let to = document.getElementById("to").value
    let date = document.getElementById("date").value

    // sjekker om alt er fylt inn
    if (from === "" || to === "" || date === "") {
        alert("fyll inn alt")
        return
    }

    // sender data til server
    await fetch("/bookings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            from: from,
            to: to,
            date: date
        })
    })

    // oppdaterer liste
    getBookings()
}

// henter alle bookings
async function getBookings() {

    let response = await fetch("/bookings")

    let bookings = await response.json()

    let list = document.getElementById("list")

    list.innerHTML = ""

    // viser bookings på siden
    bookings.forEach(function(b) {

        let li = document.createElement("li")

        li.innerHTML =
            b.fromCity + " → " + b.toCity + " (" + b.date + ") " +
            `<button onclick="deleteBooking(${b.id})">slett</button>`

        list.appendChild(li)
    })
}

// sletter booking
async function deleteBooking(id) {

    await fetch("/bookings/" + id, {
        method: "DELETE"
    })

    getBookings()
}