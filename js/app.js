const app = document.getElementById("app");

let config = {};
let ateliers = [];
let assistants = [];

document.addEventListener("DOMContentLoaded", init);

async function init() {

    try {

        const configResponse = await fetch("data/config.json");
        config = await configResponse.json();

        const ateliersResponse = await fetch("data/ateliers.json");
        ateliers = await ateliersResponse.json();

        const assistantsResponse = await fetch("data/assistants.json");
assistants = await assistantsResponse.json();

        initialiserPage();

        afficherAccueil();

    }

    catch (e) {

        console.error(e);

        app.innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger">
                    Impossible de charger l'application.
                </div>
            </div>
        `;

    }

}

function initialiserPage() {

    document.title = config.nom;

    document.getElementById("titre").textContent = config.nom;

    document.getElementById("organisme").textContent = config.organisme;

    document.getElementById("logo").src = config.logo;

    document.getElementById("version").textContent =
        "Version " + config.version;

}


function afficherAccueil() {

    app.className = "";

    app.innerHTML = `

<div class="card shadow-lg border-0">

<div class="card-body p-5">

<div class="text-center mb-5">

<h2 class="fw-bold">

Bienvenue 👋

</h2>

<p class="lead">

Choisissez l'atelier que vous souhaitez utiliser.

</p>

</div>

<div id="listeAteliers" class="row g-4">

</div>

</div>

</div>

`;

    const liste = document.getElementById("listeAteliers");

    ateliers.forEach(atelier=>{

        liste.innerHTML+=creerCarte(atelier);

    });

}

function creerCarte(atelier) {

    return `

<div class="col-lg-4 col-md-6">

    <div class="card h-100 shadow-lg border-0">

        <div class="card-body d-flex flex-column text-center">

            <div class="mb-4">

                <div class="rounded-circle bg-danger bg-opacity-10 d-inline-flex align-items-center justify-content-center"
                     style="width:90px;height:90px;">

                    <i class="bi ${atelier.icone} fs-1 text-danger"></i>

                </div>

            </div>

            <h4 class="fw-bold mb-3">

                ${atelier.titre}

            </h4>

            <p class="text-muted flex-grow-1">

    ${atelier.description}

</p>

${
    atelier.url
    ? `
    <div class="small text-primary fw-semibold mb-3">
        <i class="bi bi-box-arrow-up-right"></i>
        Inscription en ligne
    </div>
    `
    : ""
}
            <button
    class="btn btn-danger mt-3"
    onclick="ouvrirAtelier('${atelier.id}')">

    <i class="bi ${
        atelier.url
            ? "bi-box-arrow-up-right"
            : atelier.type === "aide"
            ? "bi-question-circle"
            : atelier.type === "ia"
            ? "bi-cpu"
            : "bi-play-fill"
    }"></i>

    ${
        atelier.url
            ? "Consulter"
            : atelier.type === "aide"
            ? "Ouvrir"
            : atelier.type === "ia"
            ? "Découvrir"
            : "Lancer l'atelier"
    }

</button>

        </div>

    </div>

</div>

`;

}

function afficherAssistantsIA(){

app.innerHTML=`

<div class="card shadow">

<div class="card-body p-5">

<h2 class="text-center mb-5">

🤖 Découvrir les assistants IA

</h2>

<p class="lead">

Les assistants IA peuvent vous aider dans votre recherche d'emploi.

Ils ne remplacent pas votre réflexion mais vous accompagnent.

</p>

<hr>

<div class="row g-4">

<div class="col-md-6">

<div class="card h-100">

<div class="card-body">

<h4>🤖 ChatGPT</h4>

<p>

Polyvalent.

Excellent pour rédiger un CV,

une lettre et préparer un entretien.

</p>

</div>

</div>

</div>

<div class="col-md-6">

<div class="card h-100">

<div class="card-body">

<h4>✨ Gemini</h4>

<p>

Très pratique si vous utilisez Google.

</p>

</div>

</div>

</div>

<div class="col-md-6">

<div class="card h-100">

<div class="card-body">

<h4>🇫🇷 Le Chat</h4>

<p>

Assistant développé par Mistral AI,

entreprise française.

</p>

</div>

</div>

</div>

<div class="col-md-6">

<div class="card h-100">

<div class="card-body">

<h4>🧠 Claude</h4>

<p>

Excellent pour écrire

et reformuler des textes.

</p>

</div>

</div>

</div>

<div class="col-md-6">

<div class="card h-100">

<div class="card-body">

<h4>🔎 Perplexity</h4>

<p>

Très utile pour effectuer

des recherches avec des sources.

</p>

</div>

</div>

</div>

<div class="col-md-6">

<div class="card h-100">

<div class="card-body">

<h4>💻 DeepSeek</h4>

<p>

Polyvalent.

Bon assistant généraliste.

</p>

</div>

</div>

</div>

</div>

<hr>

<div class="alert alert-warning mt-4">

<h5>⚠ Bonnes pratiques</h5>

<ul>

<li>Relisez toujours les réponses.</li>

<li>Ne communiquez jamais vos mots de passe.</li>

<li>Évitez de transmettre des informations bancaires.</li>

<li>L'IA vous aide mais vous restez responsable du document final.</li>

</ul>

</div>

<div class="text-center mt-5">

<button

class="btn btn-danger"

onclick="afficherAccueil()">

Retour

</button>

</div>

</div>

</div>

`;

}

function ouvrirAtelier(id) {

    const atelier = ateliers.find(a => a.id === id);

    // Lien externe (Ateliers ERIP)
    if (atelier.url) {

        window.open(atelier.url, "_blank", "noopener,noreferrer");

        return;

    }

    if (atelier.type === "aide") {

        afficherAide();

        return;

    }

    if (atelier.type === "ia") {

        afficherAssistantsIA();

        return;

    }

    app.className = "";

    app.innerHTML = `

<div class="card shadow">

    <div class="card-body p-4">

        <h2 class="mb-4">

            <i class="bi ${atelier.icone}"></i>

            ${atelier.titre}

        </h2>

        <div class="alert alert-light">

            <h5>Avant de commencer</h5>

            <ul class="mb-0">

                <li>📄 Votre CV</li>

                <li>🌐 Une offre d'emploi ou son lien Internet</li>

                <li>🏢 À défaut, le nom de l'entreprise</li>

            </ul>

        </div>

        <div class="alert alert-secondary">

            ⏱ Temps estimé : 20 à 30 minutes

            <div class="alert alert-info">

💡 Astuce :

Si vous ne connaissez pas une réponse,

écrivez simplement

<strong>je ne sais pas</strong>.

L'IA vous proposera plusieurs suggestions adaptées.

</div>

        </div>

        <div class="d-grid gap-3">

           <button
    class="btn btn-danger btn-lg"
    onclick="choisirAssistant('${atelier.prompt}')">

    <i class="bi bi-cpu"></i>

    Choisir un assistant IA

</button>

            <button
                class="btn btn-outline-secondary"
                onclick="afficherAccueil()">

                <i class="bi bi-arrow-left"></i>

                Retour

            </button>

        </div>

        <div
            id="messageCopie"
            class="alert alert-success mt-4 d-none">

            <strong>✅ Le prompt a été copié.</strong>

            <br><br>

            ChatGPT va s'ouvrir automatiquement.

            <br><br>

            Il ne vous reste plus qu'à faire :

            <strong>CTRL + V</strong>

            puis

            <strong>Entrée</strong>

        </div>

    </div>

</div>

`;

}

function afficherAide() {

    app.className = "";

    app.innerHTML = `

<div class="card shadow">

    <div class="card-body p-5">

        <h2 class="text-center mb-5">

            <i class="bi bi-question-circle-fill text-primary"></i>

            Comment utiliser l'assistant IA ?

        </h2>

        <div class="mb-4">

            <h4>📄 Étape 1</h4>

            <p>

                Préparez votre <strong>CV</strong> si vous en possédez un.

                Si vous répondez à une offre, préparez également le lien ou le document.

                Sinon, le nom de l'entreprise suffit.

            </p>

        </div>

        <hr>

        <div class="mb-4">

            <h4>🚀 Étape 2</h4>

            <p>

                Cliquez sur

                <strong>Lancer l'atelier</strong>.

                Le prompt sera automatiquement copié et ChatGPT s'ouvrira.

            </p>

        </div>

        <hr>

        <div class="mb-4">

            <h4>💬 Étape 3</h4>

            <p>

                Dans ChatGPT :

            </p>

            <div class="text-center">

                <h3>

                    CTRL + V

                </h3>

                <p>

                    puis

                </p>

                <h3>

                    Entrée

                </h3>

            </div>

        </div>

        <hr>

        <div class="mb-4">

            <h4>❓ Étape 4</h4>

            <p>

                Répondez simplement aux questions.

                Vous pouvez répondre par :

            </p>

            <ul>

                <li>une phrase ;</li>

                <li>un mot ;</li>

                <li>une lettre (A, B, C...) ;</li>

                <li>ou un chiffre.</li>

            </ul>

        </div>

        <div class="alert alert-info">

            <h5>💡 Commandes utiles</h5>

            <ul class="mb-0">

                <li><strong>je ne sais pas</strong> → l'IA proposera des idées adaptées.</li>

                <li><strong>je passe</strong> → passer directement à la question suivante.</li>

                <li><strong>STOP</strong> → interrompre la séance.</li>

            </ul>

        </div>

        <div class="alert alert-success">

            <strong>Conseil :</strong>

            Plus vos réponses seront précises,

            plus votre CV, votre lettre ou votre préparation à l'entretien

            seront personnalisés.

        </div>

        <div class="text-center mt-5">

            <button

                class="btn btn-danger"

                onclick="afficherAccueil()">

                <i class="bi bi-arrow-left"></i>

                Retour à l'accueil

            </button>

        </div>

    </div>

</div>

`;

}

function choisirAssistant(prompt){

    let html = `

    <div class="card shadow">

        <div class="card-body p-4">

            <h2 class="mb-4">

                🤖 Choisissez votre assistant IA

            </h2>

    `;

assistants.forEach(a => {

html += `

<div class="card mb-3 shadow-sm">

<div class="card-body">

<div class="form-check">

<input
class="form-check-input"
type="radio"
name="assistant"
value="${a.url}"
id="${a.id}"
${a.id==="chatgpt" ? "checked" : ""}>

<label
class="form-check-label w-100"
for="${a.id}">

<h5 class="mb-1">

${a.nom}

</h5>

<p class="text-muted mb-0">

${a.description}

</p>

</label>

</div>

</div>

</div>

`;

});

    html += `

    <hr>

<button
class="btn btn-outline-primary mb-4"
onclick="afficherAssistantsIA()">

<i class="bi bi-book"></i>

Découvrir les assistants IA

</button>
        <div class="d-grid gap-3 mt-4">

            <button
                class="btn btn-danger"
                onclick="lancerAvecAssistant('${prompt}')">

                Continuer

            </button>

            <button
                class="btn btn-outline-secondary"
                onclick="afficherAccueil()">

                Retour

            </button>

        </div>

        </div>

    </div>

    `;

    app.innerHTML = html;

}

async function lancerAvecAssistant(prompt) {

    try {

        const response = await fetch(prompt);

        const texte = await response.text();

        await navigator.clipboard.writeText(texte);

        const assistant = document.querySelector(
            'input[name="assistant"]:checked'
        );

        if (!assistant) {

            alert("Veuillez choisir un assistant IA.");

            return;

        }

        window.open(assistant.value, "_blank");

        app.innerHTML = `

        <div class="card shadow">

            <div class="card-body text-center p-5">

                <h2 class="text-success">

                    ✅ Prompt copié !

                </h2>

                <br>

                <p>

                    Votre assistant IA s'est ouvert dans un nouvel onglet.

                </p>

                <h3>

                    CTRL + V

                </h3>

                <p>

                    puis

                </p>

                <h3>

                    Entrée

                </h3>

                <br>

                <button
                    class="btn btn-danger"
                    onclick="afficherAccueil()">

                    Retour à l'accueil

                </button>

            </div>

        </div>

        `;

    }

    catch(e){

        console.error(e);

        alert("Impossible de charger le prompt.");

    }

}

