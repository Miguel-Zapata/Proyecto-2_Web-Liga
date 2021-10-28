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

    let loader = document.getElementById('loader');
    loader.classList.add('d-none');
}

// CREA LA TABLA DE CLASIFICACIÓN
function crearTablaClasificaciones(clasificaciones) {
    let tbody = document.getElementById('tbody');
    tbody.setAttribute("class", "tbody_clasificacion");

    for (let i = 0; i < clasificaciones.length; i++) {
        let positionRow = document.createElement('tr');
        let array = [clasificaciones[i].position, `<img src="${clasificaciones[i].team.crestUrl}"/>`, clasificaciones[i].team.name, clasificaciones[i].playedGames, clasificaciones[i].won, clasificaciones[i].draw, clasificaciones[i].lost, clasificaciones[i].goalsFor, clasificaciones[i].goalsAgainst, clasificaciones[i].goalDifference, clasificaciones[i].points, clasificaciones[i].form];

        for (let j = 0; j < array.length; j++) {
            let celda = document.createElement('td');
            celda.innerHTML = array[j];

            positionRow.appendChild(celda);
        }
        tbody.appendChild(positionRow);
    }
}