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

    let loader = document.getElementById('loader');
    loader.classList.add('d-none');
}

// CREA LA TABLA CON TODOS LOS PARTIDOS.
function crearTablaPartidos(partidos) {
    let tbody = document.getElementById('tbody');
    let inputTeam = document.getElementById('team');
    let alert2 = document.getElementById('alert2');
    alert2.classList.add('d-none');

    tbody.setAttribute("class", "tbody_partidos");
    tbody.innerHTML = "";

    if (partidos.length == 0 && inputTeam.value !== "") {
        alert2.classList.remove('d-none');
    }

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
    let inputTeam = document.getElementById('team');
    let inputResult = document.getElementById('result');
    let optionResult = ["EMPATA", "GANA", "PIERDE", "PROXIMOS"];
    let alert = document.getElementById('alert');
    alert.classList.add('d-none');
    let equipos = partidos.map(function(equipo) {
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

    for (i = 0; i < equipos.length; i++) {
        let option = new Option(equipos[i], equipos[i]); // *(text, value).
        inputTeam.append(option);
    }

    inputTeam.addEventListener("change", function() {
        filter(partidos);
    })

    for (k = 0; k < optionResult.length; k++) {
        let option = document.createElement("option");
        option.value = optionResult[k];
        option.text = optionResult[k];

        inputResult.appendChild(option);
    }
    inputResult.addEventListener("change", function() {
        console.log(inputResult.value, inputTeam.value);

        if (inputTeam.value == "" && inputResult.value != "") {
            console.log('hola');
            alert.classList.remove('d-none');
            return
        }
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

    if (inputTeam.value === "" && inputResult.value !== "") {
        inputResult.value = "";
    }

    if (inputTeam.value == "" && inputResult.value != "") {
        alert.classList.remove('d-none');
    }

    if (inputTeam.value == "") {
        crearTablaPartidos(partidos);
        return
    }

    let equipo = partidos.filter(function(partido) {
        if (partido.awayTeam.name == inputTeam.value) {
            return true;
        }
        if (partido.homeTeam.name == inputTeam.value) {
            return true;
        }
        return false;
    })

    if (inputResult.value == "") {
        crearTablaPartidos(equipo);
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
    crearTablaPartidos(results);
}