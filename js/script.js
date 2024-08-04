function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
function getUserChoice(){
    let piedraPapelTijera=prompt("Ingrese piedra, papel o tijera:");
    
    console.log('Elemento de usuario: ', piedraPapelTijera);
    return piedraPapelTijera;
}

function getMaquinaChoice(x){
    let elementos= ['piedra', 'papel', 'tijera'];
    console.log('Elemento de maquina: ', elementos[x]);
    return elementos[x];
}

//m de maquina, u de usuario
function determineWinner(m, u){
    let ganador;

    if(m == u){
        alert ("Empate");
    }else{
        if(u=="piedra" && m=="tijera" || u== "tijera" && m== "papel" || u=="papel" && m == "piedra"){
            alert("Ganaste!");
        }
        else{
            alert("Perdiste :( .El ganador es la Maquina");
        }
    }
    
}

let user=getUserChoice();

let maquinaChoice=getRandomInt(3);
let maquina=getMaquinaChoice(maquinaChoice);

alert("La maquina tira: "+ maquina);


determineWinner(maquina,user);





