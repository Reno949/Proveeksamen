// sjekker om bruker er logget inn
let token = localStorage.getItem("token")
let brukernavn = localStorage.getItem("brukernavn")

if (!token) {
    // ikke logget inn → send til login siden
    window.location.href = "/login.html"
}

// viser brukernavn øverst
document.getElementById("brukernavn").innerText = "Logget inn som: " + brukernavn

// henter bookings når siden åpnes
getBookings()


// logger ut
function loggUt() {
    localStorage.removeItem("token")
    localStorage.removeItem("brukernavn")
    window.location.href = "/login.html"
}


// legger til booking
async function bookFlight() {

    let from = document.getElementById("from").value
    let to = document.getElementById("to").value
    let date = document.getElementById("date").value

    if (from === "" || to === "" || date === "") {
        alert("fyll inn alt")
        return
    }

    await fetch("/bookings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "token": token
        },
        body: JSON.stringify({ from, to, date })
    })

    getBookings()
}


// henter alle bookings
async function getBookings() {

    let response = await fetch("/bookings", {
        headers: { "token": token }
    })

    // ugyldig token → send til login
    if (response.status === 401) {
        window.location.href = "/login.html"
        return
    }

    let bookings = await response.json()
    let list = document.getElementById("list")
    list.innerHTML = ""

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
        method: "DELETE",
        headers: { "token": token }
    })

    getBookings()
}