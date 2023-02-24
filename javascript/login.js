/* ALUMNO JUAN CAMPOS CURSO JAVASCRIPT COMISION 45360, 
<-------ENTREGA final------>

/* EL PROYECTO SE TRATA DE UN "FLY SHOP ONLINE", VENTA DE EQUIPOS DE PESCA CON MOSCA */

// <----REGISTRO DE USUARIOS---->

// FUNCION MANEJADORA DE EVENTO PARA RERGISTRO DE USUARIOS"EVENT HANDLER"

//SE DECLARA ARRAY VACIO
let arregloUsuarios = [];

function set_data() {
  let nombre = document.getElementById("nombre"); //CAPTURAR NOMBRE Y PASSWORD
  let clave = document.getElementById("pass");

  let usuario = { nombre: nombre.value, password: clave.value }; //SE PUSHEA AL OBJETO ARRAY DE OBJETOS LITERAL
  arregloUsuarios.push(usuario);

  let usuarioJSON = JSON.stringify(arregloUsuarios); //PASAR A JSON, GUARDAR EN LOCALSTORAGE
  localStorage.setItem("arreglo_usuarios", usuarioJSON);

  let recuperarUsuarios = localStorage.getItem("arreglo_usuarios"); //SE RECUPERA DE LOCAL STORAGE
  console.log(recuperarUsuarios);
}

// FUNCION MANEJADORA DE EVENTO PARA INGRESO DE USUARIOS"EVENT HANDLER"

function login_usuario() {
  let nombre = document.getElementById("nombre"); //CAPTURAR NOMBRE Y PASSWORD
  let clave = document.getElementById("pass");

  let recuperarUsuarios = localStorage.getItem("arreglo_usuarios"); //SE RECUPERA DE LOCAL STORAGE
  recuperarUsuarios = JSON.parse(recuperarUsuarios);

  console.log(recuperarUsuarios);

  //SE RECORRE EL ARREGLO PARA VER SI EL USUARIO ESTA REGISTRADO
  for (let usuario of recuperarUsuarios) {
    if (nombre.value == usuario.nombre && clave.value == usuario.password) {
      let noEncontrado = document.getElementById("noEncontrado");
      noEncontrado.innerHTML = "Bienvenido!";
      noEncontrado.addEventListener("mousemove", function () {
        location.href = "index.html";
      });
    } else {
      let noEncontrado = document.getElementById("noEncontrado");
      noEncontrado.innerHTML = "Usuario no encontrado";
    }
  }
}

let btn8_registro = document.getElementById("btn_registro");
btn_registro.addEventListener("click", set_data);

function mensaje() {
  let noEncontrado = document.getElementById("noEncontrado");
  noEncontrado.innerHTML = "Ya te registraste podes ingresar";
}
btn_registro.addEventListener("click", mensaje);

let btn_login = document.getElementById("btn_login");
btn_login.addEventListener("click", login_usuario);
