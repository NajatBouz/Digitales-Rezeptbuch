const rezepte = [
    // ✅ Gesunde Bowls
    {
        titel: "Buddha Bowl",
        bild: "buddahbowl.jpg",
        kategorie: "gesund",
        zutaten: [
            "Quinoa", "Kichererbsen", "Avocado", "Karotten", "Rotkohl", "Tahini-Dressing"
        ],
        zubereitung: "Alles frisch vorbereiten und in einer Schüssel anrichten. Mit Tahini-Dressing servieren."
    },

    {
        titel: "Grüne Power Bowl",
        bild: "Grüne.jpg",
        kategorie: "gesund",
        zutaten: [
            "Spinat", "Edamame", "Brokkoli", "Gurke", "Avocado", "Limetten-Dressing"
        ],
        zubereitung: "Alle Zutaten blanchieren oder roh verwenden, in einer Schüssel anrichten und mit frischem Limetten-Dressing verfeinern."
    },


    {
        titel: "Süßkartoffel-Kale Bowl",
        bild: "süsskartoffel.jpeg",
        kategorie: "gesund",
        zutaten: [
            "Süßkartoffeln", "Grünkohl", "Kichererbsen", "Rote Beete", "Hummus", "Sesam"
        ],
        zubereitung: "Süßkartoffeln backen, Kale massieren, restliche Zutaten frisch dazugeben und mit Hummus toppen. Mit Sesam bestreuen."
    },


    // ✅ Herzhafte Bowls
    {
        titel: "Lachs Poke Bowl",
        bild: "Pokebowl.jpg",
        kategorie: "herzhaft",
        zutaten: [
            "Sushi-Reis", "Rohes Lachsfilet", "Edamame", "Gurke", "Sesam", "Soja-Ingwer-Soße"
        ],
        zubereitung: "Reis kochen. Lachs würfeln und marinieren. Mit Gemüse anrichten und Sauce darübergeben."
    },

    {
        titel: "Vegane Falafel Bowl",
        bild: "veganefalafel.jpg",
        kategorie: "herzhaft",
        zutaten: [
            "Falafel", "Hummus", "Gurken", "Tomaten", "Rote Bete", "Pitabrot"
        ],
        zubereitung: "Falafel zubereiten, Gemüse schneiden. Alles mit Hummus in eine Bowl geben. Pitabrot dazu servieren."
    },


    {
        titel: "Kichererbsen Bowl mit geröstetem Gemüse",
        bild: "kichererbse2.jpg",
        kategorie: "herzhaft",
        zutaten: [
            "Kichererbsen (gekocht)", 
            "Süßkartoffeln", 
            "Paprika", 
            "Zucchini", 
            "Avocado", 
            "Tahini-Dressing"
        ],
        zubereitung: "Süßkartoffeln, Paprika und Zucchini in Würfel schneiden und im Ofen rösten. Kichererbsen erwärmen. Alles in einer Bowl anrichten, Avocado dazugeben und mit Tahini-Dressing beträufeln."
    },



    // ✅ Süße Bowls
    {
        titel: "Mango-Coconut Bowl",
        bild: "mango.jpg",
        kategorie: "suess",
        zutaten: [
            "Mango", "Kokosmilch", "Haferflocken", "Banane", "Chiasamen", "Minze"
        ],
        zubereitung: "Mango mit Kokosmilch pürieren, mit Haferflocken und Früchten anrichten. Chiasamen darüberstreuen."
    },

    {
        titel: "Schoko-Bananen Bowl",
        bild: "schoko.jpg",
        kategorie: "suess",
        zutaten: [
            "Banane", "Kakaopulver", "Joghurt", "Erdnussbutter", "Schokoraspel", "Granola"
        ],
        zubereitung: "Banane mit Joghurt und Kakao mixen. Mit Toppings garnieren und kalt servieren."
    },

    {
        titel: "Beeren-Smoothie Bowl",
        bild: "Beeren.jpg",
        kategorie: "suess",
        zutaten: [
            "Erdbeeren", "Heidelbeeren", "Himbeeren", "Joghurt", "Leinsamen", "Müsli"
        ],
        zubereitung: "Beeren mit Joghurt pürieren. In einer Bowl mit Leinsamen und Müsli dekorieren."
    }
];

function getKategorieContainer(kategorie) {
    switch (kategorie) {
        case "gesund":
            return document.getElementById("gesunde-bowls");
        case "suess":
            return document.getElementById("suesse-bowls");
        case "herzhaft":
            return document.getElementById("herzhafte-bowls");
        default:
            return null;
    }
}

function zeigeRezeptkarten() {
    rezepte.forEach((rezept, index) => {
        const container = getKategorieContainer(rezept.kategorie);
        if (!container) return;

        const col = document.createElement("div");
        col.className = "col-md-4";

        col.innerHTML = `
            <div class="card h-100" data-index="${index}">
                <img src="${rezept.bild}" class="card-img-top" alt="${rezept.titel}">
                <div class="card-body">
                    <h5 class="card-title">${rezept.titel}</h5>
                </div>
            </div>
        `;

        col.querySelector(".card").addEventListener("click", () => zeigeRezeptModal(index));
        container.appendChild(col);
    });
}

function zeigeRezeptModal(index) {
    const rezept = rezepte[index];

    document.getElementById("rezept-modal-title").textContent = rezept.titel;

    document.getElementById("rezept-modal-body").innerHTML = `
        <img src="${rezept.bild}" alt="${rezept.titel}" class="img-fluid mb-3">
        <h6>Zutaten:</h6>
        <ul>${rezept.zutaten.map(z => `<li>${z}</li>`).join("")}</ul>
        <h6>Zubereitung:</h6>
        <p>${rezept.zubereitung}</p>
    `;

    const modal = new bootstrap.Modal(document.getElementById("rezept-modal"));
    modal.show();
}

document.addEventListener("DOMContentLoaded", zeigeRezeptkarten);