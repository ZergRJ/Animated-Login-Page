console.log("JS carregou");

function validarLogin() {
  const email = document.getElementById("email");
  const senha = document.getElementById("senha");

  let valido = true;

  // reset visual
  email.style.border = "";
  senha.style.border = "";

  // valida email
  if (!email.value.includes("@")) {
    email.style.border = "2px solid red";
    valido = false;
  }

  // valida senha
  if (senha.value.length < 8) {
    senha.style.border = "2px solid red";
    valido = false;
  }

  return valido;
}


// evento de login
function login(event) {    
  const valido = validarLogin();
  event.preventDefault(); // impede recarregar

  if (!valido) return;

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  console.log(email, senha);
}