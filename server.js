const express = require("express")
const sqlite3 = require("sqlite3").verbose()
const crypto = require("crypto")

const app = express()
const db = new sqlite3.Database("database.db")

app.use(express.json())
app.use(express.static("public"))

// lager tabeller
db.run(`CREATE TABLE IF NOT EXISTS bookings (id INTEGER PRIMARY KEY AUTOINCREMENT, fromCity TEXT, toCity TEXT, date TEXT)`)
db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT)`)
db.run(`CREATE TABLE IF NOT EXISTS tokens (token TEXT, username TEXT)`)

// krypterer passord
const hash = (p) => crypto.createHash("sha256").update(p).digest("hex")

// sjekker token
function sjekkToken(req, res, next) {
    db.get("SELECT * FROM tokens WHERE token = ?", [req.headers["token"]], (err, row) => {
        if (!row) return res.status(401).json({ message: "ikke logget inn" })
        req.username = row.username
        next()
    })
}

// registrer
app.post("/signup", (req, res) => {
    db.run("INSERT INTO users (username, password) VALUES (?, ?)", [req.body.username, hash(req.body.password)], function(err) {
        if (err) return res.status(400).json({ message: "brukernavn er tatt" })
        res.json({ message: "bruker opprettet! logg inn nå" })
    })
})

// logg inn
app.post("/login", (req, res) => {
    db.get("SELECT * FROM users WHERE username = ? AND password = ?", [req.body.username, hash(req.body.password)], (err, user) => {
        if (!user) return res.status(401).json({ message: "feil brukernavn eller passord" })
        const token = crypto.randomBytes(32).toString("hex")
        db.run("INSERT INTO tokens (token, username) VALUES (?, ?)", [token, req.body.username])
        res.json({ token })
    })
})

// hent bookings
app.get("/bookings", sjekkToken, (req, res) => {
    db.all("SELECT * FROM bookings", [], (err, rows) => res.json(rows))
})

// legg til booking
app.post("/bookings", sjekkToken, (req, res) => {
    const { from, to, date } = req.body
    db.run("INSERT INTO bookings (fromCity, toCity, date) VALUES (?, ?, ?)", [from, to, date], function(err) {
        res.json({ id: this.lastID })
    })
})

// slett booking
app.delete("/bookings/:id", sjekkToken, (req, res) => {
    db.run("DELETE FROM bookings WHERE id = ?", [req.params.id], () => res.json({ message: "slettet" }))
})

app.listen(3000, () => console.log("server kjører på http://localhost:3000"))