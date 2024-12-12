// detalle.js

function cargarDetalleOrden() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const ordenes = getOrdenes();
    const orden = ordenes.find(o => o.id === id);

    const contenedor = document.getElementById('detalle-contenido');

    if (!orden) {
        contenedor.innerHTML = "<div class='text-red-500'>Orden no encontrada</div>";
        document.getElementById('guardar-detalle').style.display = 'none';
        document.getElementById('factura-btn').style.display = 'none';
        return;
    }

    // Si no es admin y la orden está entregada, restringir la edición (ejemplo de RBAC más detallado)
    const role = sessionStorage.getItem('role');
    const isEditable = !(orden.estado === "Entregado" && role !== "admin");

    contenedor.innerHTML = `
        <div class="mb-3">
            <strong>ID:</strong> ${orden.id}
        </div>
        <div class="mb-3">
            <strong>Cliente:</strong>
            <input type="text" id="detalle-cliente" class="border p-2 w-full" value="${orden.cliente}" ${isEditable ? '' : 'disabled'}>
        </div>
        <div class="mb-3">
            <strong>Equipo:</strong>
            <input type="text" id="detalle-equipo" class="border p-2 w-full" value="${orden.equipo}" ${isEditable ? '' : 'disabled'}>
        </div>
        <div class="mb-3">
            <strong>Falla:</strong>
            <textarea id="detalle-falla" class="border p-2 w-full" ${isEditable ? '' : 'disabled'}>${orden.falla}</textarea>
        </div>
        <div class="mb-3">
            <strong>Costo Estimado:</strong>
            <input type="number" id="detalle-costo" class="border p-2 w-full" value="${orden.costo}" ${isEditable ? '' : 'disabled'}>
        </div>
        <div class="mb-3">
            <strong>Fecha Ingreso:</strong>
            <input type="date" id="detalle-fechaIngreso" class="border p-2 w-full" value="${orden.fechaIngreso}" ${isEditable ? '' : 'disabled'}>
        </div>
        <div class="mb-3">
            <strong>Estado:</strong>
            <select id="detalle-estado" class="border p-2 w-full" ${isEditable ? '' : 'disabled'}>
                <option value="En Reparación" ${orden.estado === "En Reparación" ? "selected" : ""}>En Reparación</option>
                <option value="Listo para Entrega" ${orden.estado === "Listo para Entrega" ? "selected" : ""}>Listo para Entrega</option>
                <option value="Entregado" ${orden.estado === "Entregado" ? "selected" : ""}>Entregado</option>
            </select>
        </div>
        <div class="mb-3">
            <strong>Comentarios:</strong>
            <textarea id="detalle-comentarios" class="border p-2 w-full" ${isEditable ? '' : 'disabled'}>${orden.comentarios || ""}</textarea>
        </div>
    `;

    // Si no es editable, deshabilitar el botón guardar
    if (!isEditable) {
        document.getElementById('guardar-detalle').disabled = true;
        document.getElementById('guardar-detalle').classList.add('opacity-50', 'cursor-not-allowed');
    }

    document.getElementById('guardar-detalle').addEventListener('click', () => guardarDetalleOrden(id));
    document.getElementById('factura-btn').addEventListener('click', () => generarFacturaPDF(orden));
}

function guardarDetalleOrden(id) {
    const ordenes = getOrdenes();
    const idx = ordenes.findIndex(o => o.id === id);
    if (idx === -1) return;

    ordenes[idx].cliente = document.getElementById('detalle-cliente').value;
    ordenes[idx].equipo = document.getElementById('detalle-equipo').value;
    ordenes[idx].falla = document.getElementById('detalle-falla').value;
    ordenes[idx].costo = document.getElementById('detalle-costo').value;
    ordenes[idx].fechaIngreso = document.getElementById('detalle-fechaIngreso').value;
    ordenes[idx].estado = document.getElementById('detalle-estado').value;
    ordenes[idx].comentarios = document.getElementById('detalle-comentarios').value;

    setOrdenes(ordenes);
    alert("Cambios guardados correctamente.");
    window.location.href = "listado.html";
}

/**
 * Genera una factura en PDF usando jsPDF.
 * Datos mínimos: ID de la orden, Cliente, Equipo, Costo, Fecha, Estado.
 */
function generarFacturaPDF(orden) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Factura - Taller de Reparaciones", 10, 10);

    doc.setFontSize(12);
    doc.text(`ID Orden: ${orden.id}`, 10, 30);
    doc.text(`Cliente: ${orden.cliente}`, 10, 40);
    doc.text(`Equipo: ${orden.equipo}`, 10, 50);
    doc.text(`Falla: ${orden.falla}`, 10, 60);
    doc.text(`Costo: $${orden.costo}`, 10, 70);
    doc.text(`Fecha Ingreso: ${orden.fechaIngreso}`, 10, 80);
    doc.text(`Estado: ${orden.estado}`, 10, 90);

    doc.text("Comentarios:", 10, 100);
    doc.text(orden.comentarios || "", 10, 110);

    doc.save(`Factura_Orden_${orden.id}.pdf`);
}
