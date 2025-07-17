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
      
        try {
          const response = await fetch('/api/rezepte', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(neuesRezept)
          });
      
          if (response.ok) {
            alert('Rezept erfolgreich hinzugefügt!');
            // Formular zurücksetzen
            event.target.reset();
            // Rezepte neu laden, um das neue Rezept anzuzeigen
            ladeRezepte();
          } else {
            alert('Fehler beim Hinzufügen des Rezepts');
          }
        } catch (error) {
          console.error('Fehler beim Hinzufügen:', error);
          alert('Fehler beim Hinzufügen des Rezepts');
        }
      });

    rezepte.forEach((rezept) => {
        const container = getKategorieContainer(rezept.kategorie);
        if (!container) return;

        const col = document.createElement("div");
        col.className = "col-md-4";

        col.innerHTML = `
            <div class="card h-100" data-id="${rezept.id}">
                <img src="/bilder/${rezept.bild}" class="card-img-top" alt="${rezept.titel}">
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

function zeigeRezeptModal(id) {
    const rezept = rezepte.find(r => r.id === id);
    if (!rezept) return;

    document.getElementById("rezept-modal-title").textContent = rezept.titel;

    document.getElementById("rezept-modal-body").innerHTML = `
        <img src="/bilder/${rezept.bild}" alt="${rezept.titel}" class="img-fluid mb-3">
        <h6>Zutaten:</h6>
        <ul>${rezept.zutaten.map(z => `<li>${z}</li>`).join("")}</ul>
        <h6>Zubereitung:</h6>
        <p>${rezept.zubereitung}</p>
    `;

    const modal = new bootstrap.Modal(document.getElementById("rezept-modal"));
    modal.show();
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