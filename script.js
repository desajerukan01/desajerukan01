import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

//penyimpanan config
const firebaseConfig = {
  apiKey: "AIzaSyDkSj-pxpl-KtC2si3UM3KcDPgI9zXknU4",
  authDomain: "umkm-desajerukan.firebaseapp.com",
  projectId: "umkm-desajerukan",
  storageBucket: "umkm-desajerukan.firebasestorage.app",
  messagingSenderId: "468698300794",
  appId: "1:468698300794:web:a3f2399b3243f2028796c3",
  measurementId: "G-62R2SR7DXS"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function toggleSearch() {
  const searchInput = document.getElementById("searchInput");
  searchInput.classList.toggle("active");
  if (searchInput.classList.contains("active")) {
    searchInput.focus();
  }
}

//fungsi tambah data
function tambahUMKM(nama, kategori, kontak) {
    const umkmRef = ref(database, 'umkm');
    push(umkmRef, {nama, kategori, kontak});
}

//fungsi tampilkan data 
function tampilkanUMKM() {
    const umkmRef = ref(database, 'umkm')
    const umkmList = document.getElementById('umkmList');
  umkmList.innerHTML = '';

 onValue(umkmRef, (snapshot) => {
    umkmList.innerHTML = '';
    const data = snapshot.val();

    if (data) {
      Object.entries(data).forEach(([key, umkm]) => {
        const card = document.createElement('div');
        card.innerHTML = `
          <h3>${umkm.nama}</h3>
          <p>Kategori: ${umkm.kategori}</p>
          <p>Kontak WA: ${umkm.kontak}</p>
          <hr>
        `;
        umkmList.appendChild(card);
      });
    } else {
      umkmList.innerHTML = '<p>Belum ada UMKM</p>';
    }
  });
}

// Panggil Fungsi Tampilkan
tampilkanUMKM();

// Event Tambah Data
document.getElementById('btnTambah').addEventListener('click', () => {
  const nama = document.getElementById('namaUMKM').value;
  const kategori = document.getElementById('kategoriUMKM').value;
  const kontak = document.getElementById('kontakUMKM').value;

  if (nama && kategori && kontak) {
    tambahUMKM(nama, kategori, kontak);
    document.getElementById('namaUMKM').value = '';
    document.getElementById('kategoriUMKM').value = '';
    document.getElementById('kontakUMKM').value = '';
  } else {
    alert('Isi semua kolom dulu');
  }
});
