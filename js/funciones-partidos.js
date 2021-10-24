let api = "d0fb2ac181374b5ea229e7642d2c7ada"
let url = "https://api.football-data.org/v2/competitions/2014/matches?="

fetch(url, {
        method: "GET",
        headers: {
            "X-Auth-Token": api
        }
    })
    .then(function(response) {
        if (response.ok) {
            return response.json();
        }
    })
    .then(function(data) {
        init(data);
    })
    .catch(function(err) {
        console.error(err);
    })

function init(data) {
    crearTablaPartidos(data.matches);
    addOptions(data.matches);
    filter(data.matches);
}

//PARA QUE EL LOADER DESAPAREZCA.
let loader = getElementById('loader');
window.addEventListener("load", function() {
    loader.classList.add('d-none');
})

// CREA LA TABLA CON TODOS LOS PARTIDOS.
function crearTablaPartidos(partidos) {

    // OBTENGO LA id DEL tbody PARA PODER INDEXARLO MÁS ADELANTE.
    // LE AÑADO UNA CLASE PARA HACER MODIFICACIONES EN CSS.
    let tbody = document.getElementById('tbody');
    let loader = document.getElementById('loader')
    tbody.setAttribute("class", "tbody_partidos");

    // HAGO UN LOOP POR data.matches PARA CREAR LA TABLA Y AÑADIRLE CONTENIDO.
    for (let i = 0; i < partidos.length; i++) {
        let imagenHome = "<img src='https://crests.football-data.org/" + partidos[i].homeTeam.id + ".svg'/>";
        let imagenAway = "<img src='https://crests.football-data.org/" + partidos[i].awayTeam.id + ".svg'/>";

        let filaExtra = document.createElement('tr');
        let celdaExtra1 = document.createElement('td');
        celdaExtra1.innerHTML = partidos[i].homeTeam.name;
        let celdaEscudo1 = document.createElement('td');
        celdaEscudo1.innerHTML = imagenHome;

        // EN ESTA CELDA USO UN if PARA CAMBIAR LOS null QUE APARECEN EN LOS PARTIDOS SIN JUGAR Y POSTPUESTOS.
        let celdaExtra2 = document.createElement('td');
        celdaExtra2.innerHTML = `${partidos[i].score.fullTime.homeTeam} - ${partidos[i].score.fullTime.awayTeam}`;
        if (partidos[i].score.fullTime.homeTeam == null && partidos[i].score.fullTime.awayTeam == null) {
            celdaExtra2.innerHTML = 'sin jugar';
        }

        let celdaEscudo2 = document.createElement('td');
        celdaEscudo2.innerHTML = imagenAway;
        let celdaExtra3 = document.createElement('td');
        celdaExtra3.innerHTML = partidos[i].awayTeam.name;

        // AQUI USO substring() PARA RECORTAR LA string DE LA FECHA PORQUE APARECEN MUCHOS DATOS.
        let celdaExtra4 = document.createElement('td');
        celdaExtra4.innerHTML = partidos[i].utcDate.substring(0, 10);

        // AQUI USO if Y else if PARA CAMBIAR LOS VALORES POR DEFECTO DE status POR OTROS MÁS ENTENDIBLES.
        let celdaExtra5 = document.createElement('td');
        celdaExtra5.innerHTML = partidos[i].status;
        if (partidos[i].status == "FINISHED") {
            celdaExtra5.innerHTML = "JUGADO"
        } else if (partidos[i].status == "POSTPONED") {
            celdaExtra5.innerHTML = "POSTPUESTO"
        } else if (partidos[i].status == "SCHEDULED") {
            celdaExtra5.innerHTML = "NO JUGADO"
        }

        // INDEXO LAS CELDAS A LA FILA Y ESTA AL tbody PARA GENERAR LA ESTRUCTURA HTML DE LA TABLA.
        filaExtra.appendChild(celdaExtra1);
        filaExtra.appendChild(celdaEscudo1);
        filaExtra.appendChild(celdaExtra2);
        filaExtra.appendChild(celdaEscudo2);
        filaExtra.appendChild(celdaExtra3);
        filaExtra.appendChild(celdaExtra4);
        filaExtra.appendChild(celdaExtra5);
        tbody.appendChild(filaExtra);
        tbody.append(loader);
    }
}



