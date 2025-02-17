/*resolve(valor): Indica que la promesa se completó con éxito y pasa un resultado.
reject(error): Indica que la promesa falló y pasa un mensaje de error.
.then(): Se ejecuta si la promesa se resolvió con éxito.
.catch(): Se ejecuta si la promesa fue rechazada.*/

document.getElementById("jugar").addEventListener("click", () => {
    document.body.style.backgroundColor = "white";
    document.getElementById("mensaje").textContent = "Esperando el inicio del minuto...";
    
    const esperarAlNuevoMinuto = new Promise((resolve, reject) => {
        const intervalo = setInterval(() => {
            const segundos = new Date().getSeconds();
            if (segundos === 0) {
                clearInterval(intervalo);
                Math.random() < 2/3 ? resolve() : reject();
            }
        }, 1000);
    });
    
    esperarAlNuevoMinuto.then(() => {
        document.body.style.backgroundColor = "green";
        document.getElementById("mensaje").textContent = "¡Has ganado!";
    }).catch(() => {
        document.body.style.backgroundColor = "red";
        document.getElementById("mensaje").textContent = "Has perdido...";
    });
});