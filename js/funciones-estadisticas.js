// 0. Crear función que va calcular las estadísticas, recibiendo como param el array de partidos:
function addDatos(partidos) {

    // 1. Crear array vacía (será array de objetos)
    let estadisticas = [];

    // 2. Iterar por todos los partidos
    for (i = 0; i < partidos.length; i++) {
        // 3. Condición: si el partido no está acabado, no seguir y mirar siguiente partido
        if (partidos[i].status == "FINISHED") {
            // 4. Buscar en la array estadísticas el objeto con el mismo id que el homeTeam del partido y guardarlo en una variable
            let findHome = estadisticas.find(equipoHome => equipoHome.id == partidos[i].homeTeam.id);
            // 5. Si el objeto buscado no existe
            if (findHome == undefined) {
                // crearlo con estos keys...
                // Rellenar cada key con el valor correspondiente
                let equipoHome = {
                        id: partidos[i].homeTeam.id,
                        name: partidos[i].homeTeam.name,
                        goals: partidos[i].score.fullTime.homeTeam,
                        matches: 1,
                    }
                    // hacer push a la array
                estadisticas.push(equipoHome);
                // 6. Si existe, actualizar los goles y los partidos
            } else {
                findHome.goals += partidos[i].score.fullTime.homeTeam;
                findHome.matches++;
            }


            // 7. Hacer exactamente lo mismo a partir del punto 4, pero con awayTeam
            // 7.1 Buscar en el Array estadisticas el objeto con el mismo id que el awayTeam del partido y guardarlo en una variable.
            let findAway = estadisticas.find(equipoAway => equipoAway.id == partidos[i].awayTeam.id);
            // 7.2 Si el objeto buscado no existe
            if (findAway == undefined) {
                // crearlo con estos keys
                let equipoAway = {
                        id: partidos[i].awayTeam.id,
                        name: partidos[i].awayTeam.name,
                        goals: partidos[i].score.fullTime.awayTeam,
                        matches: 1,
                    }
                    //hacer push a la array
                estadisticas.push(equipoAway);
                //7.3 Si existe, actualizar los goles y los partidos
            } else {
                findAway.goals = findAway.goals + partidos[i].score.fullTime.awayTeam;
                findAway.matches++;
            }
        }
    }
    // 8. Una vez fuera del loop de partidos, iterar por el array estadisticas
    for (e = 0; e < estadisticas.length; e++) {
        // 9. Añadir la key avg a cada objeto, con el valor goals/matches
        estadisticas[e].avg = (estadisticas[e].goals / estadisticas[e].matches);
    }

    // Le estoy diciendo a la function creaTabla que use el Array de objetos estadisticas como parametro, para poder usar la variable que hay en una función
    //dentro de otra.
    creaTabla(estadisticas);

    // 10. Hacer console.log() para ver que todo está correcto.
    console.log(estadisticas);
}
addDatos(data.matches);

// explicar funcion
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
    console.log(estadisticas2);
    creaTabla2(estadisticas2);
}
addDatos2(data.matches);

function creaTabla2(arrayEsta2) {
    // Ordena el array en una linea con a-bAS. si a>b= num.Positivo - si a<b= num.Negativo - si a=b= 0.
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

function creaTabla(arrayEstadisticas) {
    // ordenar array antes
    arrayEstadisticas.sort(function(a, b) {
        if (a.avg > b.avg) {
            return -1;
        } else if (a.avg < b.avg) {
            return 1
        } else {
            return 0
        }
    });
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

    console.log(arrayEstadisticas);
}

console.log(data.matches);