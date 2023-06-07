const lanzamientosList = document.getElementById('lanzamientosList');
const lanzamientoPseudoBtn = document.getElementById('lanzamientoPseudoBtn');
const lanzamientoRandomBtn = document.getElementById('lanzamientoRandomBtn');
const numLanzamientosInput = document.getElementById('numLanzamientos');
const resultados = [];

lanzamientoPseudoBtn.addEventListener('click', lanzarDadoPseudoaleatorio);
lanzamientoRandomBtn.addEventListener('click', lanzarDadoAleatorio);

function lanzarDadoPseudoaleatorio() {
  const numLanzamientos = parseInt(numLanzamientosInput.value);
  lanzarNDadosPseudoaleatorios(numLanzamientos);
  mostrarLanzamientos();
}

function lanzarDadoAleatorio() {
  const numLanzamientos = parseInt(numLanzamientosInput.value);
  lanzarNDadosAleatorios(numLanzamientos);
  mostrarLanzamientos();
}

function lanzarNDadosPseudoaleatorios(n) {
  for (let i = 0; i < n; i++) {
    const resultado = Math.floor(Math.random() * 6) + 1;
    resultados.push(resultado);
  }
}

function lanzarNDadosAleatorios(n) {
  const lanzamientosPosibles = [1, 2, 3, 4, 5, 6];
  for (let i = 0; i < n; i++) {
    const indiceAleatorio = Math.floor(Math.random() * lanzamientosPosibles.length);
    const resultado = lanzamientosPosibles[indiceAleatorio];
    resultados.push(resultado);
  }
}

function mostrarLanzamientos() {
  const lanzamientosTable = document.getElementById('lanzamientosTable');
  const lanzamientosList = document.getElementById('lanzamientosList');
  lanzamientosList.innerHTML = '';

  resultados.forEach((resultado, index) => {
    const lanzamientoRow = document.createElement('tr');

    const lanzamientoNumberCell = document.createElement('td');
    lanzamientoNumberCell.textContent = index + 1;
    lanzamientoRow.appendChild(lanzamientoNumberCell);

    const lanzamientoResultCell = document.createElement('td');
    lanzamientoResultCell.textContent = resultado;
    lanzamientoRow.appendChild(lanzamientoResultCell);

    const lanzamientoImageCell = document.createElement('td');
    const imagenDado = document.createElement('img');
    imagenDado.src = `./imagenes/dado${resultado}.png`;
    imagenDado.alt = `./imagenes/Dado ${resultado}`;
    imagenDado.width = 50;
    imagenDado.height = 50;
    lanzamientoImageCell.appendChild(imagenDado);
    lanzamientoRow.appendChild(lanzamientoImageCell);

    lanzamientosList.appendChild(lanzamientoRow);
  });
}

const descargarBtn = document.getElementById('descargarBtn');
descargarBtn.addEventListener('click', descargarResultados);

function descargarResultados() {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.table_to_sheet(document.getElementById('lanzamientosTable'));
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Resultados');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'resultados.xlsx');
  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

const limpiarBtn = document.getElementById('limpiarBtn');
limpiarBtn.addEventListener('click', limpiarResultados);

function limpiarResultados() {
  resultados.length = 0;
  mostrarLanzamientos();
}
