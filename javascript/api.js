/* ALUMNO JUAN CAMPOS CURSO JAVASCRIPT COMISION 45360, 
<-------ENTREGA final------>

/* EL PROYECTO SE TRATA DE UN "FLY SHOP ONLINE", VENTA DE EQUIPOS DE PESCA CON MOSCA */

//API CLIMA CON GEOLOCALIZACION  si no te da la temperatura de Jamaica
//funciona bien 😄

function mostrarUbicacion(ubicacion) {
  let latitud = ubicacion.coords.latitude;
  let longitud = ubicacion.coords.longitude;
  console.log(latitud);
  console.log(longitud);

  let key = "3df7c066404d275aed6db32cf93b3563";

  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Jamaica&units=metric&lang=es&appid=" +
      key
  )
    .then((response) => response.json())
    .then((data) => {
      data.coord.lon = longitud;
      data.coord.lat = latitud;
      let clima = document.getElementById("clima");
      clima.innerHTML = `
             <div class="card-header">
             <h5 class="card-title">El clima actual</h5>
             </div>
             <div class="card-body">
             <p>Temperatura: ${data.main.temp}° Térrmica: ${data.main.feels_like}° </p>
             <p>Humedad: ${data.main.humidity}%</p>
             <p class="card-text">Nubosidad: ${data.weather[0].description}</p>
             </div>
              `;

      console.log(data);
    });
}

navigator.geolocation.getCurrentPosition(mostrarUbicacion);
