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

//PARA QUE EL LOADER DESAPAREZCA.
let loader = getElementById('loader');
window.addEventListener("load", function() {
    loader.classList.add('d-none');
})

// CREA LA TABLA DE CLASIFICACIÓN
function crearTablaClasificaciones(clasificaciones) {
    // COJO LA id DEL tbody PARA INDEXARLO MÁS ADELANTE.
    let tbody = document.getElementById('tbody');
    tbody.setAttribute("class", "tbody_clasificacion");

    // ITERO POR LOS EQUIPOS Y CREO UNA FILA
    for (let i = 0; i < clasificaciones.length; i++) {
        let positionRow = document.createElement('tr');

        // CREO UN ARRAY CON LOS DATOS QUE NECESITO MOSTRAR EN LA TABLA
        let array = [clasificaciones[i].position, `<img src="${clasificaciones[i].team.crestUrl}"/>`, clasificaciones[i].team.name, clasificaciones[i].playedGames, clasificaciones[i].won, clasificaciones[i].draw, clasificaciones[i].lost, clasificaciones[i].goalsFor, clasificaciones[i].goalsAgainst, clasificaciones[i].goalDifference, clasificaciones[i].points, clasificaciones[i].form];

        //  Por cada fila creo celdas nuevas. ¿cuantas? Tantas como clasificaciones tenga array
        // CREO 1 CELDA POR CADA ELEMENTO DEL ARRAY Y LE AGREGO EL CONTENIDO QUE CORRESPONDE.
        for (let j = 0; j < array.length; j++) {
            let celda = document.createElement('td');
            celda.innerHTML = array[j];
            // INDEXO LAS CELDAS A LAS FILAS EN EL BUCLE QUE CREA LAS CELDAS.
            positionRow.appendChild(celda);
        }

        // INDEXO LAS FILAS AL tbody EN EL BUCLE QUE CREA LAS FILAS.
        tbody.appendChild(positionRow);
    }
}