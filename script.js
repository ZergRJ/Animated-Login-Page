const themeToggle = document.getElementById("theme-toggle");
const logoutButton = document.getElementById("logout-btn");
const welcomeMessage = document.getElementById("welcome-message");

const pageForms = {
  login: document.getElementById("login-form"),
  register: document.getElementById("register-form"),
  recover: document.getElementById("recover-form"),
};

const THEME_STORAGE_KEY = "theme";
const USER_STORAGE_KEY = "user";
const LIGHT_THEME = "light";
const DARK_THEME = "dark";

initializePage();

function initializePage() {
  applySavedTheme();
  bindThemeToggle();
  hydrateCurrentPage();
  bindFormHandlers();
  bindLogout();
}

function bindThemeToggle() {
  if (!themeToggle) {
    return;
  }

  themeToggle.addEventListener("click", toggleTheme);
  updateThemeToggleLabel(document.body.dataset.theme || LIGHT_THEME);
}

function hydrateCurrentPage() {
  const currentPage = document.body.dataset.page;
  const savedUser = localStorage.getItem(USER_STORAGE_KEY);

  if (currentPage === "dashboard") {
    if (!savedUser) {
      window.location.href = "index.html";
      return;
    }

    if (welcomeMessage) {
      welcomeMessage.textContent = `Bem-vindo, ${savedUser}`;
    }

    return;
  }

  if (!savedUser) {
    return;
  }

  prefillField("email", savedUser);
  prefillField("register-email", savedUser);
  prefillField("recover-email", savedUser);
}

function bindFormHandlers() {
  const loginForm = pageForms.login;
  const registerForm = pageForms.register;
  const recoverForm = pageForms.recover;

  if (loginForm) {
    loginForm.addEventListener("submit", handleLoginSubmit);
  }

  if (registerForm) {
    registerForm.addEventListener("submit", handleRegisterSubmit);
  }

  if (recoverForm) {
    recoverForm.addEventListener("submit", handleRecoverSubmit);
  }
}

function handleLoginSubmit(event) {
  event.preventDefault();

  const form = pageForms.login;
  if (!form || !form.reportValidity()) {
    return;
  }

  const email = document.getElementById("email").value.trim();
  persistUser(email);
  window.location.href = "dashboard.html";
}

function handleRegisterSubmit(event) {
  event.preventDefault();

  const form = pageForms.register;
  if (!form || !form.reportValidity()) {
    return;
  }

  const password = document.getElementById("register-password").value;
  const confirmPassword = document.getElementById("register-confirm-password").value;

  if (password !== confirmPassword) {
    alert("As senhas precisam ser iguais.");
    return;
  }

  const email = document.getElementById("register-email").value.trim();
  persistUser(email);
  window.location.href = "dashboard.html";
}

function handleRecoverSubmit(event) {
  event.preventDefault();

  const form = pageForms.recover;
  if (!form || !form.reportValidity()) {
    return;
  }

  const email = document.getElementById("recover-email").value.trim();
  alert(`Link de recuperacao enviado para ${email}.`);
  window.location.href = "index.html";
}

function bindLogout() {
  if (!logoutButton) {
    return;
  }

  logoutButton.addEventListener("click", () => {
    localStorage.removeItem(USER_STORAGE_KEY);
    window.location.href = "index.html";
  });
}

function persistUser(email) {
  localStorage.setItem(USER_STORAGE_KEY, email);
}

function prefillField(fieldId, value) {
  const field = document.getElementById(fieldId);
  if (field) {
    field.value = value;
  }
}

function applySavedTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || LIGHT_THEME;
  document.body.dataset.theme = savedTheme;
}

function toggleTheme() {
  const currentTheme = document.body.dataset.theme || LIGHT_THEME;
  const nextTheme = currentTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;

  document.body.dataset.theme = nextTheme;
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  updateThemeToggleLabel(nextTheme);
}

function updateThemeToggleLabel(theme) {
  if (!themeToggle) {
    return;
  }

  themeToggle.textContent = theme === DARK_THEME ? "Tema claro" : "Tema escuro";
}
