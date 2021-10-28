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
    addDatos(data.matches);
    addDatos2(data.matches);

    let loader = document.getElementById('loader');
    loader.classList.add('d-none');
}

// DATOS PARA LA TABLA 1
function addDatos(partidos) {
    let estadisticas = [];

    for (i = 0; i < partidos.length; i++) {
        if (partidos[i].status == "FINISHED") {
            let findHome = estadisticas.find(equipoHome => equipoHome.id == partidos[i].homeTeam.id);
            if (findHome == undefined) {
                let equipoHome = {
                    id: partidos[i].homeTeam.id,
                    name: partidos[i].homeTeam.name,
                    goals: partidos[i].score.fullTime.homeTeam,
                    matches: 1,
                }
                estadisticas.push(equipoHome);
            } else {
                findHome.goals += partidos[i].score.fullTime.homeTeam;
                findHome.matches++;
            }

            let findAway = estadisticas.find(equipoAway => equipoAway.id == partidos[i].awayTeam.id);
            if (findAway == undefined) {
                let equipoAway = {
                    id: partidos[i].awayTeam.id,
                    name: partidos[i].awayTeam.name,
                    goals: partidos[i].score.fullTime.awayTeam,
                    matches: 1,
                }
                estadisticas.push(equipoAway);
            } else {
                findAway.goals = findAway.goals + partidos[i].score.fullTime.awayTeam;
                findAway.matches++;
            }
        }
    }
    for (e = 0; e < estadisticas.length; e++) {
        estadisticas[e].avg = (estadisticas[e].goals / estadisticas[e].matches);
    }
    creaTabla(estadisticas);
}

// DATOS PARA LA TABLA 2.
function addDatos2(partidos2) {
    let estadisticas2 = [];

    for (x = 0; x < partidos2.length; x++) {
        if (partidos2[x].status == "FINISHED") {
            let findAway2 = estadisticas2.find(equipoAway => equipoAway.id == partidos2[x].awayTeam.id);
            if (findAway2 == undefined) {
                let equipoAway2 = {
                    id: partidos2[x].awayTeam.id,
                    name: partidos2[x].awayTeam.name,
                    golesContra: partidos2[x].score.fullTime.homeTeam,
                    matches: 1
                }
                estadisticas2.push(equipoAway2);
            } else {
                findAway2.golesContra += partidos2[x].score.fullTime.homeTeam;
                findAway2.matches++;
            }
        }
    }
    creaTabla2(estadisticas2);
}

// CREO LA TABLA 1
function creaTabla(arrayEstadisticas) {
    arrayEstadisticas.sort((a, b) => b.avg - a.avg);
    let tbody = document.getElementById('tbodyHome');

    for (j = 0; j < 5; j++) {
        let imagenHome = "<img src='https://crests.football-data.org/" + arrayEstadisticas[j].id + ".svg'/>";
        let filaHome = document.createElement('tr');
        let celdaHome1 = document.createElement('td');
        celdaHome1.innerHTML = imagenHome;
        let celdaHome2 = document.createElement('td');
        celdaHome2.innerHTML = arrayEstadisticas[j].name;
        let celdaHome3 = document.createElement('td');
        celdaHome3.innerHTML = arrayEstadisticas[j].matches;
        let celdaHome4 = document.createElement('td');
        celdaHome4.innerHTML = arrayEstadisticas[j].goals;
        let celdaHome5 = document.createElement('td');
        celdaHome5.innerHTML = arrayEstadisticas[j].avg.toFixed(2);

        filaHome.appendChild(celdaHome1);
        filaHome.appendChild(celdaHome2);
        filaHome.appendChild(celdaHome3);
        filaHome.appendChild(celdaHome4);
        filaHome.appendChild(celdaHome5);
        tbody.appendChild(filaHome);
    }
}

// CREO LA TABLA 2.
function creaTabla2(arrayEsta2) {
    arrayEsta2.sort((a, b) => a.golesContra - b.golesContra);
    let tbody = document.getElementById("tbodyAway");

    for (q = 0; q < 5; q++) {
        let imagenAway = "<img src='https://crests.football-data.org/" + arrayEsta2[q].id + ".svg'/>";
        let filaAway = document.createElement('tr');
        let celdaAway1 = document.createElement('td');
        celdaAway1.innerHTML = imagenAway;
        let celdaAway2 = document.createElement('td');
        celdaAway2.innerHTML = arrayEsta2[q].name;
        let celdaAway3 = document.createElement('td');
        celdaAway3.innerHTML = arrayEsta2[q].matches;
        let celdaAway4 = document.createElement('td');
        celdaAway4.innerHTML = arrayEsta2[q].golesContra;

        filaAway.appendChild(celdaAway1);
        filaAway.appendChild(celdaAway2);
        filaAway.appendChild(celdaAway3);
        filaAway.appendChild(celdaAway4);
        tbody.appendChild(filaAway);
    }
}