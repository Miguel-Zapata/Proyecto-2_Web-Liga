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
    console.log(data);


    let loader = document.getElementById('loader');
    loader.classList.add('d-none');
}

// CREA LA TABLA CON TODOS LOS PARTIDOS.
function crearTablaPartidos(partidos) {
    let tbody = document.getElementById('tbody');
    tbody.setAttribute("class", "tbody_partidos");
    tbody.innerHTML = "";

    for (let i = 0; i < partidos.length; i++) {
        let imagenHome = "<img src='https://crests.football-data.org/" + partidos[i].homeTeam.id + ".svg'/>";
        let imagenAway = "<img src='https://crests.football-data.org/" + partidos[i].awayTeam.id + ".svg'/>";

        let filaExtra = document.createElement('tr');
        let celdaExtra1 = document.createElement('td');
        celdaExtra1.innerHTML = partidos[i].homeTeam.name;
        let celdaEscudo1 = document.createElement('td');
        celdaEscudo1.innerHTML = imagenHome;
        let celdaExtra2 = document.createElement('td');
        celdaExtra2.innerHTML = `${partidos[i].score.fullTime.homeTeam} - ${partidos[i].score.fullTime.awayTeam}`;
        if (partidos[i].score.fullTime.homeTeam == null && partidos[i].score.fullTime.awayTeam == null) {
            celdaExtra2.innerHTML = 'sin jugar';
        }
        let celdaEscudo2 = document.createElement('td');
        celdaEscudo2.innerHTML = imagenAway;
        let celdaExtra3 = document.createElement('td');
        celdaExtra3.innerHTML = partidos[i].awayTeam.name;
        let celdaExtra4 = document.createElement('td');
        celdaExtra4.innerHTML = partidos[i].utcDate.substring(0, 10);
        let celdaExtra5 = document.createElement('td');
        celdaExtra5.innerHTML = partidos[i].status;
        if (partidos[i].status == "FINISHED") {
            celdaExtra5.innerHTML = "JUGADO";
        } else if (partidos[i].status == "POSTPONED") {
            celdaExtra5.innerHTML = "POSTPUESTO";
        } else if (partidos[i].status == "SCHEDULED") {
            celdaExtra5.innerHTML = "NO JUGADO";
        } else if (partidos[i].status == "PAUSED") {
            celdaExtra5.innerHTML = "PAUSA";
        } else if (partidos[i].status == "IN_PLAY") {
            celdaExtra5.innerHTML = "EN JUEGO";
        }

        filaExtra.appendChild(celdaExtra1);
        filaExtra.appendChild(celdaEscudo1);
        filaExtra.appendChild(celdaExtra2);
        filaExtra.appendChild(celdaEscudo2);
        filaExtra.appendChild(celdaExtra3);
        filaExtra.appendChild(celdaExtra4);
        filaExtra.appendChild(celdaExtra5);
        tbody.appendChild(filaExtra);
    }
}

// AÑADE LAS OPCIONES A LOS INPUTS TIPO SELECT QUE HARÁN DE FILTROS EN LA PAGINA partidos.html.
function addOptions(partidos) {
    let equipos = partidos.map(function(equipo, index, array) {
        return equipo.homeTeam.name;
    });

    equipos.sort((a, b) => {
        a = a.toLowerCase();
        b = b.toLowerCase();
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    });

    equipos = new Set(equipos);
    equipos = Array.from(equipos);

    let inputTeam = document.getElementById('team');

    for (i = 0; i < equipos.length; i++) {
        let option = new Option(equipos[i], equipos[i]); // *(text, value).
        inputTeam.append(option);
    }

    inputTeam.addEventListener("change", function() {
        filter(partidos);
    })


    let inputResult = document.getElementById('result');
    let optionResult = ["EMPATA", "GANA", "PIERDE", "PROXIMOS"];

    for (k = 0; k < optionResult.length; k++) {
        let option = document.createElement("option");
        option.value = optionResult[k];
        option.text = optionResult[k];

        inputResult.appendChild(option);
    }
    inputResult.addEventListener("change", function() {
        filter(partidos);
    })
}

// FILTRA LOS PARTIDOS (data.matches) POR NOMBRE DE EQUIPO Y POR RESULTADOS.
function filter(partidos) {
    let alert = document.getElementById('alert');
    alert.classList.add('d-none');
    let alert2 = document.getElementById('alert2');
    alert2.classList.add('d-none');

    let inputTeam = document.getElementById('team');
    let inputResult = document.getElementById('result');

    if (inputTeam.value == "" && inputResult.value != "") {
        alert.classList.remove('d-none');
    }

    if (inputTeam.value == "") {
        crearTablaPartidos(partidos);
        return
    }

    let equipo = partidos.filter(function(partido, i, array) {
        if (partido.awayTeam.name == inputTeam.value) {
            return true;
        }
        if (partido.homeTeam.name == inputTeam.value) {
            return true;
        }
        return false;
    })

    if (inputResult.value == "") {
        creaTablaFiltrada(equipo);
        return
    }

    let results = equipo.filter(function(partido) {
        if (partido.score.winner == "DRAW" && inputResult.value == "EMPATA") {
            return true;
        } else if (partido.score.winner == null && inputResult.value == "PROXIMOS") {
            return true;
        } else if ((partido.homeTeam.name == inputTeam.value && partido.score.fullTime.homeTeam > partido.score.fullTime.awayTeam) && inputResult.value == "GANA") {
            return true;
        } else if ((partido.awayTeam.name == inputTeam.value && partido.score.fullTime.awayTeam > partido.score.fullTime.homeTeam) && inputResult.value == "GANA") {
            return true;
        } else if ((partido.homeTeam.name == inputTeam.value && partido.score.fullTime.homeTeam < partido.score.fullTime.awayTeam) && inputResult.value == "PIERDE") {
            return true;
        } else if ((partido.awayTeam.name == inputTeam.value && partido.score.fullTime.awayTeam < partido.score.fullTime.homeTeam) && inputResult.value == "PIERDE") {
            return true;
        } else {
            return false;
        }
    })
    creaTablaFiltrada(results);
}

// CREA UNA TABLA CON LOS FILTROS QUE SELECCIONE EN LOS INPUTS.
function creaTablaFiltrada(partido) {
    let alert2 = document.getElementById('alert2');
    let inputTeam = document.getElementById('team');
    let tbody = document.getElementById('tbody');
    tbody.innerHTML = "";

    if (partido.length == 0 && inputTeam.value !== "") {
        alert2.classList.remove('d-none');
    }

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
            celda7.innerHTML = "JUGADO";
        } else if (partido[j].status == "POSTPONED") {
            celda7.innerHTML = "POSTPUESTO";
        } else if (partido[j].status == "SCHEDULED") {
            celda7.innerHTML = "NO JUGADO";
        } else if (partido[j].status == "PAUSED") {
            celda7.innerHTML = "PAUSA";
        } else if (partido[j].status == "IN_PLAY") {
            celda7.innerHTML = "EN JUEGO"
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