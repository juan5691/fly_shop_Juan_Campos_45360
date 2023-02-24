/* ALUMNO JUAN CAMPOS CURSO JAVASCRIPT COMISION 45360, 
<-------ENTREGA final------>

/* EL PROYECTO SE TRATA DE UN "FLY SHOP ONLINE", VENTA DE EQUIPOS DE PESCA CON MOSCA */


//LIBRERIA EMAILJS y SWEETALERT

const btn = document.getElementById("button");

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  btn.value = "Enviando...";

  const serviceID = "default_service";
  const templateID = "template_va1wqvc";

  emailjs.sendForm(serviceID, templateID, this).then(
    () => {
      btn.value = "Send Email";
      Swal.fire({
        text: "Correo enviado",
        icon: "success",
        background: "black",
        confirmButtonColor: "rgb(16, 56, 40)",
        color: "white",
      });
    },
    (err) => {
      btn.value = "Send Email";
      alert(JSON.stringify(err));
    }
  );
});
