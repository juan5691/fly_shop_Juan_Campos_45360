/* ALUMNO JUAN CAMPOS CURSO JAVASCRIPT COMISION 45360, 
<-------ENTREGA final------>
EL PROYECTO SE TRATA DE UN "FLY SHOP ONLINE", VENTA DE EQUIPOS DE PESCA CON MOSCA */

let productosCarrito =  [];

function agregarCarrito(e) {
  let hijo = e.target;
  let padre = hijo.parentNode;
  let abuelo = padre.parentNode;
 
  let nombre = padre.querySelector("h5").textContent;
  let precio = Number(padre.querySelector("span").textContent);
  let unitario = Number(padre.querySelector("span").textContent);
  let imagen = abuelo.querySelector("img").src;

  let articulo = {
    nombre: nombre,
    precioUnitario: unitario ,
    precio: precio,
    imagen: imagen,
    cantidad: 1,
  };

//👉 DESCOMENTAR ESTA PARTE Y COMENTAR EL PUSH AL CARRITO PARA VER QUE PASA
// PRIMERO SE BUSCA PRODUCTO EN EL ARRAY PARA VER SI ESTÁ DUPLICADO DESPUES SE PUSHEA 
//FUNCIONA OK 
/* function ubicarRepetido(repetido){
return repetido.nombre == articulo.nombre;
}
let resultadoRepetido = productosCarrito.find(ubicarRepetido);
let ubicado = productosCarrito.indexOf(resultadoRepetido)
if(resultadoRepetido){
  productosCarrito[ubicado].cantidad = productosCarrito[ubicado].cantidad + 1;
  productosCarrito[ubicado].precio = productosCarrito[ubicado].cantidad * productosCarrito[ubicado].precioUnitario; 
  let limpiar = document.getElementById("filaCarrito");
  limpiar.remove();

 }else{
  productosCarrito.push(articulo);  
} */
 
productosCarrito.push(articulo);



// SE GUARDA EN LOCALSTORAGE
// SE GUARDA PERFECTO FUNCIONA OK
  let articuloJson = JSON.stringify(productosCarrito);
  localStorage.setItem("carrito", articuloJson);

// SE RECUPERA CARRITO DE LOCALSTORAGE Y SE PARSEA EL ARCHIVO JSON A ARRAY
// SE RECUPERA PERFECTO FUNCIONA OK
  let recuperarCarrito = localStorage.getItem("carrito");
  recuperarCarrito = JSON.parse(recuperarCarrito);

  
//IMAGEN ICONO CARRITO Y CONTADOR
//CUENTA CORRECTAMENTE FUCIONA OK
  let cantidad = recuperarCarrito.length;
  let verCarrito = document.getElementById("verCarrito");
  verCarrito.innerText = cantidad + "🛒";
  verCarrito.style.color = "rgb(39, 128, 28)";


  //FUNCION PARA SUMAR TOTAL DEL CARRITO
  //SUMA CORRECTO LO QUE ESTÁ EN LOCALSTORAGE
  function total(acu, producto) {
    acu = acu + producto.precio;
    return acu;
  }
  let totalCarrito = recuperarCarrito.reduce(total, 0);
  let sumaTotal = document.getElementById("total");
  sumaTotal.innerText = "$" + totalCarrito;
 

  // SE VUELVE A TRAER EL CARRITO DEL LOCAL STORAGE Y SE MUESTRAN DESDE AHÍ 
  // SE RECORRE EL ARRAY Y SE RENDERIZAN LOS OBJETOS RECUPERADOS 
  let traerCarrito = localStorage.getItem("carrito");
  traerCarrito = JSON.parse(traerCarrito);
  let fila = document.createElement("tr");
  fila.setAttribute("id", "filaCarrito");
  
  for (let carrito of traerCarrito) {
 
   fila.innerHTML = `<td class="carro"><img src="${carrito.imagen}" class="img-thumbnail" width ="80" height ="80"></td> 
                     <td class="carro"><span>${carrito.nombre}</span></td>
                     <td class="carro">${carrito.cantidad}</td>
                     <td class="carro">$${carrito.precio}</td>
                     <td class="carro"><button type="button" class="btn btn-outline-success eliminar">Elimnar</button></td>
    `;
    // 👉DEJE LOS CONSOLE.LOG PORQUE A VECES EL RENDER NO MUESTRA LO QUE VIENE DEL LOCAL STORAGE
    // 👉NO ENTIENDO CUAL ES EL PROBLEMA, ES LA MISMA ITERACION, EL CONSOLE.LOG MUESTRA 
    // LO QUE HAY EN LOCALSTORAGE CORRECTAMENTE PERO EN EL RENDER A VECES SE VE OTRA COSA
    console.log("Equipo N°" + carrito.nombre);
    console.log("Cantidad " + carrito.cantidad);
    console.log("Total $"+carrito.precio);
    console.log("Total compra "+ totalCarrito);
    console.log("<------>");
   
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

// SE RECUPERA CARRITO DE LOCALSTORAGE SE PARSEA Y SE HACE UN FIND() CON EL NOMBRE DEL EQUIPO IDENTIFICADO
  let recuperarCarrito = localStorage.getItem("carrito");
  recuperarCarrito = JSON.parse(recuperarCarrito);
  function buscarEquipo(equipo) {
    return equipo.nombre == nombreEquipo;
  }

  let equipoEncontrado = recuperarCarrito.find(buscarEquipo);
  let indice = recuperarCarrito.indexOf(equipoEncontrado);
  recuperarCarrito.splice(indice, 1);

  //SE SOBREESCRIBE LOCALSTORAGE, ---NO PUDE ELIMINAR CON localStorage.removeItem()--
  let nuevoCarrito = JSON.stringify(recuperarCarrito);
  localStorage.setItem("carrito", nuevoCarrito);

  //VUELVO A HACER LO MISMO PARA EL ARRAY productos[] PARA QUE NO EMPIECE DE NUEVO EL CICLO
  //AL VOLVER A CLICKEAR UN PRODUCTO SIN ANTES REFRESCAR LA PAGINA, NO ME LO VUELVA A MANDAR AL LOCALSTORAGE
  function ubicarEquipo(equipoUbicado) {
  return equipoUbicado.nombre == nombreEquipo;
  }
  let equipoUbicacion = productosCarrito.find(ubicarEquipo);
  let indiceEquipo = productosCarrito.indexOf(equipoUbicacion);
  productosCarrito.splice(indiceEquipo, 1);

  //SE VUELVE A CALCULAR EL TOTAL DEL CARRITO SUANDO SE ELIMINAN ARTICULOS
  //SUMA CORRECTAMENTE AUN CUANDO SE ELIMINAN ARTICULOS
  function total(acu, producto) {
    acu = acu + producto.precio;
    return acu;
  }
  let totalCarrito = recuperarCarrito.reduce(total, 0);
  let sumaTotal = document.getElementById("total");
  sumaTotal.innerText = "$" + totalCarrito;

 //IMAGEN ICONO CARRITO Y CONTADOR CUANDO SE ELIMINA DEL CARRITO SE ACTUALIZA CONTADOR
 // FUNCIONA OK CUENTA LA CANTIDAD DE ARTICULOS, NO DE UNIDADES 
 let cantidad = recuperarCarrito.length;
 let verCarrito = document.getElementById("verCarrito");
 verCarrito.innerText =`${cantidad} 🛒`;
 verCarrito.style.color = "rgb(39, 128, 28)";
 //SE ELIMINA DEL HTML
  e.target.parentNode.parentNode.remove();
}


//SE TRAE EL BOTON SE GENERA EVENTO CLICK AGREGA AL CARRITO
let botonComprar = document.querySelectorAll(".botonComprar");
//SE RECORRE EL ARRAY DE BOTONES
for (let boton of botonComprar) {
boton.addEventListener("click", agregarCarrito);

//MOSTRAR CARRITO
//FUNCIONA OK SE MUESTRA AL COMPRAR
boton.addEventListener("click", mostrar);
function mostrar() {

  let productosCarrito = document.getElementById("carrito");
  productosCarrito.style.display = "block";
  }
}

//OCULTAR CARRITO
//FUNCIONA OK
let botonOcultar = document.getElementById("ocultarCarrito");
botonOcultar.addEventListener("click", ocultar);
function ocultar() {
let productosCarrito = document.getElementById("carrito");
productosCarrito.style.display = "none";
let limpiar = document.getElementById("filaCarrito");
limpiar.remove();
}
let verCarrito = document.getElementById("verCarrito");
verCarrito.addEventListener("click", mostrar);

// FUNCION MOSTRAR CLICK EN ICONO CARRITO
function mostrar() {
  let traerCarrito = localStorage.getItem("carrito");
  traerCarrito = JSON.parse(traerCarrito);
  let fila = document.createElement("tr");
  fila.setAttribute("id", "filaCarrito");
  
  for (let carrito of traerCarrito) {
 
   fila.innerHTML = `<td class="carro"><img src="${carrito.imagen}" class="img-thumbnail" width ="80" height ="80"></td> 
                     <td class="carro"><span>${carrito.nombre}</span></td>
                     <td class="carro">${carrito.cantidad}</td>
                     <td class="carro">$${carrito.precio}</td>
                     <td class="carro"><button type="button" class="btn btn-outline-success eliminar">Elimnar</button></td>
    `;
    // 👉DEJE LOS CONSOLE.LOG PORQUE A VECES EL RENDER NO MUESTRA LO QUE VIENE DEL LOCAL STORAGE
    // 👉NO ENTIENDO CUAL ES EL PROBLEMA, ES LA MISMA ITERACION, EL CONSOLE.LOG MUESTRA 
    // LO QUE HAY EN LOCALSTORAGE CORRECTAMENTE PERO EN EL RENDER A VECES SE VE OTRA COSA
    console.log("Equipo N°" + carrito.nombre);
    console.log("Cantidad " + carrito.cantidad);
    console.log("Total $"+carrito.precio);
    console.log("Total compra "+ totalCarrito);
    console.log("<------>");
   
    // SE CAPTURA EL NODO Y SE INSERTA EL CONTENIDO
    let tabla = document.getElementById("tbody");
    tabla.append(fila);
    // SE CAPTURA BOTON ELIMINAR SE GENERA EL EVENTO
    let botonEliminar = document.querySelectorAll(".eliminar");
    for (let boton of botonEliminar) {
    boton.addEventListener("click", eliminarArticulo);
    }
  }
 /*  let productosCarrito = document.getElementById("carrito");
  productosCarrito.style.display = "block"; */
}

//FUNCION ASINCRONICA
//FUNCIONA OK ENCIENDE INTERMITENTE BOTON CHECKOUT
function botonCheckout() {
  let botonCheckout = document.getElementById("checkout");
  if (botonCheckout.className == "btn btn-success eliminar") {
    botonCheckout.className = "btn btn-outline-success";
  } else {
    botonCheckout.className = "btn btn-success eliminar";
  }
}
let intervalo = setInterval(botonCheckout, 1500);

//FINALIZACION DE LA COMPRA
function listado(){
  let traerCarrito = localStorage.getItem("carrito");
  traerCarrito = JSON.parse(traerCarrito);
  function totalCarrito(acu, producto) {
    acu = acu + producto.precio;
    return acu;
  }
  let total = traerCarrito.reduce(totalCarrito, 0);
  let totalCompra = document.getElementById("totalCompra");
  totalCompra.innerText= "Total de su compra es de:  $" + total;

  for (let sku of traerCarrito){
    let listar = document.createElement("ul"); 
    listar.innerHTML=`  
    <li>Articulo: ${sku.nombre}</li>
    <li>Cantidad: ${sku.cantidad}</li>
    <li>Precio unitario: ${sku.precioUnitario}</li>
    <br>
    `
    let agregarListado = document.getElementById("listado");
    agregarListado.append(listar);
  }
}
let compra = document.getElementById("checkout");
compra.addEventListener("click" , listado);

function ocultar() {
let productosCarrito = document.getElementById("carrito");
productosCarrito.style.display = "none";
}
let desaparecer = document.getElementById("checkout");
desaparecer.addEventListener("click" , ocultar);

function mostrarFinalizar(){
let finalizar = document.getElementById("finalizacion");
finalizar.style.display="block"
}

let finalizaCompra = document.getElementById("checkout");
finalizaCompra.addEventListener("click" , mostrarFinalizar);

function adios(){
localStorage.removeItem("carrito");
location.href="index.html";
}
let fin = document.getElementById("ok");
fin.addEventListener("click", adios);