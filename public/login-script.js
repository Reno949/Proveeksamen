// logger inn bruker
async function loggInn() {

    let username = document.getElementById("username").value
    let password = document.getElementById("password").value

    let response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })

    let data = await response.json()

    if (response.ok) {
        // lagrer token og brukernavn i nettleseren
        localStorage.setItem("token", data.token)
        localStorage.setItem("brukernavn", username)
        window.location.href = "/"
    } else {
        document.getElementById("melding").innerText = data.message
    } 
}

// registrerer ny bruker
async function registrer() {

    let username = document.getElementById("username").value
    let password = document.getElementById("password").value

    if (username === "" || password === "") {
        document.getElementById("melding").innerText = "fyll inn alt"
        return
    }

    let response = await fetch("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })

    let data = await response.json()

    document.getElementById("melding").innerText = data.message
}