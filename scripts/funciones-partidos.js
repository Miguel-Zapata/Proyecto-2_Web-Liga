/* Creo una variable para cada Tag que forma la tabla */
let table = document.createElement('table');
let thead = document.createElement('table');
let tbody = document.createElement('tbody');

/* Le digo que thead y tbody son hijos de table */
table.appendChild(thead)
table.appendChild(tbody)

/* Añado table al body. Localizando el body del HTML mediante id y diciendole que table es hijo de body con appendChild */
document.getElementById('body').appendChild(table);

/* Creo la primera fila de la tabla(tr), que serán los encabezados. Y le añado las distintas celdas(th) donde pongo el texto con innerHTML */
let fila1 = document.createElement('tr');
let encabezado1 = document.createElement('th');
encabezado1.innerHTML = "Equipo Local";
let encabezado2 = document.createElement('th');
encabezado2.innerHTML = "Resultados";
let encabezado3 = document.createElement('th');
encabezado3.innerHTML = "Equipo Visitante";
let encabezado4 = document.createElement('th');
encabezado4.innerHTML = "Fecha";
let encabezado5 = document.createElement('th');
encabezado5.innerHTML = "Estado";

/* Asigno los encabezados  como hijos de fila1 y fila1 como hijo de thead. Ambos con appendChild */
fila1.appendChild(encabezado1);
fila1.appendChild(encabezado2);
fila1.appendChild(encabezado3);
fila1.appendChild(encabezado4);
fila1.appendChild(encabezado5);
thead.appendChild(fila1);

for (let i = 0; i < data.matches.length; i++) {
    let filaExtra = document.createElement('tr');
    let celdaExtra1 = document.createElement('td');
    celdaExtra1.innerHTML = `${data.matches[i].homeTeam.name}`;
    let celdaExtra2 = document.createElement('td');
    celdaExtra2.innerHTML = `${data.matches[i].score.fullTime.homeTeam} - ${data.matches[i].score.fullTime.awayTeam}`;
    let celdaExtra3 = document.createElement('td');
    celdaExtra3.innerHTML = `${data.matches[i].awayTeam.name}`;
    let celdaExtra4 = document.createElement('td');
    celdaExtra4.innerHTML = `${data.matches[i].utcDate}`;
    let celdaExtra5 = document.createElement('td');
    celdaExtra5.innerHTML = `${data.matches[i].status}`;
    filaExtra.appendChild(celdaExtra1);
    filaExtra.appendChild(celdaExtra2);
    filaExtra.appendChild(celdaExtra3);
    filaExtra.appendChild(celdaExtra4);
    filaExtra.appendChild(celdaExtra5);
    tbody.appendChild(filaExtra);
}

function partidos() {
    /*  for (let i = 0; i < data.matches.length; i++) {
         console.log(data.matches[i].homeTeam.name);
         console.log(data.matches[i].score.fullTime.homeTeam);
         console.log(data.matches[i].awayTeam.name);
         console.log(data.matches[i].score.fullTime.awayTeam);
     } */
    console.log(data);
}
partidos();