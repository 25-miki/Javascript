const API_URL = "http://ahorcado.alpati.net";
let palabraEscondida = "";
var palabra = document.getElementById("palabra");

const obtenerPista = document.getElementById("obtenerPista");
obtenerPista.addEventListener("click", () => {
    pista.innerText = pistaSecreta;
    pista.style.display = "block";

    JSON.parse(localStorage.setItem("pista mostrada", "block"));
});

const reiniciar = document.getElementById("reiniciar");

reiniciar.addEventListener("click", () => {
    iniciarJuego();
});

var intentos = JSON.parse(localStorage.getItem("intentos"));
if(!intentos){
    intentos = 6;
}


var rutaImagen = "http://ahorcado.alpati.net/assets/img/ahorcado_6.png";
/*var imagen = document.getElementById("ahorcado");
imagen.src = rutaImagen;

var pista = document.getElementById("pista");
var pistaMostrada = JSON.parse(localStorage.getItem("pista mostrada"));
pista.style.display = pistaMostrada;
if(!pistaMostrada){
    pista.style.display = "none";
}*/

let palabraGuardada = JSON.parse(localStorage.getItem("palabraSecreta"));


async function obtenerToken() {
    if (!palabraGuardada){
        let token = localStorage.getItem("word_token");
        if (!token) {
            try {
                const response = await fetch(`${API_URL}/create_hangman_token`, { method: "POST" }, {"username": "Miki"});
                const data = await response.json();
                if (data.word_token) {
                    token = data.word_token;
                    localStorage.setItem("word_token", token);
                } else {
                    console.error("Error obteniendo el token:", data);
                }
            } catch (error) {
                console.error("Error en la solicitud del token:", error);
            }
        }
        return token;
    } else {
        obtenerPalabra();
    }
    
}

async function obtenerPalabra(token) {
    if (!palabraGuardada) {
        try {
            const response = await fetch(`${API_URL}/get_word/${token}`);
            const data = await response.json();
            if (data.id ) {
                var palabraSecreta = data.word;
                var pistaSecreta = data.hint;
                document.getElementById("palabra").textContent = palabraSecreta;
                JSON.parse(localStorage.setItem("palabraSecreta", JSON.stringify(palabraSecreta)));
                JSON.parse(localStorage.setItem("pista", JSON.stringify(pistaSecreta)));

            } else {
                obtenerPalabra(token); 
            }
        } catch (error) {
            console.error("Error obteniendo la palabra", error);
        }
    }
    else {
        palabraSecreta = palabraGuardada;
        pistaSecreta = JSON.parse(localStorage.getItem("pista"));
    }
    
}

async function iniciarJuego() {
    const token = await obtenerToken();
    if (token) {
        obtenerPalabra(token);
        esconderPalabra();
    }
}

function esconderPalabra(){
    for(i=0; i < palabraSecreta.length; i++){
        palabraEscondida[i] = "_";
    }
    palabra.innerText = palabraEscondida;
}

function comprobar(letra, palabraSecreta){
    if (intentos > 0){
        for(i=0; i < palabraSecreta.length; i++){
            if (palabraSecreta[i] === letra){
                palabraEscondida[i] = letra;
            }
        }

        palabra.innerText = palabraEscondida;

        intentos-- ;
        JSON.parse(localStorage.setItem("intentos", JSON.stringify(intentos)));

    
        if(palabraEscondida === palabraSecreta){
            alert("Has ganado!");
            JSON.parse(localStorage.setItem("palabraSecreta", ""));
            JSON.parse(localStorage.setItem("pista", ""));
            JSON.parse(localStorage.setItem("pista mostrada", ""));
            JSON.parse(localStorage.setItem("intentos", ""));




            setInterval(() => iniciarJuego(), 5000);
        }
    } else {
        alert("No te quedan intentos. Reinicia el juego");
    }
    
}

    
iniciarJuego();


