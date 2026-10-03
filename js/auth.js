// Tampilkan email yang sedang login di semua halaman
window.addEventListener('load', function () {
  const email = localStorage.getItem('userEmail');
  const nav = document.querySelector('header nav');
  if (nav && email) {
    const s = document.createElement('span');
    s.id = 'emailMasked';
    s.style = 'color:#fff;font-weight:bold;cursor:pointer;';
    const eye = document.createElement('span');
    eye.textContent = ' 👁️';
    eye.title = 'Klik untuk lihat/sembunyikan email';
    s.appendChild(document.createTextNode('👤 '));
    const emailMask = document.createElement('span');
    emailMask.textContent = email.replace(/(.{2}).+(?=@)/, '$1•••••');
    s.appendChild(emailMask);
    s.appendChild(eye);
    s.addEventListener('click', function () {
      emailMask.textContent = (emailMask.textContent === email) ? email.replace(/(.{2}).+(?=@)/, '$1•••••') : email;
    });
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
