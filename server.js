const express = require("express")
const sqlite3 = require("sqlite3").verbose()

const app = express()
const PORT = 3000

// kobler til database
const db = new sqlite3.Database("database.db")

// lar server lese json
app.use(express.json())

// viser filer fra public mappen
app.use(express.static("public"))

// test side
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

// lager tabell hvis den ikke finnes
db.run(`
CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fromCity TEXT,
    toCity TEXT,
    date TEXT
)
`)

// henter alle bookings
app.get("/bookings", (req, res) => {

    db.all("SELECT * FROM bookings", [], (err, rows) => {

        if (err) {
            res.status(500).json(err)
            return
        }

        res.json(rows)
    })
})

// legger til booking
app.post("/bookings", (req, res) => {

    let from = req.body.from
    let to = req.body.to
    let date = req.body.date

    // sjekker at alt er fylt inn
    if (!from || !to || !date) {
        res.status(400).json({
            message: "mangler data"
        })
        return
    }

    // legger inn i databasen
    db.run(
        "INSERT INTO bookings (fromCity, toCity, date) VALUES (?, ?, ?)",
        [from, to, date],
        function(err) {

            if (err) {
                res.status(500).json(err)
                return
            }

            res.json({
                id: this.lastID,
                message: "booking lagret"
            })
        }
    )
})

// sletter booking
app.delete("/bookings/:id", (req, res) => {

    db.run(
        "DELETE FROM bookings WHERE id = ?",
        [req.params.id],
        function(err) {

            if (err) {
                res.status(500).json(err)
                return
            }

            res.json({
                message: "booking slettet"
            })
        }
    )
})

// starter server
app.listen(PORT, () => {
    console.log("server kjører på http://localhost:3000")
})