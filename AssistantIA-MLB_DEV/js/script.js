/* ===========================
   Assistant IA - ERIP
   Version 1.0
=========================== */

const app = document.getElementById("app");

const ateliers = [
    {
        id: "cv",
        titre: "Créer un CV",
        icone: "📄",
        description: "Préparer ou améliorer votre CV grâce à l'intelligence artificielle.",
        temps: "20 à 30 minutes",
        prompt: "prompts/cv.md"
    },
    {
        id: "lettre",
        titre: "Lettre de motivation",
        icone: "✉️",
        description: "Créer une lettre de motivation personnalisée à partir de votre CV.",
        temps: "20 à 30 minutes",
        prompt: "prompts/lettre.md"
    },
    {
        id: "entretien",
        titre: "Préparer un entretien",
        icone: "🎤",
        description: "Simuler un entretien d'embauche et obtenir des conseils personnalisés.",
        temps: "20 à 30 minutes",
        prompt: "prompts/entretien.md"
    }
];

afficherAccueil();

function afficherAccueil(){

    app.className = "";

    app.innerHTML = "";

    ateliers.forEach(atelier => {

        app.innerHTML += `
            <div class="card">

                <div>

                    <div class="icon">${atelier.icone}</div>

                    <h3>${atelier.titre}</h3>

                    <p>${atelier.description}</p>

                </div>

                <button class="btn"
                        onclick="ouvrirAtelier('${atelier.id}')">

                    Utiliser →

                </button>

            </div>
        `;

    });

}

function ouvrirAtelier(id){

    const atelier = ateliers.find(a => a.id === id);

    app.className = "";

    app.innerHTML = `

    <div class="page">

        <h2>${atelier.icone} ${atelier.titre}</h2>

        <div class="info">

            <strong>Avant de commencer</strong>

        </div>

        <ul>

            <li>✔ Votre CV</li>

            <li>✔ Une offre d'emploi</li>

            <li>✔ Ou simplement le nom de l'entreprise</li>

        </ul>

        <div class="info">

            ⏱ Temps estimé : ${atelier.temps}

        </div>

        <div class="buttons">

            <button class="btn"
                    onclick="copierPrompt('${atelier.prompt}', this)">

                📋 Copier le prompt

            </button>

            <button class="btn"
                    onclick="ouvrirChatGPT()">

                🤖 Ouvrir ChatGPT

            </button>

            <button class="btn secondary"
                    onclick="afficherAccueil()">

                ← Retour

            </button>

        </div>

    </div>

    `;

}

async function copierPrompt(fichier, bouton){

    try{

        const response = await fetch(fichier);

        const texte = await response.text();

        await navigator.clipboard.writeText(texte);

        const ancienTexte = bouton.innerHTML;

        bouton.innerHTML = "✅ Prompt copié";

        setTimeout(()=>{

            bouton.innerHTML = ancienTexte;

        },2000);

    }

    catch{

        alert("Impossible de charger le prompt.");

    }

}

function ouvrirChatGPT(){

    window.open("https://chatgpt.com","_blank");

}