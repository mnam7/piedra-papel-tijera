
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



let juegoActivo = false;
let jugador1Eleccion = null;
let jugador2Eleccion = null;
let contJugador1=0;
let contJugador2=0;
const maxGanado=2;
let modo="p1vscpu";
let puntaje=0;
let jugador1Actual="";
let jugador2Actual="";
let textoInstruccion= document.getElementById("textInstruccion");
let datoJugador = document.getElementById('datoJugador');
let areaJuego = document.getElementById('areaJuego');
let botonJugadorVsCpu = document.getElementById('jugadorVsCPU');


let jugadores=[{nombre:'Maquina', puntaje:0},
                ];

localStorage.setItem('jugadores', JSON.stringify(jugadores));



function messageAlert(icono,titulo,texto){
    Swal.fire({
        title: titulo,
        text: texto,
        icon: icono
      });
}



function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function getMaquinaChoice(x){
    const pptElementos =["piedra","papel","tijera"];
    return pptElementos[x];
}

//m de maquina, u de usuario
function determinarGanador(m, u){
    
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
 
function mostrarInstruccion(){
    textoInstruccion.classList.add('instruccion-style');
    textoInstruccion.innerHTML = "<p><br>Se gana al mejor de 3.</br><br> 1 punto por partida ganada</br><br> Player 1 vs Maquina : Para PLAYER 1 'piedra' teclado: A, para 'papel' teclado: S, para 'tijera' teclado : D</br>" ;
    if (textoInstruccion.style.display === 'none') {
        textoInstruccion.style.display = 'block'; 
    } else {
        textoInstruccion.style.display = 'none'; 
    }

}

function jugarPlayerCPU(){
    modo="p1vscpu";
    areaJuego.innerHTML = '';
    if (datoJugador.style.display === 'none') {
        datoJugador.style.display = 'block'; 
    } else {
        datoJugador.style.display = 'none'; 
    }
}

let jugadorExistente='';

function guardarJugador(nombre,puntaje) {
    
    jugadores = JSON.parse(localStorage.getItem('jugadores'));
    jugadorExistente = jugadores.find(jugador => jugador.nombre === nombre);
    if (!jugadorExistente) {
        
        const nuevoJugador = { nombre: nombre, puntaje:puntaje };
        jugadores.push(nuevoJugador);
        localStorage.setItem('jugadores', JSON.stringify(jugadores));
    }

}

const reiniciarBoton = document.getElementById('reiniciar');
reiniciarBoton.style.display = 'none';
const salirBoton= document.getElementById('salir');
salirBoton.style.display = 'none';

function iniciarJuego(){

    contJugador1=0;
    contJugador2=0;
   
    const nombreJugador = document.getElementById('nombreJugador').value;
    
    if(nombreJugador.trim()===''){
        messageAlert("warning","Warning","Por favor, ingresa tu nombre para iniciar el juego");

    }
    else{
        jugador1Actual=nombreJugador;
        jugador2Actual='Maquina';
        mostrarResultados();
        jugadorExistente = jugadores.find(jugador => jugador.nombre === jugador2Actual);
        localStorage.setItem('Maquina', jugadorExistente.puntaje);
        guardarJugador(nombreJugador,puntaje);
        areaJuego.innerHTML='';
        botonJugadorVsCpu.disabled=true;
    }
    
    
    datoJugador.style.display = 'none';
    textoInstruccion.style.display= 'none';
    juegoActivo=true;
    reiniciarBoton.style.display = 'none';
    salirBoton.style.display = 'none';
    document.addEventListener('keydown', handleKeyDown);
   
}   

function handleKeyDown(event) {
    if (!juegoActivo) return;
    const teclado = event.key;
    const opcionJugador1 = pptKeyJugador1.find(option => option.key === teclado);
    if(opcionJugador1){
        jugador1Eleccion = opcionJugador1.nombre;
        jugada();
    }
}


function jugada() {
   
            areaJuego.innerHTML = ''; 
            let resultado="null";

            let maquinaEleccion = getMaquinaChoice(getRandomInt(3));
            resultado = determinarGanador(maquinaEleccion, jugador1Eleccion);
            mostrarEleccion(maquinaEleccion,jugador1Eleccion);
            mostrarResultados();

            if (resultado !== 'Empate') {
                if(contJugador1 === maxGanado){
                    juegoActivo = false;
                    reiniciarBoton.style.display = 'block';
                    salirBoton.style.display = 'block';
                    jugadorExistente = jugadores.find(jugador => jugador.nombre === jugador1Actual);
                    if(jugadorExistente){
                        jugadorExistente.puntaje= jugadorExistente.puntaje + 1;
                        areaJuego.innerHTML = `El ganador es ${jugador1Actual}`;
                        localStorage.setItem('jugadores',JSON.stringify(jugadores));
                    }   
                }
                else if(contJugador2=== maxGanado){
                    juegoActivo = false;
                    reiniciarBoton.style.display = 'block';
                    salirBoton.style.display='block';
                    jugadorExistente = jugadores.find(jugador => jugador.nombre === jugador2Actual);
                    if(jugadorExistente){
                        jugadorExistente.puntaje= jugadorExistente.puntaje + 1;
                        localStorage.setItem('Maquina',jugadorExistente.puntaje);
                        areaJuego.innerHTML = `El ganador es ${jugador2Actual}`;
                        localStorage.setItem('jugadores',JSON.stringify(jugadores));
                    } 
                }else{
                    jugador1Eleccion = null;
                    jugador2Eleccion = null;
                }
           }
} 

function mostrarResultados() {
    const resultadosArea = document.getElementById('puntuacion');
    resultadosArea.innerHTML = `
        <p>Partidas ganadas por ${jugador1Actual}: ${contJugador1}</p>
        <p>Partidas ganadas por ${jugador2Actual}: ${contJugador2}</p>
    `;
}

function reiniciar(){
    contJugador1=0;
    contJugador2=0;
    document.removeEventListener('keydown', handleKeyDown);
    areaJuego.innerHTML = ''; 
    reiniciarBoton.style.display = 'none';
    mostrarResultados();
    iniciarJuego();
}

function mostrarEleccion(m,u) {
    
    let imagenPlayer1 = document.createElement("img");
    let imagenPlayer2=  document.createElement("img");
    
    const opcionJugador1 = pptKeyJugador1.find(option => option.nombre === u);
    imagenPlayer1.src = opcionJugador1.src;
    imagenPlayer1.alt= "piedra-papel-tijera";
    document.getElementById("areaJuego").appendChild(imagenPlayer1);
    
    const opcionMaquina= pptKeyMaquina.find(option => option.nombre === m);
    imagenPlayer2.src=opcionMaquina.src;
    imagenPlayer2.alt= "piedra-papel-tijera";
    document.getElementById("areaJuego").appendChild(imagenPlayer2);
    
}

async function fetchData(){
    const apiUrl= '../json/jugadores.json';
    try{
        const response= await fetch(apiUrl);
        const data= await response.json();
        data.forEach(jugador => {
            guardarJugador(jugador.nombre,jugador.puntaje);
        });
    }catch(error){
        console.log("Error");
    }
}

fetchData();

function mostrarRanking() {
    
    const jugadores = JSON.parse(localStorage.getItem('jugadores'))
    jugadores.sort((a, b) => b.puntaje - a.puntaje);
    const top5 = jugadores.slice(0, 5);
    const tabla = document.createElement('table');
    tabla.classList.add('table-style');
    tabla.innerHTML = `
        <thead>
            <tr>
                <th>Posición</th>
                <th>Nombre</th>
                <th>Puntaje</th>
            </tr>
        </thead>
        <tbody">
            ${top5.map((jugador, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${jugador.nombre}</td>
                    <td>${jugador.puntaje}</td>
                </tr>
            `).join('')}
        </tbody>
    `;
    const tablaRanking = document.getElementById('tablaRank');
    tablaRanking.innerHTML = ''; 
    tablaRanking.appendChild(tabla);

    if (tablaRanking.style.display === 'none') {
        tablaRanking.style.display = 'block'; 
    } else {
       tablaRanking.style.display = 'none';
    }

}

function verMiPuntaje(){
        const jugadorActual = jugadores.find(jugador => jugador.nombre === jugador1Actual);
        if(jugadorActual!==undefined) {
            messageAlert("info","Mi puntaje",`${jugadorActual.puntaje}`);
        }else{
            messageAlert("info","Mi puntaje",'Inicia el juego para ver tu puntaje.');
        }
}

function mensajeConfirmacion(){
    Swal.fire({
        title: "Estas seguro de salir?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Si, salir"
      }).then((result) => {
        if (result.isConfirmed) {
            reiniciarBoton.style.display = 'none';
            areaJuego.innerHTML = ''; 
            puntuacion.innerHTML = '';
            eliminarPuntuacion();
            salirBoton.style.display = 'none';
        }
      });
}

function eliminarPuntuacion(){
    jugadorExistente = jugadores.find(jugador => jugador.nombre === jugador2Actual);
    if(jugadorExistente){
        jugadorExistente.puntaje=0;
        localStorage.setItem('Maquina',JSON.stringify(jugadorExistente.puntaje));
        localStorage.setItem('jugadores',JSON.stringify(jugadores));
    } 
    localStorage.removeItem(jugador2Actual);
}

function salirJuego(){
    mensajeConfirmacion();
    jugador1Actual='';
    const botonJugadorVsCpu = document.getElementById('jugadorVsCPU');
    botonJugadorVsCpu.disabled=false;
}
 
datoJugador.style.display = 'none';

      

            
    
    
        

      
       

    






