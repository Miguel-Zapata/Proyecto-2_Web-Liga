let api = "d0fb2ac181374b5ea229e7642d2c7ada"
let url = "https://api.football-data.org/v2/competitions/2014/standings"

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
    crearTablaClasificaciones(data.standings[0].table);
}

function crearTablaClasificaciones(clasificaciones) {
    let tbody = document.getElementById('tbody');
    tbody.setAttribute("class", "tbody_clasificacion");

    // Por cada equipo
    for (let i = 0; i < clasificaciones.length; i++) {
        // Creo una fila
        let positionRow = document.createElement('tr');
        // Creo un Array con datos nuevos que corresponden a la i de clasificaciones.length
        let array = [clasificaciones[i].position, `<img src="${clasificaciones[i].team.crestUrl}"/>`, clasificaciones[i].team.name, clasificaciones[i].playedGames, clasificaciones[i].won, clasificaciones[i].draw, clasificaciones[i].lost, clasificaciones[i].goalsFor, clasificaciones[i].goalsAgainst, clasificaciones[i].goalDifference, clasificaciones[i].points, clasificaciones[i].form];

        //  Por cada fila creo celdas nuevas. ¿cuantas? Tantas como clasificaciones tenga array
        for (let j = 0; j < array.length; j++) {
            // Creo una celda
            let celda = document.createElement('td');
            // Introduce contenido en la celda.
            celda.innerHTML = array[j];
            // Anida la celda dentro de la tr. celda es hijo de positionRow.
            positionRow.appendChild(celda);
        }
        // Fuera del Bucle J, pero dentro del bucle que hace las lineas. Abnido las filas dentro del tbody.
        tbody.appendChild(positionRow);
    }
}