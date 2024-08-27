
//teclado + imagenes para jugador 1
const pptKeyJugador1=[ {key:"a", src:'images/piedrausr.png', nombre :"piedra"},
                       {key:"s", src:'images/papelusr.png', nombre :"papel"},
                       {key:"d", src:'images/tijerusr.png', nombre :"tijera"}
];

//imagenes para maquina 
const pptKeyMaquina=[ {src:'images/piedracpu.png', nombre :"piedra"},
                      {src:'images/papelcpu.png', nombre :"papel"},
                      {src:'images/tijeracpu.png', nombre :"tijera"}
]; 
//teclado + imagenes para jugador 2
const pptKeyJugador2=[ {key:"a", src:'images/piedracpu.png', nombre :"piedra"},
                       {key:"s", src:'images/papelcpu.png', nombre :"papel"},
                       {key:"d", src:'images/tijeracpu.png', nombre :"tijera"}
];


let gameActive = false;
let playerChoice = null;
let contJugador1=0;
let contJugador2=0;
let maxGanado=2;






function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function getMaquinaChoice(x){
    const pptElementos =["piedra","papel","tijera"];
    return pptElementos[x];
}

//m de maquina, u de usuario
function determineWinner(m, u){
    
    if(m === u){
        return 'Empate';
    }else{
        if( u === "piedra" && m ==="tijera" || u === "tijera" && m === "papel" || u === "papel" && m === "piedra"){

            contJugador1++;
            return 'jugador1';
        }
        else{
             contJugador2++;
             return 'jugador2';
        }
    }
    
}
 

//funcion mostrar instrucciones de juego
function mostrarInstruccion(){
    let textoInstruccion= document.getElementById("textInstruccion");
    textoInstruccion.innerHTML = "<p><br>Gana el mejor de 3.</br><br> Player 1 vs Maquina : Para PLAYER 1 'piedra' teclado: J, para 'papel' teclado: K, para 'tijera' teclado : L</br> <br>Player 1 vs Player 2 : Para PLAYER 1 'piedra' teclado: J, para 'papel' teclado: K, para 'tijera' teclado : L. Para PLAYER 2 'piedra' teclado: A, para 'papel' teclado: S, para 'tijera' teclado : D </br></p>";
    textoInstruccion.style.display = 'block'
}

//funcion completar nombre de jugador 
function jugarPlayerCPU(){
    const playerSetup = document.getElementById('playerSetup');
    const multiPlayerSetup = document.getElementById('multiplayerSetup');
    const gameArea = document.getElementById('gameArea');
    playerSetup.style.display = 'block';
    multiPlayerSetup.style.display = 'none';
    gameArea.innerHTML = '';
}

//funcion completar nombre de jugador 1 y 2
function jugarPlayerPlayer(){
    const playerSetup = document.getElementById('playerSetup');
    const multiPlayerSetup = document.getElementById('multiplayerSetup');
    const gameArea = document.getElementById('gameArea');
    multiPlayerSetup.style.display = 'block';
    playerSetup.style.display = 'none';
    gameArea.innerHTML = '';
}


const reiniciarBoton = document.getElementById('reiniciar');
reiniciarBoton.style.display = 'none';

function startGame(){
    const playerName = document.getElementById('playerName').value;
    const playerSetup = document.getElementById('playerSetup');
    const instruccion = document.getElementById('textInstruccion');
    const gameArea = document.getElementById('gameArea');
    
    
    if (playerName.trim() === '') {
        gameArea.innerHTML='Por favor, ingresa tu nombre para jugar.';
        return;
    }else{
        localStorage.setItem('Jugador 1', playerName);
        gameArea.innerHTML='';
    }

    //para maquina
    localStorage.setItem('Jugador 2', 'Maquina');
    
    playerSetup.style.display = 'none';
    instruccion.style.display= 'none';
    
    
    gameActive=true;
     
    
    reiniciarBoton.style.display = 'none';

    document.addEventListener('keydown', handleKeyDown);
   


}   

function handleKeyDown(event) {
    if (!gameActive) return;


    const teclado = event.key;
    const opcionJugador1 = pptKeyJugador1.find(option => option.key === teclado);
    if (opcionJugador1) {
        player1Choice = opcionJugador1.nombre;
        jugada();        
    }
}



function jugada() {
   
            const gameArea = document.getElementById('gameArea');
            gameArea.innerHTML = ''; 
            
            if (!player1Choice) return; // Si no hay elección del jugador, no hacer nada
            let maquinaChoice = getMaquinaChoice(getRandomInt(3));
            let resultado = determineWinner(maquinaChoice, player1Choice);
            

            mostrarChoices(maquinaChoice,player1Choice);

            mostrarResultados();

            if (resultado !== 'Empate') {
                if(contJugador1 === maxGanado){
                    
                   
                    gameActive = false;
                    reiniciarBoton.style.display = 'block';
                    console.log("ganador es jugador1")
                    const jugador1Nombre = localStorage.getItem('Jugador 1');
                    gameArea.innerHTML = `El ganador es ${jugador1Nombre}`;
                    localStorage.setItem('Jugador 1', playerName);
                    
                }
                else if(contJugador2=== maxGanado){
                    
                    gameActive = false;
                    reiniciarBoton.style.display = 'block';
                    console.log("ganador es jugador2");
                    const jugador2Nombre = localStorage.getItem('Jugador 2');
                    gameArea.innerHTML = `El ganador es ${jugador2Nombre}`;
                    
                }else{
                    player1Choice = null;
                }
             }else{
             player1Choice = null;
           }
        
      
} 


function mostrarResultados() {
    const resultadosArea = document.getElementById('puntuacion');
    resultadosArea.innerHTML = `
        <p>Partidas ganadas por Jugador 1: ${contJugador1}</p>
        <p>Partidas ganadas por Jugador 2: ${contJugador2}</p>
    `;
}




function reiniciar(){
    contJugador1=0;
    contJugador2=0;
    document.removeEventListener('keydown', handleKeyDown);
    const gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = ''; 
    reiniciarBoton.style.display = 'none';
    mostrarResultados();
    startGame();
}



function mostrarChoices(m,u) {
    
    
    let imagenUsr = document.createElement("img");
    let imagenMaq=  document.createElement("img");
    
    const opcionJugador1 = pptKeyJugador1.find(option => option.nombre === u);

    imagenUsr.src = opcionJugador1.src;
    imagenUsr.alt= "piedra-papel-tijera";
    document.getElementById("gameArea").appendChild(imagenUsr);


    const opcionMaquina= pptKeyMaquina.find(option => option.nombre === m);
          
    imagenMaq.src=opcionMaquina.src;
    imagenMaq.alt= "piedra-papel-tijera";
    document.getElementById("gameArea").appendChild(imagenMaq);


}

            
const playerSetup = document.getElementById('playerSetup');    
playerSetup.style.display = 'none';       
      

            
    
    
        

      
       

    






