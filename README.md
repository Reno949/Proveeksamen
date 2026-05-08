## Proveeksamen/
 public/
 index.html        # Hovedside med bestillingsskjema
 login.html        # Innlogging og registrering
 script.js         # Logikk for bestillinger
 login-script.js   # Logikk for innlogging
 style.css         # Styling
 server.js         # Express-server og API
 database.db       # SQLite-database
 package.json      # Prosjektinfo og avhengigheter
README.md          # Denne filen



# Flybooking 

## Hva er dette?

Flybooking er en nettside der du kan registrere deg, logge inn og bestille flyreiser. Alt er lagret i en database og nettsiden kjører på en Raspberry Pi.  

## Teknologier

 Teknologi Hva den gjør 
 Node.js + Express Kjører serveren 
SQLite Lagrer data 
HTML/CSS/JS Det brukeren ser 
 Raspberry Pi Hoster nettsiden 

## Funksjoner

Registrere og logge inn med kryptert passord
Legge til flybestillinger
Se og slette bestillinger
 Kun innloggede brukere får tilgang

## Slik starter du prosjektet 

Installer: 
 npm install 
Start:
  npm start

Åpne:

    http://localhost:3000

## Slik kjører du det på Raspberry Pi

Åpne fra en annen enhet:

    http://192.168.1.20.200:3000

## Sikkerhet

 Passord krypteres med SHA-256 før lagring
 Alle sider krever innlogging med token
Ugyldige tokens gir feil og sender deg til innloggingssiden

## Forfatter

Navn: Rehan
Skole: Fyrstikkalleen skole
Fag: VG2 Informasjonsteknologi 
