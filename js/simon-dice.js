const boton = document.querySelector("[data-boton]");
let secuenciaMaquina = [];
let secuenciaJugador = [];
let ronda = 0;

boton.addEventListener("click",()=> {
    comenzarJuego();
});

const comenzarJuego = ()=>{
    manejarRonda();
};

const reiniciarEstado = ()=>{
    secuenciaMaquina = [];
    secuenciaJugador = [];
    ronda = 0;
};

const manejarRonda = ()=>{
    const $nuevoCuadro = obtenerCuadroAleatorio();
    secuenciaMaquina.push($nuevoCuadro);

    const RETRASO_TURNO_JUGADOR = (secuenciaMaquina.length +1) * 1000;

    secuenciaMaquina.forEach(($cuadro, index)=>{
        const RETRASO_MS = (index + 1)*1000;
        setTimeout(()=>{

        }, RETRASO_MS);
    });
    
};

const obtenerCuadroAleatorio = ()=>{
    const $cuadros = document.querySelectorAll(".cuadro");
    const indice = Math.floor(Math.random() * $cuadros.length);
    return indice;
};