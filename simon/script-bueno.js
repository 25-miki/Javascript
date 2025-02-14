
let bestScores = JSON.parse(localStorage.getItem("simonScores") || "[]");


// Check if bestScores is empty
if (bestScores.length === 0) {
    for (let i = 0; i < 10; i++) {
        // Push an object with name and score
        bestScores.push({ name: "AAA", score: 10 });
    }
    // Call setRecords after initializing
    setRecords();
    localStorage.setItem('simonScores', JSON.stringify(bestScores));

}

setRecords();



/*id de botones*/

const rojo = document.getElementById("rojo");
const verde = document.getElementById("verde");
const azul = document.getElementById("azul");
const amarillo = document.getElementById("amarillo");
const start = document.getElementById("start");
const texto = document.getElementById("texto");
var rondas = 0;
/*Colorear el svg*/

start.style.fill = "rgb(129,129,129)";
azul.style.fill = "blue";
verde.style.fill = "green";
rojo.style.fill = "rgb(143, 0, 0)";
amarillo.style.fill = "rgb(201, 178, 3)";

/*variables de lógica del juego*/

var simonDice = [];
var reply = [];
var partidaActiva = false;

start.addEventListener("click", function () {
    aclararColor(this, "rgb(215, 215, 215)");
    iniciarPartida();
});

function iniciarPartida() {
    simonDice = [Math.floor(Math.random() * 4) + 1, Math.floor(Math.random() * 4) + 1, Math.floor(Math.random() * 4) + 1];
    reply = [];
    partidaActiva = true;
    rondas = 0;

    // Generar y mostrar la secuencia inicial
    agregarColorASecuencia();
}

function agregarColorASecuencia() {
    const nuevoColor = Math.floor(Math.random() * 4) + 1;
    simonDice.push(nuevoColor);

    // Mostrar la secuencia generada
    for (let i = 0; i < simonDice.length; i++) {
        setTimeout(() => {
            iluminar(simonDice[i]);
        }, i * 1000); // Cada color se ilumina con un intervalo de 1 segundo
    }

    console.log("Secuencia generada por Simón:", simonDice);
    rondas++;
    texto.textContent = `${rondas}`;
}

function iluminar(color) {
    if (color === 1) {
        aclararColor(azul, "aqua");
    } else if (color === 2) {
        aclararColor(amarillo, "yellow");
    } else if (color === 3) {
        aclararColor(rojo, "red");
    } else {
        aclararColor(verde, "lime");
    }
}

// Manejo de clics del jugador
rojo.addEventListener("click", function () {
    manejarRespuesta(3, this, "red");
});

amarillo.addEventListener("click", function () {
    manejarRespuesta(2, this, "yellow");
});

azul.addEventListener("click", function () {
    manejarRespuesta(1, this, "aqua");
});

verde.addEventListener("click", function () {
    manejarRespuesta(4, this, "lime");
});

function manejarRespuesta(color, elemento, nuevoColor) {
    if (!partidaActiva) return; // No permitir clics si la partida no está activa

    reply.push(color);
    aclararColor(elemento, nuevoColor);

    console.log("Respuesta del jugador:", reply);

    // Verificar la respuesta actual
    if (!verificarRespuesta()) {
        console.log("¡Error! La secuencia no coincide.");
        partidaActiva = false;
        ranking(rondas);
        return;
    }

    // Si la respuesta actual es correcta y coincide en longitud con la secuencia, agregar un nuevo color
    if (reply.length === simonDice.length) {
        console.log("¡Secuencia correcta!");
        reply = [];
        setTimeout(agregarColorASecuencia, 1000); // Agregar un nuevo color después de 1 segundo
    }
}

function verificarRespuesta() {
    for (let i = 0; i < reply.length; i++) {
        if (reply[i] !== simonDice[i]) {
            return false;
        }
    }
    return true;
}

function aclararColor(element, nuevoColor) {
    const colorOriginal = element.style.fill;
    element.style.fill = nuevoColor;

    setTimeout(() => {
        element.style.fill = colorOriginal;
    }, 500); // El color vuelve a su estado original después de 500ms
}

function ranking(finalScore){
    const lowestScore = bestScores.length === 10 ? bestScores[9].score : 0;
    
    if (finalScore > lowestScore || bestScores.length < 10) {
        const playerName = prompt("Enter your name:") || "AAA";
        const newScore = { name: playerName, score: finalScore };

        // Insertar y reordenar
        bestScores.push(newScore);
        bestScores = bestScores
            .sort((a, b) => b.score - a.score)
            .slice(0, 10);

        // Guardar en localStorage
        localStorage.setItem('simonScores', JSON.stringify(bestScores));
    }

    setRecords();
}


function setRecords() {
    const recordsTableBody = document.querySelector("#records tbody");
    recordsTableBody.innerHTML = "";
    var topTen = bestScores.slice(0, 10);


    topTen.forEach((entry, index) => {
        const row = document.createElement("tr");
    
        const rankCell = document.createElement("td");
        rankCell.textContent = index + 1;
    
        const nameCell = document.createElement("td");
        nameCell.textContent = entry.name;
    
        const scoreCell = document.createElement("td");
        scoreCell.textContent = entry.score;
    
        row.appendChild(rankCell);
        row.appendChild(nameCell);
        row.appendChild(scoreCell);
    
        recordsTableBody.appendChild(row);
    });
    
}
