document.getElementById('foto').addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;
  if (file.size > 2 * 1024 * 1024) {
    alert('Ukuran foto maksimal 2MB!');
    this.value = '';
    return;
  }
  if (!file.type.startsWith('image/')) {
    alert('File harus berupa gambar!');
    this.value = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = function (e) {
    const img = document.getElementById('preview');
    img.src = e.target.result;
    img.style.display = 'block';
  };
  reader.readAsDataURL(file);
});

let lokasi = null;
document.getElementById('btnLokasi').addEventListener('click', function () {
  if (!navigator.geolocation) { alert('Browser tidak mendukung GPS'); return; }
  document.getElementById('statusLokasi').innerText = 'Mengambil lokasi...';
  navigator.geolocation.getCurrentPosition(function (pos) {
    lokasi = { lat: pos.coords.latitude, lng: pos.coords.longitude };
    document.getElementById('statusLokasi').innerText =
      'Lokasi terambil: ' + lokasi.lat.toFixed(5) + ', ' + lokasi.lng.toFixed(5);
  }, function () {
    document.getElementById('statusLokasi').innerText = 'Gagal mengambil lokasi. Izinkan akses lokasi di browser.';
  });
});

document.getElementById('formAbsen').addEventListener('submit', function (e) {
  e.preventDefault();
  const nama = document.getElementById('nama').value.trim();
  const sekolah = document.getElementById('sekolah').value;
  const jenis = document.querySelector('input[name="jenis"]:checked').value;
  const foto = document.getElementById('foto').files[0];

  if (!nama || !sekolah || !jenis || !foto) { alert('Semua data wajib diisi!'); return; }

  const img = new Image();
  img.onload = function () {
    const canvas = document.createElement('canvas');
    const max = 320;
    let w = img.width, h = img.height;
    if (w > max) { h = h * max / w; w = max; }
    canvas.width = w; canvas.height = h;
    canvas.getContext('2d').drawImage(img, 0, 0, w, h);
    const fotoKecil = canvas.toDataURL('image/jpeg', 0.5);
    kirimKeSheet(fotoKecil);
  };
  img.src = URL.createObjectURL(foto);

  function kirimKeSheet(fotoKecil) {
  const reader = new FileReader();
  reader.onload = async function (ev) {
    const data = JSON.parse(localStorage.getItem('absensiPKL') || '[]');
    const now = new Date();
    data.push({
      nama, sekolah, jenis,
      waktu: now.toLocaleDateString('id-ID') + ' ' + now.toLocaleTimeString('id-ID'),
      foto: ev.target.result,
      lokasi: lokasi ? lokasi.lat + ',' + lokasi.lng : ''
    });
    localStorage.setItem('absensiPKL', JSON.stringify(data));

    // Simpan ke Firestore (data admin)
    try {
      await db.collection('absensi').add({
        nama, sekolah, status: jenis, waktu: now.toLocaleDateString('id-ID') + ' ' + now.toLocaleTimeString('id-ID'),
        lokasi: lokasi ? lokasi.lat + ',' + lokasi.lng : '',
        foto: fotoKecil, dibuat: new Date()
      });
    } catch (e) { console.log('Gagal simpan ke Firebase', e); }

    alert('Absensi ' + jenis + ' berhasil disimpan & dikirim ke admin!');
    window.location.href = 'index.html';
  };
  reader.readAsDataURL(foto);
  }
});
