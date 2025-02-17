

const resultado = document.getElementById("resultados");
const showBoletos = document.getElementById("boletos");
const num_boletos = document.getElementById("num_boletos");

var numBoletos = [];

class loteria {
    static comprar(num_boletos){

        for (i = 0; i < num_boletos; i++){
            var boleto = Math.floor(Math.random()*9999 )+ 1;
            numBoletos.push(boleto);
        }

        console.log(numBoletos);
        boletos.innerHTML = numBoletos;
        
        return numBoletos;
    }
}

document.getElementById("jugar").addEventListener('click', () => {
   
    const sorteo = new Promise((resolve, reject) => {
        const segundos = new Date().getSeconds();
        const intervalo = setInterval(() => { 
            if (segundos === 0 || segundos === 15 || segundos === 30 || segundos === 45) {
                clearInterval(intervalo);
                var numSorteo = Math.floor(Math.random()*9999 )+ 1;
                if (numBoletos.includes(numSorteo)){
                    resolve();
                }
                else{
                    reject();
                }
            }
        }, 1000);
    
    });
    
    sorteo.then(() => {
        resultado.textContent = "Has ganado!"
    }).catch(() => {
        resultado.textContent = "Has perdido...";
    });
    
})



