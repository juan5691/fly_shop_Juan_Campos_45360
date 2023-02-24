/* ALUMNO JUAN CAMPOS CURSO JAVASCRIPT COMISION 45360, 
<-------ENTREGA final------>

/* EL PROYECTO SE TRATA DE UN "FLY SHOP ONLINE", VENTA DE EQUIPOS DE PESCA CON MOSCA */

// ARRAY DE OBJETOS ARTICULO
let productosCarrito = [];

function agregarCarrito(e) {
  //console.log ("Se hizo click", e.target);

  let hijo = e.target;
  let padre = hijo.parentNode;
  let abuelo = padre.parentNode;
  //console.log(padre);

  let nombre = padre.querySelector("h5").textContent;
  let precio = Number(padre.querySelector("span").textContent);
  let imagen = abuelo.querySelector("img").src;

  let articulo = {
    nombre: nombre,
    precio: precio,
    imagen: imagen,
    cantidad: 1,
  };

  //HICE ESTA FUNCION Y EL CONDICIONAL PARA QUE NO SE REPTAN LOS ARTICULOS PERO 🙁
  //A PESAR DE QUE FUNCIONA NO SE ACTUALIZA CORECTAMENTE EL RENDER
  // VOY A TENER QUE SEGUIR TRABAJANDO CON ESTA PARTE DEL CODIGO

  //SE BUSCA PRODUCTO EN EL ARRAY PARA VER SI ESTÁ DUPLICADO
  /* function ubicarRepetido(repetido){
  return repetido.nombre == articulo.nombre;
}
let resultadoRepetido = productosCarrito.find(ubicarRepetido);
let ubicado = productosCarrito.indexOf(resultadoRepetido)

if(resultadoRepetido){
   
  let cantidad = (productosCarrito[ubicado].cantidad);
   productosCarrito[ubicado].cantidad = cantidad + 1
   console.log(productosCarrito[ubicado].cantidad);

let precio =  (productosCarrito[ubicado].precio);
productosCarrito[ubicado].precio = productosCarrito[ubicado].cantidad * precio;

console.log(productosCarrito[ubicado].precio);
console.log(productosCarrito);
  
}else{
  productosCarrito.push(articulo);
} */
  // Y FINALMENTE LO DEJE ASI👇

  //SE PUSHEA AL ARRAY
  productosCarrito.push(articulo);

  // SE GUARDA EN LOCALSTORAGE

  let articuloJson = JSON.stringify(productosCarrito);
  localStorage.setItem("carrito", articuloJson);

  // SE RECUPERA CARRITO DE LOCALSTORAGE Y SE PARSEA EL ARCHIVO JSON A ARRAY

  let recuperarCarrito = localStorage.getItem("carrito");
  recuperarCarrito = JSON.parse(recuperarCarrito);

  //console.log(recuperarCarrito);

  //IMAGEN ICONO CARRITO Y CONTADOR
  let cantidad = recuperarCarrito.length;
  //console.log(cantidad);
  let verCarrito = document.getElementById("verCarrito");
  verCarrito.innerText = cantidad + "🛒";
  verCarrito.style.color = "rgb(39, 128, 28)";

  if (verCarrito != 0) {
    verCarrito.style.display = "block";
  } else {
    verCarrito.style.display = "none";
  }

  //FUNCION PARA SUMAR TOTAL DEL CARRITO

  function total(acu, producto) {
    acu = acu + producto.precio;
    return acu;
  }
  let totalCarrito = recuperarCarrito.reduce(total, 0);

  let sumaTotal = document.getElementById("total");
  sumaTotal.innerText = "$" + totalCarrito;

  //console.log(totalCarrito);

  //SE CREA UNA FILA VACIA PARA QUE CUANDO SE RECORRA EL ARRAY NO DUPLIQUE EL RENDER
  let fila = document.createElement("tr");
  fila.innerHTML = "";

  // SE RECORRE EL ARRAY Y SE RENDERIZAN LOS OBJETOS RECUPERADOS EN LA FILA QUE ESTA VIA

  for (let carrito of recuperarCarrito) {
    fila.innerHTML = ` <td><img src="${carrito.imagen}" class="img-thumbnail" width ="80" height ="80"></td> 
                       <td><span>${carrito.nombre}</span></td>
                        <td>${carrito.cantidad}</td>
                        <td>$${carrito.precio}</td>
                        <td><button type="button" class="btn btn-outline-success eliminar">Elimnar</button></td>
                        
    `;

    // SE CAPTURA EL NODO Y SE INSERTA EL CONTENIDO

    let tabla = document.getElementById("tbody");
    tabla.append(fila);

    // SE CAPTURA BOTON ELIMINAR SE GENERA EL EVENTO

    let botonEliminar = document.querySelectorAll(".eliminar");
    for (let boton of botonEliminar) {
      boton.addEventListener("click", eliminarArticulo);
    }
  }
}

// BOTON ELIMINAR