// AÑADE LAS OPCIONES A LOS INPUTS TIPO SELECT QUE HARÁN DE FILTROS EN LA PAGINA partidos.html.
function addOptions(partidos) {
    // recorrer el array de partidos Y crear nueva array con los nombres de los equipos sin repetir ordenados por orden alfabetico.
    // HAGO UN .map POR data.matches PARA OBTENER UN ARRAY CON LOS NOMBRES DE TODOS LOS EQUIPOS.
    let equipos = partidos.map(function(equipo, index, array) {
        return equipo.homeTeam.name;
    });
    //CON .sort ORDENO ALFABETICAMENTE LOS NOMBRES DE LOS EQUIPOS.
    equipos.sort((a, b) => {
        // .toLowerCase ME SIRVE PARA QUE NO TENGA EN CUENTA LAS MAYUSCULAS A LA HORA DE ORDENAR Y NO LO ORDENE POR SEPARADO.
        a = a.toLowerCase();
        b = b.toLowerCase();
        // EL ELEMENTO a IRÁ ANTES QUE EL b.
        if (a < b) {
            return -1;
        }
        // EL ELEMENTO a IRÁ DESPUÉS QUE EL b.
        if (a > b) {
            return 1;
        }
        //LOS ELEMENTOS MANTIENEN SU POSICIÓN.
        return 0;
    });

    // QUITO TODOS LOS EQUIPOS REPETIDOS CON new Set().
    equipos = new Set(equipos);
    // AUNQUE EL Set ME DA UN ARRAY, NO ES ITERABLE. ASÍ QUE LO CONVIERTO EN ARRAY CON Array.from().
    equipos = Array.from(equipos);

    //COJO EL PRIMER INPUT CON LA id Y LO GUARDO EN UNA VARIABLE.
    let inputTeam = document.getElementById('team');
    // RECORRO EL ARRAY DE EQUIPOS QUE OBTUVE CON Array.from() Y AÑADO LOS NOMBRES COMO OPCIONES DEL SELECT.
    for (i = 0; i < equipos.length; i++) {
        let option = new Option(equipos[i], equipos[i]); // *(text, value).
        // INDEXO LAS OPCIONES AL INPUT.
        inputTeam.append(option);
    }
    // PREPARO EL INPUT CON EL EVENTO change PARA QUE ME DE LA FUNCIÓN filter CUANDO SE PRODUZCA.
    inputTeam.addEventListener("change", function() {
        filter(partidos);
    })

    // COJO EL 2º INPUT CON SU id Y LO GUARDO EN UNA VARIABLE.
    let inputResult = document.getElementById('result');
    // CREO MANUALMENTE EL ARRAY CON EL NOMBRE DE LAS OPCIONES QUE CONTENDRÁ EL 2º INPUT.
    let optionResult = ["GANA", "PIERDE", "EMPATA", "PROXIMOS"];
    // RECORRO EL ARRAY DE RESULTADOS Y LOS AÑADO COMO OPCIONES DEL SELECT.
    for (k = 0; k < optionResult.length; k++) {
        let option = document.createElement("option"); // he probado una sintaxis distinta que en la linea 94 para saber hacerlo de las 2 maneras.
        option.value = optionResult[k];
        option.text = optionResult[k];

        // INDEXO LAS OPCIONES AL INPUT.
        inputResult.appendChild(option);
    }
    // PREPARO EL INPUT PARA EL EVENTO change CON LA FUNCIÓN filter().
    inputResult.addEventListener("change", function() {
        filter(partidos);
    })
}


// FILTRA LOS PARTIDOS (data.matches) POR NOMBRE DE EQUIPO Y POR RESULTADOS.
function filter(partidos) {
    // COJO LA ALERTA DE ESCOGER EQUIPO CON LA id Y LE AÑADO LA CLASE d-none PARA OCULTARLA POR DEFECTO.
    let alert = document.getElementById('alert');
    alert.classList.add('d-none');

    // COJO LOS 2 INPUTS CON SU id.
    let inputTeam = document.getElementById('team');
    let inputResult = document.getElementById('result');

    // HAGO UN partidos.filter PARA QUE FILTRE EL NOMBRE DE EQUIPO COINCIDIENDO CON EL VALOR (.value) DEL INPUT CORRESPONDIENTE.
    // .filter ME DEVUELVE UN ARRAY QUE GUARDO EN LA VARIABLE equipo.
    let equipo = partidos.filter(function(partido, i, array) {
        // EN LOS if TENGO QUE ESPECIFICAR QUE QUIERO QUE ME DEVUELVA true EN LAS COMPARACIONES
        if (partido.awayTeam.name == inputTeam.value) {
            return true;
        }
        if (partido.homeTeam.name == inputTeam.value) {
            return true;
        }
        return false;
    })

    //============================================================
    //============= COMENTAR A LLUIS =============================
    //==========================================================

    // LE DIGO QUE SI NO SE HA ESCOGIDO EQUIPO RETIRE LA CLASE d-none DE LA ALERTA, ENTONCES SE MUESTRA.
    if (inputTeam.value == "" && inputResult.value != "") {
        alert.classList.remove('d-none');
    } else if ((inputTeam.value == "" && inputResult.value == "") || inputTeam.value == "") {
        crearTablaPartidos(partidos);
        return
    }

    // SI NO ESCOGEMOS NINGÚN RESULTADO MUESTRA UNA TABLA CON TODOS LOS PARTIDOS DEL EQUIPO QUE TENEMOS SELECCIONADO EN EL INPUT 1.
    if (inputResult.value == "") {
        creaTablaFiltrada(equipo);
        return // este return es para que deje de leer el codigo despues de esta condición.
    }

    // HAGO UN .filter DEL PRIMER .filter. ASÍ ESTOY FILTRANDO POR RESULTADO DENTRO DEL NOMBRE DE EQUIPO QUE TENGA SELECCIONADO EN EL INPUT 1.
    let results = equipo.filter(function(partido) {
            // ESPECIFICO CADA COMPARACIÓN CON return true SEGÚN ME INTERSA PARA QUE APAREZCAN SOLO LOS PARTIDOS CUYO 
            // RESULTADO COINCIDA CON LO SELECCIONADO EN EL INPUT 2.
            if (partido.score.winner == "DRAW" && inputResult.value == "EMPATA") {
                return true; //empate
            } else if (partido.score.winner == null && inputResult.value == "PROXIMOS") {
                return true; //proximos
            } else if ((partido.homeTeam.name == inputTeam.value && partido.score.fullTime.homeTeam > partido.score.fullTime.awayTeam) && inputResult.value == "GANA") {
                return true; //gana
            } else if ((partido.awayTeam.name == inputTeam.value && partido.score.fullTime.awayTeam > partido.score.fullTime.homeTeam) && inputResult.value == "GANA") {
                return true; // gana
            } else if ((partido.homeTeam.name == inputTeam.value && partido.score.fullTime.homeTeam < partido.score.fullTime.awayTeam) && inputResult.value == "PIERDE") {
                return true; //pierde
            } else if ((partido.awayTeam.name == inputTeam.value && partido.score.fullTime.awayTeam < partido.score.fullTime.homeTeam) && inputResult.value == "PIERDE") {
                return true; // pierde
            } else {
                return false;
            }

        })
        // CON UN EQUIPO Y UN RESULTADO SELECCIONADO MUETSRA UNA TABLA CON EL ARRAY QUE TENEMOS GUARDADO EN results.
    creaTablaFiltrada(results);
}

