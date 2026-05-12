const input = document.getElementById('passwordInput');
const bar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');
const suggestions = document.getElementById('suggestions');

const commonPasswords = [
  "password",
  "123456",
  "qwerty",
  "abc123",
  "password1"
];

input.addEventListener('input', checkStrength);

function checkStrength() {
  const password = input.value;
  let score = 0;
  let tips = [];

  suggestions.innerHTML = '';

  if (password.length === 0) {
    bar.style.width = '0%';
    strengthText.textContent = 'Start typing...';
    strengthText.style.color = '#fff';
    return;
  }

  if (commonPasswords.includes(password.toLowerCase())) {
    bar.style.width = '10%';
    bar.style.background = 'red';

    strengthText.textContent = '❌ Too Common!';
    strengthText.style.color = 'red';

    showTip('This is one of the most common passwords. Change it!');
    return;
  }

  if (password.length >= 8) {
    score++;
  } else {
    tips.push('Use at least 8 characters');
  }

  if (password.length >= 12) {
    score++;
  }

  if (/[A-Z]/.test(password)) {
    score++;
  } else {
    tips.push('Add at least one uppercase letter (A-Z)');
  }

  if (/[a-z]/.test(password)) {
    score++;
  } else {
    tips.push('Add at least one lowercase letter (a-z)');
  }

  if (/[0-9]/.test(password)) {
    score++;
  } else {
    tips.push('Add at least one number (0-9)');
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    score++;
  } else {
    tips.push('Add a special character like @, #, $, !');
  }

  if (score <= 2) {
    bar.style.width = '25%';
    bar.style.background = '#ff4d4d';

    strengthText.textContent = '🔴 Weak Password';
    strengthText.style.color = '#ff4d4d';

  } else if (score <= 4) {
    bar.style.width = '55%';
    bar.style.background = '#ffa500';

    strengthText.textContent = '🟠 Medium Password';
    strengthText.style.color = '#ffa500';

  } else if (score <= 5) {
    bar.style.width = '80%';
    bar.style.background = '#00cc66';

    strengthText.textContent = '🟢 Strong Password';
    strengthText.style.color = '#00cc66';

  } else {
    bar.style.width = '100%';
    bar.style.background = '#00fff5';

    strengthText.textContent = '💪 Very Strong Password!';
    strengthText.style.color = '#00fff5';
  }

  tips.forEach(tip => showTip(tip));
}

function showTip(tip) {
  const li = document.createElement('li');
  li.textContent = tip;
  suggestions.appendChild(li);
}

function togglePassword() {
  input.type = input.type === 'password'
    ? 'text'
    : 'password';
}