const express = require('express');
const app = express();
const PORT = 3000;

// Body-Parser Middleware, damit wir JSON im POST-Request lesen können
app.use(express.json());

// CORS aktivieren, damit dein Frontend vom anderen Port zugreifen darf
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Für Entwicklung OK
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


app.use(express.static('public'));
// Rezepte-Daten (kopiert aus deiner app.js)
// Wir fügen eine ID hinzu, damit wir einzelne Rezepte identifizieren können
let rezepte = [
    {
        id: 1,
        titel: "Buddha Bowl",
        bild: "bilder/buddahbowl.jpg",
        kategorie: "gesund",
        zutaten: ["Quinoa", "Kichererbsen", "Avocado", "Karotten", "Rotkohl", "Tahini-Dressing"],
        zubereitung: "Alles frisch vorbereiten und in einer Schüssel anrichten. Mit Tahini-Dressing servieren."
    },
    {
        id: 2,
        titel: "Grüne Power Bowl",
        bild: "bilder/Grüne.jpg",
        kategorie: "gesund",
        zutaten: ["Spinat", "Edamame", "Brokkoli", "Gurke", "Avocado", "Limetten-Dressing"],
        zubereitung: "Alle Zutaten blanchieren oder roh verwenden, in einer Schüssel anrichten und mit frischem Limetten-Dressing verfeinern."
    },
    {
        id: 3,
        titel: "Süßkartoffel-Kale Bowl",
        bild: "bilder/süsskartoffel.jpeg",
        kategorie: "gesund",
        zutaten: ["Süßkartoffeln", "Grünkohl", "Kichererbsen", "Rote Beete", "Hummus", "Sesam"],
        zubereitung: "Süßkartoffeln backen, Kale massieren, restliche Zutaten frisch dazugeben und mit Hummus toppen. Mit Sesam bestreuen."
    },
    {
        id: 4,
        titel: "Lachs Poke Bowl",
        bild: "bilder/Pokebowl.jpg",
        kategorie: "herzhaft",
        zutaten: ["Sushi-Reis", "Rohes Lachsfilet", "Edamame", "Gurke", "Sesam", "Soja-Ingwer-Soße"],
        zubereitung: "Reis kochen. Lachs würfeln und marinieren. Mit Gemüse anrichten und Sauce darübergeben."
    },
    {
        id: 5,
        titel: "Vegane Falafel Bowl",
        bild: "bilder/veganefalafel.jpg",
        kategorie: "herzhaft",
        zutaten: ["Falafel", "Hummus", "Gurken", "Tomaten", "Rote Bete", "Pitabrot"],
        zubereitung: "Falafel zubereiten, Gemüse schneiden. Alles mit Hummus in eine Bowl geben. Pitabrot dazu servieren."
    },
    {
        id: 6,
        titel: "Kichererbsen Bowl mit geröstetem Gemüse",
        bild: "bilder/kichererbse2.jpg",
        kategorie: "herzhaft",
        zutaten: ["Kichererbsen (gekocht)", "Süßkartoffeln", "Paprika", "Zucchini", "Avocado", "Tahini-Dressing"],
        zubereitung: "Süßkartoffeln, Paprika und Zucchini in Würfel schneiden und im Ofen rösten. Kichererbsen erwärmen. Alles in einer Bowl anrichten, Avocado dazugeben und mit Tahini-Dressing beträufeln."
    },
    {
        id: 7,
        titel: "Mango-Coconut Bowl",
        bild: "bilder/mango.jpg",
        kategorie: "suess",
        zutaten: ["Mango", "Kokosmilch", "Haferflocken", "Banane", "Chiasamen", "Minze"],
        zubereitung: "Mango mit Kokosmilch pürieren, mit Haferflocken und Früchten anrichten. Chiasamen darüberstreuen."
    },
    {
        id: 8,
        titel: "Schoko-Bananen Bowl",
        bild: "bilder/schoko.jpg",
        kategorie: "suess",
        zutaten: ["Banane", "Kakaopulver", "Joghurt", "Erdnussbutter", "Schokoraspel", "Granola"],
        zubereitung: "Banane mit Joghurt und Kakao mixen. Mit Toppings garnieren und kalt servieren."
    },
    {
        id: 9,
        titel: "Beeren-Smoothie Bowl",
        bild: "bilder/Beeren.jpg",
        kategorie: "suess",
        zutaten: ["Erdbeeren", "Heidelbeeren", "Himbeeren", "Joghurt", "Leinsamen", "Müsli"],
        zubereitung: "Beeren mit Joghurt pürieren. In einer Bowl mit Leinsamen und Müsli dekorieren."
    }
];



// ENDPUNKT 1: Alle Rezepte abrufen (GET)
app.get('/api/rezepte', (req, res) => {
    res.json(rezepte);
});

// ENDPUNKT 2: Neues Rezept hinzufügen (POST)
app.post('/api/rezepte', (req, res) => {
    const neuesRezept = req.body;

    // Neue ID generieren (max id + 1)
    const maxId = rezepte.length > 0 ? Math.max(...rezepte.map(r => r.id)) : 0;
    neuesRezept.id = maxId + 1;

    rezepte.push(neuesRezept);

    res.status(201).json(neuesRezept);
});

// ENDPUNKT 3: Rezept löschen (DELETE)
app.delete('/api/rezepte/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = rezepte.findIndex(r => r.id === id);

    if (index !== -1) {
        rezepte.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: "Rezept nicht gefunden" });
    }
});

// Server starten
app.listen(PORT, () => {
    console.log(`✅ Server läuft auf http://localhost:${PORT}`);
});