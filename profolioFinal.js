const area = document.querySelector(".bungkus-wadah-profil");


let mouseX = area.clientWidth / 2;
let mouseY = area.clientHeight / 2;

let posisiX = 0;
let posisiY = 0;

area.addEventListener("mousemove", (e) => {
    const kotak = area.getBoundingClientRect();

    mouseX = e.clientX - kotak.left;
    mouseY = e.clientY - kotak.top;
});

function animasi() {
    const kotak = area.getBoundingClientRect();

    const tengahX = kotak.width / 2;
    const tengahY = kotak.height / 2;

    const targetX = (mouseX - tengahX) * 0.2;
    const targetY = (mouseY - tengahY) * 0.2;

    posisiX += (targetX - posisiX) * 0.15;
    posisiY += (targetY - posisiY) * 0.15;

    area.style.transform = `translate(${posisiX}px, ${posisiY}px)`;

    requestAnimationFrame(animasi);
}

animasi();

area.addEventListener("mouseleave", () => {
    mouseX = area.clientWidth / 2;
    mouseY = area.clientHeight / 2;
});




const kertas2 = document.querySelector(".kertas2");
let geser = false;

kertas2.addEventListener("click", (e) => {
    if (e.target.closest('.wadah-gambar')) {
        return; 
    }

    if (!geser) {
        kertas2.classList.remove("animasi-keluar");
        kertas2.classList.add("animasi-lihat");
        
    } else {
        kertas2.classList.remove("animasi-lihat");
        kertas2.classList.add("animasi-keluar");
        
    }
    geser = !geser;
});



//bagian hp====================================================

//AREA FUNGSI JAM-TANGGAL==================================================
function perbaruiJam_tanggal() {
    // Mengambil data waktu sistem saat ini
    const sekarang = new Date();

    // membuat jam punya angka 2 digit============================
    const jam = String(sekarang.getHours()).padStart(2, '0');
    const menit = String(sekarang.getMinutes()).padStart(2, '0');
    const detik = String(sekarang.getSeconds()).padStart(2, '0');



    //bagian tanggal---------------------------------------------------
    const tanggal = sekarang.getDate();
    const bulan = String(sekarang.getMonth() + 1).padStart(2, '0');
    const tahun = sekarang.getFullYear();

    const pengaturanTanggal = `${tanggal}.${bulan}.${tahun}`; 

    // Memasukkan hasil format jam dan tanggal ke dalam elemen HTML
    document.querySelector(".jam").textContent = `${jam}:${menit}:${detik}`;
    document.querySelector(".tanggal").textContent = pengaturanTanggal;

}
setInterval(perbaruiJam_tanggal, 1000); 
perbaruiJam_tanggal(); 



// AREA KONTROL MUSIK & PLAYLIST======================================
const kumpulanMusik = [ 
    {judul: "3R2 - Duality", cari:"3R2 - Duality.opus"},
    {judul: "Memory reboot", cari:"Memory reboot.opus"},
    {judul: "Flawed Mangoes", cari:"Flawed Mangoes - Dramamine.opus"},
    {judul: "Ethereal", cari:"Ethereal.opus"},
    {judul: "Beyond The Sea", cari:"Beyond The Sea Is Freedom.opus"},
    {judul: "H_G", cari:"H_G.opus"},
    {judul: "Akie x Acoustic Ver", cari:"Akie_x_Acoustic_Ver.opus"}
];


const kaset = document.querySelector(".kaset"); // Elemen gambar/visual kaset untuk animasi
const mulaiMusik = document.querySelector(".mulaiMusik"); // Tag <audio> HTML
const judulMusik = document.querySelector(".judul-musik"); 
const mulaiPause = document.querySelector(".play-pause"); 
const putarBelakang = document.querySelector(".putar-belakang"); 
const putarDepan = document.querySelector(".putar-depan"); 

const pengaturSuara = document.querySelector(".pengatur-suara"); // Slider pengatur volume (<input type="range">)


let laguSaatIni = 0; 
let saatMulai = false; 


function bukaMusik(m) {
    const musik = kumpulanMusik[m]; 

    mulaiMusik.src = musik.cari;
    judulMusik.textContent = musik.judul; 

    mulaiMusik.load(); // 
}

// fungsi jalankan musik
function mainkanMusik() {
    mulaiMusik.play(); 
    saatMulai = true; 
}

// fungsi pause
function jedaMusik() {
    mulaiMusik.pause(); 
    saatMulai = false; 
}

// Fungsi lanjut
function laguBerikutnya() {
    laguSaatIni++; 

  
    if (laguSaatIni >= kumpulanMusik.length) {
        laguSaatIni = 0;
    }

    bukaMusik(laguSaatIni); 
    mainkanMusik(); 
}

// Fungsi sebelumnya
function laguSebelumnya() {
    laguSaatIni--; 

  
    if (laguSaatIni < 0) {
        laguSaatIni = kumpulanMusik.length - 1;
    }

    bukaMusik(laguSaatIni); 
    mainkanMusik(); 
}


window.onload = () => bukaMusik(laguSaatIni);


putarBelakang.addEventListener('click', () => {
    laguSebelumnya(); 
    kaset.style.animationPlayState = "running"; 
});


putarDepan.addEventListener('click', () => {
    laguBerikutnya(); 
    kaset.style.animationPlayState = "running"; 
});


mulaiMusik.addEventListener('ended', laguBerikutnya);


mulaiPause.addEventListener('click', () => {
    kaset.style.animationPlayState = "paused";
    mulaiPause.style.borderRadius = "0%";
   
    if (saatMulai) {
        jedaMusik();
    } else {
        mainkanMusik();
        kaset.style.animationPlayState = "running";
        mulaiPause.style.borderRadius = "50%";
    }
});



//DURASI MUSIK ============================================


function durasiMusik(waktu) {
    let menit = String(Math.floor(waktu / 60)).padStart(2, '0'); 
    let detik = String(Math.floor(waktu % 60)).padStart(2, '0'); 

    return `${menit}:${detik}`;
} 


mulaiMusik.addEventListener('timeupdate', () => {
    document.querySelector('.durasi-musik').textContent = durasiMusik(mulaiMusik.currentTime);
});