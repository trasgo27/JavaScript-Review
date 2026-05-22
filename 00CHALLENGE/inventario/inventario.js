const divLista = document.getElementById('divLista');
const divFiltro = document.getElementById('divFiltro');
const divStats = document.getElementById('divStats');
const btnAgregar = document.getElementById("btnAgregar");
const btnBuscar = document.getElementById('btnBuscar');
const inputProd = document.getElementById("inputProd");
const inputCat = document.getElementById("inputCat");
const inputPrecio = document.getElementById('inputPrecio');
const inputStock = document.getElementById('inputStock');
const inputBuscar = document.getElementById('inputBuscar');
const divBotones = document.getElementById('divBotones');

const inventario = [
  { producto: "Auriculares", categoria: "Electrónica", precio: 50, stock: 20 },
  { producto: "Zapatillas",   categoria: "Deportes",   precio: 80, stock: 12 },
  { producto: "Lámpara",      categoria: "Hogar",      precio: 30, stock: 0  },
  { producto: "Remera",       categoria: "Ropa",       precio: 25, stock: 8  },
  { producto: "Teclado",      categoria: "Electrónica", precio: 40, stock: 5  },
  { producto: "Mochila",      categoria: "Deportes",   precio: 60, stock: 0  },
  { producto: "Sartén",       categoria: "Hogar",      precio: 35, stock: 15 }
];

function stockColor(stock) {
  if (stock >= 20) return "green";
  if (stock >= 5)  return "orange";
  return "red";
}

function renderLista() {
  const ordenado = [...inventario].sort((a, b) => a.precio - b.precio);
  const html = ordenado.map((p, i) =>
    `<div>
      <span style="display:inline-block;width:120px"><strong>P: ${i+1}</strong> ${p.producto}</span>
      <span style="color:red;display:inline-block;width:120px">Precio: $${p.precio}</span>
      <span style="display:inline-block;width:120px">${p.categoria}</span>
      <span style="display:inline-block;width:120px;color:${stockColor(p.stock)};font-weight:bold">Stock: ${p.stock}</span>
    </div>`
  ).join("");
  divLista.innerHTML = "<h2>Inventario</h2>" + html;
}

function renderStats() {
  const categorias = [...new Set(inventario.map(p => p.categoria))];

  const total = inventario.reduce((acc, p) => acc + p.precio * p.stock, 0);

  const sinStock = inventario.filter(p => p.stock === 0);
  const listaSinStock = sinStock.length === 0
    ? "No hay vacíos..."
    : sinStock.map(p => p.producto).join(", ");

  divStats.innerHTML = `<strong>Estadísticas:</strong><br>
    Categorías disponibles: ${categorias.join(", ")}<br>
    Valor total del inventario: $${total}<br>
    Productos sin stock: ${listaSinStock}`;
}

function renderTodo() {
  renderLista();
  renderStats();
}

btnAgregar.addEventListener('click', () => {
  const prod = inputProd.value.trim();
  const cat = inputCat.value.trim();
  const prec = Number(inputPrecio.value);
  const stock = Number(inputStock.value);

  if (prod === "" || cat === "" || !(prec > 0) || !(stock >= 0)) {
    alert("Valores NO validos ...");
    return;
  }

  const existente = inventario.find(p =>
    p.producto.toLowerCase() === prod.toLowerCase()
  );

  if (existente) {
    const stockTotal = existente.stock + stock;
    if (stockTotal === 0) return;
    existente.precio = (existente.precio * existente.stock + prec * stock) / stockTotal;
    existente.stock = stockTotal;
  } else {
    inventario.push({ producto: prod, categoria: cat, precio: prec, stock: stock });
  }

  console.table(inventario);
  renderTodo();
});

divBotones.addEventListener("click", (e) => {
  const categoria = e.target.value;
  if (!categoria) return;

  const filtrados = inventario.filter(p => p.categoria === categoria);
  divFiltro.innerHTML = "<strong>Filtrados:</strong><br>" +
    filtrados.map((p, i) =>
      `${i + 1}. ${p.producto} — $${p.precio} (stock: ${p.stock})`
    ).join("<br>");
});

btnBuscar.addEventListener("click", () => {
  const nombre = inputBuscar.value.trim();
  if (nombre === "") {
    alert("Ingresá un producto para buscar");
    return;
  }

  const encontrado = inventario.find(p =>
    p.producto.toLowerCase() === nombre.toLowerCase()
  );

  if (encontrado) {
    divStats.innerHTML = `<strong>Estadísticas:</strong><br>
      Producto encontrado: ${encontrado.producto} — $${encontrado.precio} (stock: ${encontrado.stock})`;
  } else {
    divStats.innerHTML = `<strong>Estadísticas:</strong><br>
      Producto no encontrado`;
  }
});

renderTodo();
