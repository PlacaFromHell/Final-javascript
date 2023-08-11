async function fetching() {
    try {
      const response = await fetch('productos.json');
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      const jsonData = await response.json();
      console.log(jsonData);
      return jsonData;
    } catch (error) {
      console.error('Ocurrió un error:', error);
    }
  }
  
async function prerenderizar() {
    let acumulador = "";
    const productos = await fetching();
    
    productos.forEach((producto) => {
        const paquete = encodeURIComponent(JSON.stringify(producto));
        acumulador = acumulador + `
        <div class="item">
            <div class="fotoitem"><img src="${producto.foto}" class="fotofotoitem"></div>
            <div class="tituloitem">${producto.nombre}</div>
            <div class="precioitem">$${producto.precio}</div>
            <div class="compraritem"><button class="compraritemboton" onclick="carrito('${paquete}')">AGREGAR</button></div>
        </div>
        `;
    })
    console.log(acumulador)
    return acumulador;
}

async function renderizar() {
    const productosOutput= document.querySelector('#container');
    productosOutput.innerHTML = await prerenderizar();
}

//==============================================// LO DE ARRIBA ES TODO RENDER //==============================================//

function carrito(producto) {
    const decoder = JSON.parse(decodeURIComponent(producto)); //Este choclo me permite recibir el objeto entero
    const storage = localStorage.getItem("listaDeCompras");
    let acumularProductos = new Array();
    if (storage != null) {
        acumularProductos = JSON.parse(localStorage.getItem("listaDeCompras"));
        acumularProductos.push(new Paraguayo(decoder.nombre, decoder.foto, decoder.precio));
        localStorage.setItem("listaDeCompras", JSON.stringify(acumularProductos));
    }
    else {
        localStorage.setItem("listaDeCompras", JSON.stringify([decoder]));
    }
}

function Paraguayo(nombre, foto, precio) {
    this.nombre = nombre;
    this.foto = foto;
    this.precio = precio;
  }


renderizar();


