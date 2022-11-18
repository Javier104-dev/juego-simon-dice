const boton = document.querySelector("[data-boton]");
let secuenciaMaquina = [];
let secuenciaJugador = [];
let ronda = 0;

boton.addEventListener("click",()=> {
    comenzarJuego();
});

actualizarEstado(`Presiona el boton para comenzar"`);

function comenzarJuego(){
    reiniciarEstado();
    manejarRonda();
};

function reiniciarEstado(){
    secuenciaMaquina = [];
    secuenciaJugador = [];
    ronda = 0;
};

function manejarRonda(){ //1
    actualizarEstado("La maquina esta jugando")
    bloquearInputUsuario();

    const $nuevoCuadro = obtenerCuadroAleatorio();
    secuenciaMaquina.push($nuevoCuadro);

    const RETRASO_TURNO_JUGADOR = (secuenciaMaquina.length + 1) * 1000;

    secuenciaMaquina.forEach(($cuadro, index)=>{
        const RETRASO_MS = (index + 1)*1000;
        setTimeout(()=>{
            resaltarCuadro($cuadro);
        }, RETRASO_MS);
    });

    //hora del jugador
    setTimeout(()=>{
        actualizarEstado("Turno del jugador");
        desbloquearInputUsuario()
    }, RETRASO_TURNO_JUGADOR);

    secuenciaJugador = [];
    ronda++;
    actulizarRonda(ronda)
};

function menejarInputUsuario(evento){
    const $cuadro = evento.target;
    resaltarCuadro($cuadro);
    secuenciaJugador.push($cuadro)

    const $cuadroMaquina = secuenciaMaquina[secuenciaJugador.length -1];
    
    if($cuadroMaquina.id !== $cuadro.id){
        perdiste();
        return;
    }

    if(secuenciaJugador.length === secuenciaMaquina.length){
        desbloquearInputUsuario();
        setTimeout(manejarRonda, 1000);
        //si se pone una funcion directa se debe poner sin los () o no funcionara el 1000
    }
};

function resaltarCuadro($cuadro){
    $cuadro.style.opacity = 1;
    setTimeout(()=>{
        $cuadro.style.opacity = 0.5;
    }, 500)
};

function obtenerCuadroAleatorio(){
    const $cuadros = document.querySelectorAll(".cuadro");
    const indice = Math.floor(Math.random() * $cuadros.length);
    return $cuadros[indice];
};

function actualizarEstado(mensaje, estado = false){
    const $mensaje = document.querySelector(".menu__mensaje");
    $mensaje.textContent = mensaje;

    if(estado){//si estado es true
        $mensaje.classList.remove("en-juego"); // se debe poner el remove o no se quita la alerta cuando comenzamos un juego nuevo
        $mensaje.classList.add("perdio");
    }else{
        $mensaje.classList.remove("perdio");
        $mensaje.classList.add("en-juego");
    }
};

function actulizarRonda(ronda){
    const $ronda =document.querySelector(".menu__ronda");
    $ronda.textContent = `Ronda numero: ${ronda}`
};

function bloquearInputUsuario(){
    const $cuadrosUsuario = document.querySelectorAll(".cuadro");
    $cuadrosUsuario.forEach((cuadroDeHtml)=>{
        cuadroDeHtml.onclick = ()=>{};
    })
};

function desbloquearInputUsuario(){
    const $cuadrosUsuario = document.querySelectorAll(".cuadro");
    $cuadrosUsuario.forEach((cuadroDeHtml)=>{
        cuadroDeHtml.onclick = menejarInputUsuario;
    })
};

function perdiste(){
    bloquearInputUsuario();
    reiniciarEstado();
    actualizarEstado("Perdiste! presiona el boton para volver a empezar", true);
};