function eliminarArticulo(e) {
  let equipo = e.target.parentNode.parentNode;

  //SE IDENTIFICA EL NOMBRE DEL EQUIPO QUE SE ELIMINO DEL CARRITO
  nombreEquipo = equipo.querySelector("span").textContent;
  //console.log(nombreEquipo);

  // SE RECUPERA CARRITO DE LOCALSTORAGE SE PARSEA Y SE HACE UN FIND() CON EL NOMBRE DEL EQUIPO IDENTIFICADO
  let recuperarCarrito = localStorage.getItem("carrito");
  recuperarCarrito = JSON.parse(recuperarCarrito);
  //console.log(recuperarCarrito);

  function buscarEquipo(equipo) {
    return equipo.nombre == nombreEquipo;
  }

  let equipoEncontrado = recuperarCarrito.find(buscarEquipo);
  let indice = recuperarCarrito.indexOf(equipoEncontrado);
  //console.log(indice);
  recuperarCarrito.splice(indice, 1);
  //console.log(recuperarCarrito);
  //SE SOBREESCRIBE LOCALSTORAGE, ---NO PUDE ELIMINAR CON localStorage.removeItem()--
  let nuevoCarrito = JSON.stringify(recuperarCarrito);
  localStorage.setItem("carrito", nuevoCarrito);

  //VUELVO A HACER LO MISMO PARA EL ARRAY productos[] PARA QUE NO EMPIECE DE NUEVO EL CICLO
  //AL VOLVER A CLICKEAR UN PRODUCTO SIN ANTES REFRESCAR LA PAGINA, NO ME LO VUELVA A MANDAR AL LOCALSTORAGE

  function ubicarEquipo(equipoUbicado) {
    return equipoUbicado.nombre == nombreEquipo;
  }
  let equipoUbicacion = productosCarrito.find(ubicarEquipo);
  //console.log(equipoUbicacion);
  let indiceEquipo = productosCarrito.indexOf(equipoUbicacion);
  //console.log(indiceEquipo);
  productosCarrito.splice(indiceEquipo, 1);

  //let eliminar = JSON.stringify(equipoEncontrado);
  //localStorage.removeItem("carrito" , );
  //FUNCION PARA SUMAR TOTAL DEL CARRITO

  //SE VUELVE A CALCULAR EL TOTAL DEL CARRITO SUANDO SE ELIMINAN ARTICULOS
  function total(acu, producto) {
    acu = acu + producto.precio;
    return acu;
  }
  let totalCarrito = recuperarCarrito.reduce(total, 0);

  let sumaTotal = document.getElementById("total");
  sumaTotal.innerText = "$" + totalCarrito;

  //IMAGEN ICONO CARRITO Y CONTADOR CUANDO SE ELIMINA DEL CARRITO SE ACTUALIZA CONTADOR
  let cantidad = recuperarCarrito.length;
  console.log(cantidad);
  let verCarrito = document.getElementById("verCarrito");
  verCarrito.innerText = cantidad + "🛒";
  verCarrito.style.color = "rgb(39, 128, 28)";

  if (verCarrito != 0) {
    verCarrito.style.display = "block";
  } else {
    verCarrito.style.display = "none";
  }

  //SE ELIMINA DEL HTML
  e.target.parentNode.parentNode.remove();
}

//SE TRAE EL BOTON SE GENERA ENTO CLICK AGREGA AL CARRITO
let botonComprar = document.querySelectorAll(".botonComprar");
//SE RECORRE EL ARRAY DE BOTONES
for (let boton of botonComprar) {
  boton.addEventListener("click", agregarCarrito);

  //MOSTRAR CARRITO

  boton.addEventListener("click", mostrar);
  function mostrar() {
    let productosCarrito = document.getElementById("carrito");
    productosCarrito.style.display = "block";
  }
}

//FUNCION PARA MOSTRAR Y OCULTAR CARRITO👇 TAMBIEN SE MUESTRA AL CLICKEAR BOTON COMPRA

//OCULTAR CARRITO
let botonOcultar = document.getElementById("ocultarCarrito");
botonOcultar.addEventListener("click", ocultar);
function ocultar() {
  // console.log("boton escuchado")
  let productosCarrito = document.getElementById("carrito");
  productosCarrito.style.display = "none";
}

let verCarrito = document.getElementById("verCarrito");
verCarrito.addEventListener("click", mostrar);
function mostrar() {
  let productosCarrito = document.getElementById("carrito");
  productosCarrito.style.display = "block";
}

//FUNCION ASINCRONICA
function botonCheckout() {
  let botonCheckout = document.getElementById("checkout");
  if (botonCheckout.className == "btn btn-success eliminar") {
    botonCheckout.className = "btn btn-outline-success";
  } else {
    botonCheckout.className = "btn btn-success eliminar";
  }
}

let intervalo = setInterval(botonCheckout, 1500);

function proximamente() {
  Swal.fire({
    text: "Proximamente pasarela de pagos ⚡",
    icon: "success",
    background: "black",
    confirmButtonColor: "rgb(16, 56, 40)",
    color: "white",
  });
}

let checkout = document.getElementById("checkout");
checkout.addEventListener("click", proximamente);
