// liste som holder på alle bestillinger
let bookings = JSON.parse(localStorage.getItem("bookings")) || []

// kjører når siden åpnes
showBookings()

function bookFlight() {

    // henter det brukeren skriver
    let from = document.getElementById("from").value
    let to = document.getElementById("to").value
    let date = document.getElementById("date").value

    // sjekker at alt er fylt inn
    if (from === "" || to === "" || date === "") {
        alert("du må fylle inn alt")
        return
    }

    // lager et objekt med data
    let booking = {
        from: from,
        to: to,
        date: date
    }

    // legger til i lista
    bookings.push(booking)

    // lagrer i localStorage så det ikke forsvinner
    localStorage.setItem("bookings", JSON.stringify(bookings))

    // oppdaterer lista på siden
    showBookings()
}

// viser alle bestillinger
function showBookings() {

    let list = document.getElementById("list")
    list.innerHTML = ""

    bookings.forEach((b, index) => {

        // lager en linje for hver booking
        let li = document.createElement("li")

        li.innerHTML = b.from + " → " + b.to + " (" + b.date + ") " +
        "<button onclick='deleteBooking(" + index + ")'>slett</button>"

        list.appendChild(li)
    })
}

// sletter en booking
function deleteBooking(index) {

    // fjerner fra lista
    bookings.splice(index, 1)

    // oppdaterer lagring
    localStorage.setItem("bookings", JSON.stringify(bookings))

    // oppdaterer visning
    showBookings()
}