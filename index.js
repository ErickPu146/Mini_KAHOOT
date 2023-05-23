const container = document.querySelector('#container');
const footerContainer = document.querySelector('#footerContainer');
const start = document.querySelector('#start');
const timeContainer = document.querySelector('#timeContainer');
const time = document.querySelector('#time');
const next = document.querySelector('#next');
const progress = document.querySelector('#progress');
const alert = document.querySelector('#alert');
const header = document.querySelector('header');
const main = document.querySelector('main');
const footer = document.querySelector('footer');


const array = [
    {
        num: 'Pregunta 1',
        question: '¿Qué miembro de los Beatles fue asesinado?',
        image: `./Assets/images/pregunta1.jpg`,
        r1: 'John Lennon',
        r2: 'Paul McCartney',
        r3: 'Ringo Starr',
        rc: 'John Lennon',
    },
    {
        num: 'Pregunta 2',
        question: '¿Cuáles son los tres colores primarios?',
        image: `./Assets/images/pregunta2.jpg`,
        r1: 'Rojo, verde, azul',
        r2: 'Blanco, negro, gris',
        r3: 'Amarillo, azul y rojo',
        rc: 'Amarillo, azul y rojo'
    },
    {
        num: 'Pregunta 3',
        question: '¿De qué nacionalidad es el actual Papa?',
        image: `./Assets/images/pregunta3.jpeg`,
        r1: 'Italia',
        r2: 'Argentina',
        r3: 'España',
        rc: 'Argentina',
    },
    {
        num: 'Pregunta 4',
        question: '¿Quién era el general de los nazis en la Segunda Guerra Mundial?',
        image: `./Assets/images/pregunta4.png`,
        r1: 'Josef Stalin',
        r2: 'Adolf Hittler',
        r3: 'Benito Mussolini',
        rc: 'Adolf Hittler',
    },
    {
        num: 'Pregunta 5',
        question: '¿Cuál es el metal más caro del mundo?',
        image: `./Assets/images/pregunta5.jpg`,
        r1: 'Oro',
        r2: 'Platino',
        r3: 'Rodio',
        rc: 'Rodio'
    }
];

const dibujarDatos = (index) => {
    let card = `
        <div class="card text-center">
                <div class="card-header text-bg-dark">
                    ${array[index].num}
                </div>
                <div class="card-body" style="background-color: rgb(128, 4, 128);">
                    <h5 class="card-title text-light">${array[index].question}</h5>
                    <img src="${array[index].image}" class="card-img-top"
                        alt="Imagen relacionada con la pregunta" style="width: 15rem; height: 8rem;">

                    <div class="mt-4">
                        <div class="btn-group row gap-2" role="group" aria-label="Posibles respuestas">
                            <input onclick="valueAnswer('${array[index].r1}')" type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off">
                            <label id='label1' class="btn btn-outline-success" for="btnradio1">${array[index].r1}</label>

                            <input onclick="valueAnswer('${array[index].r2}')" type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
                            <label id='label2' class="btn btn-outline-warning" for="btnradio2">${array[index].r2}</label>

                            <input onclick="valueAnswer('${array[index].r3}')" type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off">
                            <label id='label3' class="btn btn-outline-info" for="btnradio3">${array[index].r3}</label>
                        </div>
                    </div>
                </div>
                <div class="card-footer bg-dark">
                    <button id='review' onclick="reviewing('${array[index].rc}')"  class="btn btn-primary disabled" type="button">Revisar</button>
                </div>
        </div>
        `
    container.innerHTML = card;
}

let respuestaSeleccionada = '';
let valueProgress = 0;
let index = 0;
let valueTime = 31;
let respuestasCorrectas = 0;
let respuestasIncorrectas = 0;

const starting = () => {
    footerContainer.classList.remove('d-none');
    start.classList.add('d-none');
    timeContainer.classList.remove('d-none');
    next.classList.add('disabled');
    valueProgress += 20;
    progress.style.width = `${valueProgress}%`
    dibujarDatos(index);
    cuentaRegresiva();
}

const advancing = () => {
    const label1 = document.querySelector('#label1');
    const label2 = document.querySelector('#label2');
    const label3 = document.querySelector('#label3');

    label1.classList.remove('disabled');
    label2.classList.remove('disabled');
    label3.classList.remove('disabled');

    next.classList.add('disabled');
    alert.classList.add('d-none');

    index += 1;
    if (index < array.length) {
        valueProgress += 20;
        progress.style.width = `${valueProgress}%`;
        dibujarDatos(index);
    } else {
        main.classList.add('d-none')
        finish();
    }
    valueTime = 31;
}

const cuentaRegresiva = () => { setInterval(() => {
        time.classList.remove('text-danger')
        if (valueTime == 0) {
            respuestasIncorrectas++;
            advancing();
        } else if (valueTime <= 6) {
            time.classList.add('text-danger')
            valueTime--;
            time.innerHTML = valueTime;
        } else {
            valueTime--;
            time.innerHTML = valueTime;
        }

    }, 1000);
}

const valueAnswer = (valueItem) => {
    const review = document.querySelector('#review');
    review.classList.remove('disabled');
    respuestaSeleccionada = valueItem;
}

const reviewing = (valueCorrect) => {
    const label1 = document.querySelector('#label1');
    const label2 = document.querySelector('#label2');
    const label3 = document.querySelector('#label3');

    label1.classList.add('disabled');
    label2.classList.add('disabled');
    label3.classList.add('disabled');

    review.classList.add('disabled');
    next.classList.remove('disabled');
    alert.classList.remove('d-none');
    if (respuestaSeleccionada == valueCorrect) {
        respuestasCorrectas++;
        alert.innerHTML = `
        <div class="alert text-light bg-success" role="alert">
            <h4 class="alert-heading">Respuesta correcta!</h4>
        </div>
        `
    } else {
        respuestasIncorrectas++;
        alert.innerHTML = `
        <div class="alert text-light bg-danger" role="alert">
            <h4 class="alert-heading">Respuesta incorrecta :(</h4>
        </div>
        `
    }
}

const finish = () => {
    alert.classList.add('d-none')
    main.classList.add('d-none');
    footer.classList.add('d-none');

    header.innerHTML += `
    <div class="alert text-light bg-success" role="alert">
    <h4 class="alert-heading">Respuestas correctas: ${respuestasCorrectas}</h4>
    </div>
    <div class="alert text-light bg-danger" role="alert">
    <h4 class="alert-heading">Respuestas incorrectas: ${respuestasIncorrectas}</h4>
    </div>
    `
    clearInterval(cuentaRegresiva());
}

start.addEventListener('click', starting);
next.addEventListener('click', advancing);