// CREA UNA TABLA CON LOS FILTROS QUE SELECCIONE EN LOS INPUTS.
function creaTablaFiltrada(partido) {
    // COJO LA ALERTA 2 CON SU id Y LE ASIGNO LA CLASE d-none PARA OCULTARLA POR DEFECTO.
    let alert2 = document.getElementById('alert2');
    alert2.classList.add('d-none');
    // COJO EL INPUT DE EQUIPOS POR SU id PARA PODER USARLO EN ESTA FUNCIÓN.
    let inputTeam = document.getElementById('team');
    // COJO EL tbody POR SU id PARA PODER USARLO EN ESTA FUNCIÓN.
    let tbody = document.getElementById('tbody');
    // HAGO QUE EL tbody ESTÉ VACÍO PARA PODER CREAR UNA TABLA EN EL.
    tbody.innerHTML = "";

    // LE DIGO QUE SI EL ARRAY QUE ME LLEGA CON LOS FILTROS SELECCIONADOS EN LOS INPUTS ESTÁ VACÍO LE QUITE LA CLASE d-none A
    // LA ALERTA 2. ASÍ SE MUESTRA.
    if (partido.length == 0 && inputTeam.value !== "") {
        alert2.classList.remove('d-none');
    }

    // RECORRO EL ARRAY QUE ME LLEGA FILTRADO POR LOS INPUTS Y CREO UNA TABLA CON EL CONTENIDO CORRESPONDIENTE.
    // BASICAMENTE ES IDENTICA A LA PRIMERA TABLA, PERO SOLO MUESTRA EL CONTENIDO CON EL EQUIPO Y EL RESULTADO QUE HAYAMOS SELECCIONADO.
    for (j = 0; j < partido.length; j++) {
        let imagenHome = "<img src='https://crests.football-data.org/" + partido[j].homeTeam.id + ".svg'/>";
        let imagenAway = "<img src='https://crests.football-data.org/" + partido[j].awayTeam.id + ".svg'/>";

        let fila = document.createElement('tr');

        let celda1 = document.createElement('td');
        celda1.innerHTML = partido[j].homeTeam.name;
        let celda2 = document.createElement('td');
        celda2.innerHTML = imagenHome;
        let celda3 = document.createElement('td');
        celda3.innerHTML = `${partido[j].score.fullTime.homeTeam} - ${partido[j].score.fullTime.awayTeam}`;
        if (partido[j].score.fullTime.homeTeam == null && partido[j].score.fullTime.awayTeam == null) {
            celda3.innerHTML = 'sin jugar';
        }
        let celda4 = document.createElement('td');
        celda4.innerHTML = imagenAway;
        let celda5 = document.createElement('td');
        celda5.innerHTML = partido[j].awayTeam.name;
        let celda6 = document.createElement('td');
        celda6.innerHTML = partido[j].utcDate.substring(0, 10);
        let celda7 = document.createElement('td');
        celda7.innerHTML = partido[j].status;
        if (partido[j].status == "FINISHED") {
            celda7.innerHTML = "JUGADO"
        } else if (partido[j].status == "POSTPONED") {
            celda7.innerHTML = "POSTPUESTO"
        } else if (partido[j].status == "SCHEDULED") {
            celda7.innerHTML = "NO JUGADO"
        }
        tbody.appendChild(fila);
        fila.appendChild(celda1);
        fila.appendChild(celda2);
        fila.appendChild(celda3);
        fila.appendChild(celda4);
        fila.appendChild(celda5);
        fila.appendChild(celda6);
        fila.appendChild(celda7);
    }
}