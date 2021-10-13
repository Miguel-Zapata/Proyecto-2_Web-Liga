function crearTablaPosiciones(posiciones) {
    let tbody = document.getElementById('tbody');

    // Por cada equipo
    for (let i = 0; i < posiciones.length; i++) {
        // Creo una fila
        let positionRow = document.createElement('tr');
        // Creo un Array con datos nuevos que corresponden a la i de posiciones.length
        let array = [posiciones[i].position, `<img src="${posiciones[i].team.crestUrl}"/> ${posiciones[i].team.name}`, posiciones[i].playedGames, posiciones[i].won, posiciones[i].draw, posiciones[i].lost, posiciones[i].goalsFor, posiciones[i].goalsAgainst, posiciones[i].goalDifference, posiciones[i].points, posiciones[i].form];

        //  Por cada fila creo celdas nuevas. ¿cuantas? Tantas como posiciones tenga array
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
crearTablaPosiciones(data.standings[0].table);

console.log(data);