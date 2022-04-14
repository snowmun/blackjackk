

    let deck         = [],
        puntosJugadores = [],
        especiales = ['A','J','Q','K'];

       //referencias del html tomando los botones

    const btnPedir   = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener');
    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('small');
    const btnNuevo   = document.querySelector('#btnNuevo')

          

    // Esta función inicializa el juego 
    const inicializarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck();

        puntosJugadores = [];
        for( let i = 0; i< numJugadores; i++ ) {
            puntosJugadores.push(0);
        }
        
        puntosHTML.forEach( elem => elem.innerText = 0 );
        divCartasJugadores.forEach( elem => elem.innerHTML = '' );

        btnPedir.disabled   = false;
        btnDetener.disabled = false;

    }

      // esta funcion me creara una baraja con un orden random 

      const crearDeck = () =>{

        deck=[];
        for(let i = 2; i <=10; i++){
            deck.push(i+'C');
            deck.push(i+'D');
            deck.push(i+'H');
            deck.push(i+'S');
        }
        for(let especial of especiales){
            deck.push(especial+'C');
            deck.push(especial+'D');
            deck.push(especial+'H');
            deck.push(especial+'S');
        }
        return  deck = _.shuffle(deck);

    }

     // esta funcion me permite tomar una carta 

    const pedirCarta = () => {
        if ( deck.length === 0 ) {
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    }
    // calor de cada carta 

    const valorCarta = ( carta ) => {
        const valor = carta.substring(0, carta.length - 1);
        return ( isNaN( valor ) ) ? 
                ( valor === 'A' ) ? 11 : 10
                : valor * 1;
    }

      // turno 0 = primer jugador y el ultimo siempre sera la computdora 
    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = ( carta, turno ) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `img/cartas/${ carta }.png`; //3H, JD
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append( imgCarta );

    }
    const determinarGanador=(puntosComputadora,puntosMinimos)=>{
        setTimeout(()=>{
            const mensaje = puntosComputadora === puntosMinimos?`Es un empate `:  
                            puntosMinimos > 21 ?`Computadora Gana `:
                            puntosComputadora > 21 ?'Jugador 1 Gana':'Computadora Gana';
            alert(mensaje)
        },100)
    }

    // turno de la computadora
    const turnoComputadora = ( puntosMinimos ) => {

        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1 );
            crearCarta(carta, puntosJugadores.length - 1 );

        } while(  (puntosComputadora < puntosMinimos)  && (puntosMinimos <= 21 ) );

        determinarGanador(puntosComputadora,puntosMinimos);

    }

 //evento click
    // al hacer click dispararemos la accion pedir 
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos( carta, 0 );
        
        crearCarta( carta, 0 );


        if ( puntosJugador > 21 ) {
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled   = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );

        } else if ( puntosJugador === 21 ) {
            console.warn('21, genial!');
            btnPedir.disabled   = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
        }

    });


    btnDetener.addEventListener('click', () => {
        btnPedir.disabled   = true;
        btnDetener.disabled = true;

        turnoComputadora( puntosJugadores[0] );
    });

    btnNuevo.addEventListener('click', () => {
        
        inicializarJuego();

    });









