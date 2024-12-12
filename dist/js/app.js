// app.js

const VALID_USER = "admin";
const VALID_PASS = "1234";

/**
 * Maneja el login simulando una validación simple.
 * Asigna el rol y redirige a main.html si es válido.
 */
function loginHandler(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value; // "admin" o "tecnico"

    // Validación simple
    if (username === VALID_USER && password === VALID_PASS) {
        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("role", role);
        window.location.href = "main.html";
    } else {
        document.getElementById('login-error').textContent = "Usuario o contraseña incorrectos";
    }
}

/**
 * Cierra la sesión.
 */
function logoutHandler() {
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("role");
    window.location.href = "index.html";
}

/**
 * Verifica que el usuario esté autenticado.
 * Si no lo está, lo envía a la página de login.
 */
function checkAuth() {
    const loggedIn = sessionStorage.getItem("loggedIn");
    if (!loggedIn) {
        window.location.href = "index.html";
    }
}

/**
 * Muestra u oculta enlaces según el rol del usuario.
 */
function mostrarOpcionesRol() {
    const role = sessionStorage.getItem("role");
    if (!role) return;
    // Muestra opciones solo para admin
    if (role === "admin") {
        document.getElementById('link-inventario')?.classList.remove('hidden');
        document.getElementById('link-reportes')?.classList.remove('hidden');
    }
}

/**
 * Verifica el rol del usuario.
 * @param {string} requiredRole - Rol requerido ("admin" o "tecnico")
 * @returns {boolean} True si el rol del usuario coincide, de lo contrario false.
 */
function hasRole(requiredRole) {
    const role = sessionStorage.getItem("role");
    return role === requiredRole;
}

/**
 * Verifica el acceso a la página.
 * Por ejemplo, si la página es inventario o reportes, solo admin puede acceder.
 */
function checkPageAccess(page) {
    checkAuth(); // Primero verificar login
    if ((page === "inventario" || page === "reportes") && !hasRole("admin")) {
        // Si el usuario no es admin, redirige a main.html
        window.location.href = "main.html";
    }
}

/** 
 * Funciones CRUD de órdenes (igual que antes)
 */
function getOrdenes() {
    const ordenesStr = localStorage.getItem("ordenes");
    return ordenesStr ? JSON.parse(ordenesStr) : [];
}

function setOrdenes(ordenes) {
    localStorage.setItem("ordenes", JSON.stringify(ordenes));
}

/**
 * Crea una nueva orden.
 */
function crearOrdenHandler(e) {
    e.preventDefault();
    const cliente = document.getElementById('cliente').value;
    const equipo = document.getElementById('equipo').value;
    const falla = document.getElementById('falla').value;
    const costo = document.getElementById('costo').value;
    const fechaIngreso = document.getElementById('fechaIngreso').value;
    const piezas = document.getElementById('piezas').value;

    const ordenes = getOrdenes();
    const nuevaOrden = {
        id: Date.now(),
        cliente,
        equipo,
        falla,
        costo,
        fechaIngreso,
        piezas: piezas || "",
        estado: "En Reparación",
        comentarios: ""
    };

    ordenes.push(nuevaOrden);
    setOrdenes(ordenes);

    document.getElementById('mensaje-orden').textContent = "Orden guardada correctamente";
    document.getElementById('nueva-orden-form').reset();
}
