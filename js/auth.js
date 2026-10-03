// Tampilkan email yang sedang login di semua halaman
window.addEventListener('load', function () {
  const email = localStorage.getItem('userEmail');
  const nav = document.querySelector('header nav');
  if (nav && email) {
    const s = document.createElement('span');
    s.style = 'color:#fff;font-weight:bold;';
    s.textContent = '  👤 ' + email;
    nav.appendChild(s);
  }
});

// Callback dari Google Sign-In
window.handleCredentialResponse = function (response) {
  const credential = response.credential;
  const payload = JSON.parse(atob(credential.split('.')[1]));
  localStorage.setItem('userEmail', payload.email);
  localStorage.setItem('userName', payload.name);
  alert('Login berhasil sebagai: ' + payload.email);
  location.reload();
};
