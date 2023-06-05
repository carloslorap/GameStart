let tarjetasdest = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = timer;
let tiempoRegresivo = null;

// apuntando a documento html
let mostrarmovimiento = document.getElementById('movimientos');
let mostraraciertos = document.getElementById('aciertos');
let mostrartiempo = document.getElementById('t-restante');

let winaudio=new Audio('./sound/win.wav');
let loseaudio=new Audio('./sound/lose.wav');
let clickaudio=new Audio('./sound/click.wav');
let rightaudio=new Audio('./sound/rigth.wav');
let wrongaudio=new Audio('./sound/wrong.wav');

let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10];
numeros = numeros.sort(() => { return Math.random() - 0.5 });
console.log(numeros);



function contartiempo() {
    tiempoRegresivo = setInterval(() => {
        timer--;
        mostrartiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if (timer == 0) {
            clearInterval(tiempoRegresivo);
            bloqueartarjeta();
            mostrartiempo.innerHTML = ` por eso ella te dejo...por imben$#%& 🤬💩🖕`;
            loseaudio.play();
        }

    }, 1000);
}

function bloqueartarjeta() {
    for (let i = 0; i <= 19; i++) {
        let tarjetabloqueda = document.getElementById(i);
        tarjetabloqueda.innerHTML =`<img src="imga/${ numeros[i]}.png" alt="">`;
        tarjetabloqueda.disabled = true;

    }
}


function destapar(id) {

    if (temporizador == false) {
        contartiempo();
        temporizador = true;
    }
   
    console.log(tarjetasdest);

    if (tarjetasdest == 0) {
        //mostrar primer numero
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img src="imga/${primerResultado}.png" alt="">`;
        clickaudio.play();

        //deshabilitar primer botom
        tarjeta1.disabled = true;
        tarjetasdest++;
       
    } else if (tarjetasdest == 1) {
        //mostrar segundo numero

        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="imga/${segundoResultado}.png" alt="">`;
        tarjetasdest++;
        tarjeta2.disabled = true;
     
 
        //incrementar movimiento

        movimientos++;
        mostrarmovimiento.innerHTML = `Movimientos: ${movimientos}`;

        if (primerResultado == segundoResultado) {
            tarjetasdest = 0;
            rightaudio.play();

            //aumentar aciertos
            aciertos++;
            mostraraciertos.innerHTML = `Aciertos: ${aciertos}`;
            if (aciertos == 10) {
                winaudio.play();
                clearInterval(tiempoRegresivo);
                mostraraciertos.innerHTML = `Aciertos: ${aciertos} 😀`;
                mostrartiempo.innerHTML = `Fantastico 🎉Solo demoraste ${timerInicial - timer} segundos`;
                mostrarmovimiento.innerHTML = `Movimientos: ${movimientos}💪😎`;
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Buen Trabajo, Pasaste el nivel',
                    showConfirmButton: true,
                    confirmButtonColor: '#A5DC86',
                    timer: 4500
                  })

            }

        } else {
            //mostrar valores y volver a tapar
            setTimeout(() => {
                tarjeta1.innerHTML = '';
                tarjeta2.innerHTML = '';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasdest = 0;
            }, 700);
            wrongaudio.play();
        }
    }

}




let list = document.querySelectorAll('.list');
for (let i = 0; i < list.length; i++) {

    list[i].onclick = function () {
        let j = 0;
        while (j < list.length) {
            list[j++].className = 'list';
        }
        list[i].className = 'list active';
    }

}

let menutoggle = document.querySelector('.toggle');
let navigation = document.querySelector('.navigation');
menutoggle.onclick = function () {
    menutoggle.classList.toggle('active');
    navigation.classList.toggle('active');
};






function nextlevel() {
    if (aciertos == 8) {

        location.href = "secondlevel.html";
    } else {
        //    alert("primero pasate el nivel gil....xdxd")
        Swal.fire({
            icon: 'Advertencia',
            title: 'Oops...',
            text: 'Primero supera el nivel!',

        });

        Swal.fire({

            text: 'Muy pronto saldra!',
            icon: 'error',
            title: 'Advertencia...',
            confirmButtonColor: '#F27474',
            buttonsStyling: true,

        });
    }

}