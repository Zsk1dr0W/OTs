// inventario.js

function getPiezas() {
    const piezasStr = localStorage.getItem("piezas");
    return piezasStr ? JSON.parse(piezasStr) : [];
}

function setPiezas(piezas) {
    localStorage.setItem("piezas", JSON.stringify(piezas));
}

function agregarPiezaHandler(e) {
    e.preventDefault();
    const nombre = document.getElementById('pieza-nombre').value;
    const stock = parseInt(document.getElementById('pieza-stock').value);
    const precio = parseFloat(document.getElementById('pieza-precio').value) || 0;

    const piezas = getPiezas();
    const nuevaPieza = {
        id: Date.now(),
        nombre,
        stock,
        precio
    };
    piezas.push(nuevaPieza);
    setPiezas(piezas);

    document.getElementById('inventario-form').reset();
    cargarInventario();
}

function cargarInventario() {
    const piezas = getPiezas();
    const tbody = document.getElementById('inventario-tbody');
    tbody.innerHTML = "";

    piezas.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="border p-2">${p.id}</td>
            <td class="border p-2">${p.nombre}</td>
            <td class="border p-2">${p.stock}</td>
            <td class="border p-2">${p.precio.toFixed(2)}</td>
            <td class="border p-2">
                <button class="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded mr-2" onclick="editarPieza(${p.id})">Editar</button>
                <button class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded" onclick="eliminarPieza(${p.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function editarPieza(id) {
    const piezas = getPiezas();
    const pieza = piezas.find(p => p.id === id);
    if (!pieza) return;

    const nombreNuevo = prompt("Nuevo nombre de la pieza:", pieza.nombre);
    if (nombreNuevo === null) return;
    const stockNuevo = parseInt(prompt("Nuevo stock:", pieza.stock));
    if (isNaN(stockNuevo)) return;
    const precioNuevo = parseFloat(prompt("Nuevo precio:", pieza.precio));
    if (isNaN(precioNuevo)) return;

    pieza.nombre = nombreNuevo;
    pieza.stock = stockNuevo;
    pieza.precio = precioNuevo;

    setPiezas(piezas);
    cargarInventario();
}

function eliminarPieza(id) {
    const piezas = getPiezas();
    const nuevasPiezas = piezas.filter(p => p.id !== id);
    setPiezas(nuevasPiezas);
    cargarInventario();
}
