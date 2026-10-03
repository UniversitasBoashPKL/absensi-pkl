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
document.getElementById('ekspor').addEventListener('click', function () {
  const data = JSON.parse(localStorage.getItem('absensiPKL') || '[]');
  if (data.length === 0) { alert('Belum ada data untuk diekspor.'); return; }
  const rows = data.map((d, i) => ({
    No: i + 1,
    'Nama Siswa': d.nama,
    'Asal Sekolah': d.sekolah,
    Status: d.jenis,
    Waktu: d.waktu,
    'Lokasi (GPS)': d.lokasi || '-'
  }));
  const ws = XLSX.utils.json_to_sheet(rows);
  ws['!cols'] = [{ wch: 5 }, { wch: 25 }, { wch: 25 }, { wch: 10 }, { wch: 20 }, { wch: 20 }];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Rekap Absensi');
  XLSX.writeFile(wb, 'Rekap_Absensi_PKL.xlsx');
});
