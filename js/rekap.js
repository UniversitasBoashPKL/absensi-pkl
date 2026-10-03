const data = JSON.parse(localStorage.getItem('absensiPKL') || '[]');
const tbody = document.getElementById('tabelRekap');
if (data.length === 0) {
  tbody.innerHTML = '<tr><td colspan="7" style="text-align:center">Belum ada data absensi.</td></tr>';
} else {
  data.forEach((d, i) => {
    tbody.innerHTML += `<tr>
      <td>${i + 1}</td>
      <td>${d.nama}</td>
      <td>${d.sekolah}</td>
      <td><span class="badge ${d.jenis === 'Masuk' ? 'badge-masuk' : 'badge-pulang'}">${d.jenis}</span></td>
      <td>${d.waktu}</td>
      <td>${d.lokasi ? '<a href="https://www.google.com/maps?q=' + d.lokasi + '" target="_blank">📍 Lihat di Maps</a>' : '-'}</td>
      <td><img class="thumb" src="${d.foto}" alt="foto bukti"></td>
    </tr>`;
  });
}
document.getElementById('hapus').addEventListener('click', function () {
  if (confirm('Yakin ingin menghapus semua data?')) {
    localStorage.removeItem('absensiPKL');
    location.reload();
  }
});
