// reportes.js

function generarReportes() {
    const ordenes = getOrdenes(); // Usa la función de app.js
    const contenido = document.getElementById('reportes-contenido');

    const totalOrdenes = ordenes.length;
    const ordenesEntregadas = ordenes.filter(o => o.estado === "Entregado");
    const totalEntregadas = ordenesEntregadas.length;

    // Suma de costos de las órdenes entregadas:
    const totalIngresos = ordenesEntregadas.reduce((acc, o) => acc + parseFloat(o.costo), 0);

    // Agregar más métricas si se desea, por ejemplo:
    // - Órdenes en reparación
    // - Órdenes listas para entrega
    const ordenesEnReparacion = ordenes.filter(o => o.estado === "En Reparación").length;
    const ordenesListas = ordenes.filter(o => o.estado === "Listo para Entrega").length;

    contenido.innerHTML = `
        <div class="p-4 bg-gray-50 rounded shadow">
            <h3 class="text-lg font-semibold mb-2">Resumen General</h3>
            <p><strong>Total de Órdenes:</strong> ${totalOrdenes}</p>
            <p><strong>Órdenes Entregadas:</strong> ${totalEntregadas}</p>
            <p><strong>Órdenes en Reparación:</strong> ${ordenesEnReparacion}</p>
            <p><strong>Órdenes Listas para Entrega:</strong> ${ordenesListas}</p>
            <p><strong>Ingresos Estimados (Entregadas):</strong> $${totalIngresos.toFixed(2)}</p>
        </div>
    `;
}
