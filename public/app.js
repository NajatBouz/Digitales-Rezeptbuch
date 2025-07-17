let rezepte = []; // Wird vom Server geladen

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

function renderRezepte(rezepteArray) {
    rezepte = rezepteArray; // lokale Kopie speichern

    // Alle Kategorien-Container leeren
    ["gesunde-bowls", "suesse-bowls", "herzhafte-bowls"].forEach(id => {
        document.getElementById(id).innerHTML = "";
    });

    rezepte.forEach((rezept) => {
        const container = getKategorieContainer(rezept.kategorie);
        if (!container) return;

        const col = document.createElement("div");
        col.className = "col-md-4";

        col.innerHTML = `
    <div class="card h-100" data-id="${rezept.id}">
        <img src="${rezept.bild}" class="card-img-top" alt="${rezept.titel}">
        <div class="card-body">
            <h5 class="card-title">${rezept.titel}</h5>
            <button class="btn btn-danger btn-sm mt-2 delete-btn">Löschen</button>
        </div>
    </div>
`;

        // Klick auf Karte öffnet Modal
        col.querySelector(".card").addEventListener("click", () => {
            zeigeRezeptModal(rezept.id);
        });

        // Klick auf Löschen-Button löscht Rezept
        col.querySelector(".delete-btn").addEventListener("click", (event) => {
            event.stopPropagation(); // Verhindert Modal öffnen
            if (confirm(`Willst du das Rezept "${rezept.titel}" wirklich löschen?`)) {
                fetch(`/api/rezepte/${rezept.id}`, { method: 'DELETE' })
                    .then(res => {
                        if (res.ok) {
                            ladeRezepte(); // Neu laden nach Löschen
                        } else {
                            alert("Fehler beim Löschen!");
                        }
                    })
                    .catch(() => alert("Fehler beim Löschen!"));
            }
        });

        container.appendChild(col);
    });
}

// Ergänzungen hier einfügen
document.getElementById('neues-rezept-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Formulardaten auslesen
    const titel = document.getElementById('titel').value.trim();
    const bild = document.getElementById('bild').value.trim();
    const kategorie = document.getElementById('kategorie').value;
    const zutatenText = document.getElementById('zutaten').value.trim();
    const zubereitung = document.getElementById('zubereitung').value.trim();

    // Zutaten in Array umwandeln (Zeilen aufsplitten)
    const zutaten = zutatenText.split('\n').map(z => z.trim()).filter(z => z.length > 0);

    // Neues Rezept-Objekt
    const neuesRezept = { titel, bild, kategorie, zutaten, zubereitung };

    // Rezept-HTML erstellen
    const rezeptHTML = `
        <div class="col-md-4">
            <div class="card">
                <img src="${rezept.bild}" class="card-img-top" alt="${rezept.titel}">
                <div class="card-body">
                    <h5 class="card-title">${titel}</h5>
                    <button class="btn btn-primary" onclick="zeigeRezept('${titel}', '${zutaten.join('<br>')}', '${zubereitung.replace(/\n/g, '<br>')}')">Details anzeigen</button>
                </div>
            </div>
        </div>
    `;

    // Rezept in die richtige Kategorie einfügen
    if (kategorie === 'gesund') {
        document.getElementById('gesunde-bowls').innerHTML += rezeptHTML;
    } else if (kategorie === 'suess') {
        document.getElementById('suesse-bowls').innerHTML += rezeptHTML;
    } else if (kategorie === 'herzhaft') {
        document.getElementById('herzhafte-bowls').innerHTML += rezeptHTML;
    }

    // Formular zurücksetzen
    event.target.reset();
});

// Funktion, um Rezeptdetails im Modal anzuzeigen
function zeigeRezept(titel, zutaten, zubereitung) {
    document.getElementById('rezept-modal-title').innerText = titel;
    document.getElementById('rezept-modal-body').innerHTML = `
        <h5>Zutaten:</h5>
        <p>${zutaten}</p>
        <h5>Zubereitung:</h5>
        <p>${zubereitung}</p>
    `;
    const rezeptModal = new bootstrap.Modal(document.getElementById('rezept-modal'));
    rezeptModal.show();
}

async function ladeRezepte() {
    try {
        const response = await fetch('/api/rezepte');
        const daten = await response.json();
        renderRezepte(daten);
    } catch (error) {
        console.error('Fehler beim Laden der Rezepte:', error);
    }
}

// Wenn Seite geladen, Rezepte laden
document.addEventListener('DOMContentLoaded', ladeRezepte);