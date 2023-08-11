const carrito = JSON.parse(localStorage.getItem("listaDeCompras"));
const carritoContainer = document.querySelector('#container');
let acumulador = "";

carrito.forEach((item) => {
    
    acumulador = acumulador + `
    <div class="itemcarrito">
        <div class="itemcarritofoto"><img src="${item.foto}" class="itemcarritofotofoto"></div>
        <div class="itemcarritotitulo">${item.nombre}</div>
        <div class="itemcarritoprecio">${item.precio}</div>
        <div class="sumaresta">
            <div class="itemcarritobotonmenos"><button class="botonmasmenos">-</button></div>
            <div class="itemcarritocantidad">0</div>
            <div class="itemcarritobotonmas"><button class="botonmasmenos">+</button></div>
        </div>
    </div>
    `;
})

carritoContainer.innerHTML = acumulador;