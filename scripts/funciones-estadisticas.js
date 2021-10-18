// 0. Crear función que va calcular las estadísticas, recibiendo como param el array de partidos:
function añadirDatos(partidos) {

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
    // 8. Una vez fuera del loop de partidos, iterar por el array estadisticas
    for (e = 0; e < estadisticas.length; e++) {
        // 9. Añadir la key avg a cada objeto, con el valor goals/matches
        estadisticas[e].avg = estadisticas[e].goals / estadisticas[e].matches;
    }

    // Le estoy diciendo a la function creaTabla que use el Array de objetos estadisticas como parametro, para poder usar la variable que hay en una función
    //dentro de otra.
    creaTabla(estadisticas);

    // 10. Hacer console.log() para ver que todo está correcto.
    console.log(estadisticas);
}
añadirDatos(data.matches);

function creaTabla(arrayEstadisticas) {
    // ordenar array antes
    let tbody = document.getElementById('tbodyHome');
    for (e = 0; arrayEstadisticas.length; e++) {
        let filaHome = document.createElement('tr');
        let celdaHome1 = document.createElement('td');
        celdaHome1.innerHTML = arrayEstadisticas[e].name;
        let celdaHome2 = document.createElement('td');
        celdaHome2.innerHTML = arrayEstadisticas[e].goals;
        let celdaHome3 = document.createElement('td');
        celdaHome3.innerHTML = arrayEstadisticas[e].matches;
        let celdaHome4 = document.createElement('td');
        celdaHome4.innerHTML = "PRUEBA";

        filaHome.appendChild(celdaHome1);
        filaHome.appendChild(celdaHome2);
        filaHome.appendChild(celdaHome3);
        filaHome.appendChild(celdaHome4);
        tbody.appendChild(filaHome);

        console.log(arrayEstadisticas);
    }

    console.log(arrayEstadisticas);
}

console.log(data.matches);