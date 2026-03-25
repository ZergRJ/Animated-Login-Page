const form = document.getElementById("login-form");
const welcomeMessage = document.getElementById("welcome-message");
const logoutButton = document.getElementById("logout-btn");

window.onload = function () {
  const user = localStorage.getItem("user");

  if (welcomeMessage) {
    if (!user) {
      window.location.href = "index.html";
      return;
    }

    welcomeMessage.textContent = "Bem-vindo, " + user;
  } else if (user && form) {
    document.getElementById("email").value = user;
  }
};

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    const email = document.getElementById("email").value;

    localStorage.setItem("user", email);
    window.location.href = "dashboard.html";
  });
}

if (logoutButton) {
  logoutButton.addEventListener("click", logout);
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}
