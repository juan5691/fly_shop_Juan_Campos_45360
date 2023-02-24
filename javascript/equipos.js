/* ALUMNO JUAN CAMPOS CURSO JAVASCRIPT COMISION 45360, 
<-------ENTREGA final------>

/* EL PROYECTO SE TRATA DE UN "FLY SHOP ONLINE", VENTA DE EQUIPOS DE PESCA CON MOSCA */

//<---- SE CREA UNA CLASE CON UN OBJETO Y METODOS PARA LOS COMBOS DE EQUIPOS DE PESCA---->
class Equipo {
  constructor(imagen, numero, rodMarca, rodNumero, reel, linea, precio) {
    this.imagen = imagen;
    this.numero = numero;
    this.rodMarca = rodMarca;
    this.rodNumero = rodNumero;
    this.reel = reel;
    this.linea = linea;
    this.precio = precio;
  }
  //<---METODO PARA CAMBIOS DE PRECIO LOS EQUIPOS --->
  cambioDePrecio(precio) {
    if (typeof precio == "number") {
      this.precio = precio;
    }
  }
}
/* DESDE ACA SE CREAN LOS DISTINTOS EQUIPOS CON SUS DATOS 
  LOS PRECIOS ESTAN EN CERO SE PODRAN CARGAR DESDE EL PROGRAMA O PROBABLEMENTE DESDE UN BACKEND */

let equipo1 = new Equipo(
  "img/equipos/equipo1.jpg",
  1,
  "Sage",
  "#5",
  "Ross",
  "Cortland 444",
  900
);
let equipo2 = new Equipo(
  "img/equipos/equipo2.jpg",
  2,
  "Orvis",
  "#7",
  "Orvis Cahil",
  "Orvis Clearwater",
  995
);
let equipo3 = new Equipo(
  "img/equipos/equipo3.jpg",
  3,
  "Gloomis",
  "#4",
  "STH MR Pop",
  "Scientific Anglers",
  1035
);
let equipo4 = new Equipo(
  "img/equipos/equipo4.jpg",
  4,
  "Winston",
  "#6",
  "Ross",
  "Rio",
  900
);
let equipo5 = new Equipo(
  "img/equipos/equipo2.jpg",
  5,
  "Gray Gull",
  "#4",
  "Orvis Cahil",
  "Rio",
  1100
);
let equipo6 = new Equipo(
  "img/equipos/equipo3.jpg",
  6,
  "House of Hardy",
  "#5",
  "STH MR Pop",
  "Scientific Anglers",
  1300
);

//SE CREA ARRAY DE OBJETOS

let equipos = [equipo1, equipo2, equipo3, equipo4, equipo5, equipo6];

//SE CREA NODO Y SE AGREGA UNA CLASE DE BOOTSTRAP

const row = document.createElement("div");
row.classList.add("row");

// SE ITERA EL ARRAY Y SE CREA CONTENIDO CON BOOTSTRAP PARA EL NODO QUE SE CREO

for (let articulos of equipos) {
  let insertar = document.createElement("div");
  insertar.classList.add("col"); //SE AGREGA CLASE "col" DE BOOTSTRAP AL INNERHTML

  insertar.innerHTML = `<div class="card" style="width: 18rem;">
	  
    <img src=${articulos.imagen} class="card-img-top" alt="...">
	  <div class="card-body">
	  <h5 class="card-title"Titulo>Equipo N ${articulos.numero}</h5>
	  <p> Caña marca ${articulos.rodMarca}<br>
	  Caña ${articulos.rodNumero} <br>
	  Reel marca ${articulos.reel}<br>
	  Línea marca ${articulos.linea}</p>
    <span class="precio">${articulos.precio}</span><br><br>
	  <button type="button" class="btn btn-success botonComprar">Comprar</button>
	  </div>
	  </div>
    <br>`;
  row.appendChild(insertar);
}
//SE INSERTA

let contenedor = document.getElementById("contenedor");
contenedor.append(row);
