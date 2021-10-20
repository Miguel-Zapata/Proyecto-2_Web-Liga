/* Creo una variable para cada Tag que forma la tabla */
// let table = document.createElement('table');
// let thead = document.createElement('thead');
// let tbody = document.createElement('tbody');

/* Le digo que thead y tbody son hijos de table */
// table.appendChild(thead)
// table.appendChild(tbody)

/* Añado table al body. Localizando el body del HTML mediante id y diciendole que table es hijo de body con appendChild */
// document.getElementById('body').appendChild(table);

/* Creo la primera fila de la tabla(tr), que serán los encabezados. Y le añado las distintas celdas(th) donde pongo el texto con innerHTML */
/* let fila1 = document.createElement('tr');
let encabezado1 = document.createElement('th');
encabezado1.innerHTML = "Equipo Local";
let encabezado2 = document.createElement('th');
encabezado2.innerHTML = "Resultados";
let encabezado3 = document.createElement('th');
encabezado3.innerHTML = "Equipo Visitante";
let encabezado4 = document.createElement('th');
encabezado4.innerHTML = "Fecha";
let encabezado5 = document.createElement('th');
encabezado5.innerHTML = "Estado"; */

/* Asigno los encabezados  como hijos de fila1 y fila1 como hijo de thead. Ambos con appendChild */
/* fila1.appendChild(encabezado1);
fila1.appendChild(encabezado2);
fila1.appendChild(encabezado3);
fila1.appendChild(encabezado4);
fila1.appendChild(encabezado5);
document.getElementById('thead').appendChild(fila1); */

function crearTablaPartidos(partidos) {

    let tbody = document.getElementById('tbody');
    tbody.setAttribute("class", "tbody_partidos");
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
            celdaExtra5.innerHTML = "JUGADO"
        } else if (partidos[i].status == "POSTPONED") {
            celdaExtra5.innerHTML = "POSTPUESTO"
        } else if (partidos[i].status == "SCHEDULED") {
            celdaExtra5.innerHTML = "NO JUGADO"
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
    console.log(data);
}
crearTablaPartidos(data.matches);


function addOptions(partidos) {
    // recorrer el array de partidos Y crear nueva array con los nombres de los equipos sin repetir ordenados por orden alfabetico.
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
    // el set no es iterable y hay que convertirlo en array.
    equipos = Array.from(equipos);

    // recorrer array de equipos (equipos1) y añadirlos al input.
    let inputTeam = document.getElementById('team')
    for (i = 0; i < equipos.length; i++) {
        let option = new Option(equipos[i], equipos[i]);
        inputTeam.append(option);
    }
    inputTeam.addEventListener("change", function() {
        filterTeams(data.matches);
    })

}
addOptions(data.matches);

function filterTeams(partidos) {
    let inputTeam = document.getElementById('team');
    //.value me muestra el valor de la option que tengo seleccionada en el input.
    // console.log(inputTeam.value);

    let equipo = partidos.filter(function(partido, i, array) {
        if (partido.awayTeam.name == inputTeam.value) {
            // le tengo que decir si la comparación es true o false, si no, pasa de mi cara
            return true;
        }
        if (partido.homeTeam.name == inputTeam.value) {
            return true;
        }
        return false;
    })
    console.log(equipo);
    creaTablaFiltrada(equipo);
}

function creaTablaFiltrada(equipo) {
    let tbody = document.getElementById('tbody');
    tbody.innerHTML = "";
    for (j = 0; j < equipo.length; j++) {
        let imagenHome = "<img src='https://crests.football-data.org/" + equipo[j].homeTeam.id + ".svg'/>";
        let imagenAway = "<img src='https://crests.football-data.org/" + equipo[j].awayTeam.id + ".svg'/>";

        let fila = document.createElement('tr');
        //equipo loccal
        let celda1 = document.createElement('td');
        celda1.innerHTML = equipo[j].homeTeam.name;
        //escudo local
        let celda2 = document.createElement('td');
        celda2.innerHTML = imagenHome;
        //resultado
        let celda3 = document.createElement('td');
        celda3.innerHTML = `${equipo[j].score.fullTime.homeTeam} - ${equipo[j].score.fullTime.awayTeam}`;
        //escudo away
        let celda4 = document.createElement('td');
        celda4.innerHTML = imagenAway;
        // equipo away
        let celda5 = document.createElement('td');
        //fecha
        let celda6 = document.createElement('td');
        // estado
        let celda7 = document.createElement('td');
    }
}
// filterTeams(data.matches)