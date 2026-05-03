const passwordInput = document.getElementById("password");
const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("length-value");
const uppercaseInput = document.getElementById("uppercase");
const numbersInput = document.getElementById("numbers");
const symbolsInput = document.getElementById("symbols");
const generateButton = document.getElementById("generate");
const copyButton = document.getElementById("copy");
const message = document.getElementById("message");
const successVisual = document.getElementById("success-visual");

const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "!@#$%&*?";

lengthInput.addEventListener("input", () => {
  lengthValue.textContent = lengthInput.value;
});

function showMessage(text, type = "normal") {
  message.textContent = text;

  if (type === "error") {
    message.style.color = "#fda4af";
  } else if (type === "success") {
    message.style.color = "#86efac";
  } else {
    message.style.color = "#d9cbf7";
  }
}

function showSuccessVisual() {
  successVisual.classList.remove("hidden");
}

function hideSuccessVisual() {
  successVisual.classList.add("hidden");
}

function generatePassword() {
  let chars = lowercaseChars;

  if (uppercaseInput.checked) chars += uppercaseChars;
  if (numbersInput.checked) chars += numberChars;
  if (symbolsInput.checked) chars += symbolChars;

  if (!chars) {
    hideSuccessVisual();
    showMessage("Selecione ao menos uma opção para gerar a senha.", "error");
    passwordInput.value = "";
    return;
  }

  let password = "";
  for (let i = 0; i < Number(lengthInput.value); i += 1) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  passwordInput.value = password;
  showMessage("Senha gerada com sucesso!", "success");
  showSuccessVisual();
}

generateButton.addEventListener("click", generatePassword);

copyButton.addEventListener("click", async () => {
  if (!passwordInput.value) {
    hideSuccessVisual();
    showMessage("Gere uma senha antes de copiar.", "error");
    return;
  }

  try {
    await navigator.clipboard.writeText(passwordInput.value);
    showMessage("Senha copiada com sucesso!", "success");
  } catch (error) {
    showMessage("Não foi possível copiar a senha.", "error");
  }
});

uppercaseInput.addEventListener("change", () => {
  hideSuccessVisual();
  showMessage("");
});

numbersInput.addEventListener("change", () => {
  hideSuccessVisual();
  showMessage("");
});

symbolsInput.addEventListener("change", () => {
  hideSuccessVisual();
  showMessage("");
});

lengthInput.addEventListener("input", () => {
  hideSuccessVisual();
  showMessage("");
});

/* estado inicial */
hideSuccessVisual();
showMessage("");
passwordInput.value = "";
