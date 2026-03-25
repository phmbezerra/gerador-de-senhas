const passwordInput = document.getElementById('password');
const lengthInput = document.getElementById('length');
const lengthValue = document.getElementById('length-value');
const uppercaseInput = document.getElementById('uppercase');
const numbersInput = document.getElementById('numbers');
const symbolsInput = document.getElementById('symbols');
const generateButton = document.getElementById('generate');
const copyButton = document.getElementById('copy');
const message = document.getElementById('message');

const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numberChars = '0123456789';
const symbolChars = '!@#$%&*?';

lengthInput.addEventListener('input', () => {
  lengthValue.textContent = lengthInput.value;
});

function generatePassword() {
  let chars = lowercaseChars;

  if (uppercaseInput.checked) chars += uppercaseChars;
  if (numbersInput.checked) chars += numberChars;
  if (symbolsInput.checked) chars += symbolChars;

  if (!chars) {
    message.textContent = 'Selecione ao menos uma opção.';
    return;
  }

  let password = '';
  for (let i = 0; i < Number(lengthInput.value); i += 1) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  passwordInput.value = password;
  message.textContent = 'Senha gerada com sucesso!';
}

generateButton.addEventListener('click', generatePassword);

copyButton.addEventListener('click', async () => {
  if (!passwordInput.value) {
    message.textContent = 'Gere uma senha antes de copiar.';
    return;
  }

  await navigator.clipboard.writeText(passwordInput.value);
  message.textContent = 'Senha copiada!';
});

generatePassword();
