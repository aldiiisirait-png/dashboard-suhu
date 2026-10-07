// ==============================
// AMBIL ELEMEN DARI HTML
// ==============================

const temperatureElement =
    document.getElementById("temperature");

const humidityElement =
    document.getElementById("humidity");

const timeElement =
    document.getElementById("time");

const dateElement =
    document.getElementById("date");

const statusElement =
    document.getElementById("status");


// ==============================
// JAM DAN TANGGAL
// ==============================

function updateClock() {

    const now = new Date();

    const hours =
        String(now.getHours()).padStart(2, "0");

    const minutes =
        String(now.getMinutes()).padStart(2, "0");

    const seconds =
        String(now.getSeconds()).padStart(2, "0");


    const day =
        String(now.getDate()).padStart(2, "0");

    const month =
        String(now.getMonth() + 1).padStart(2, "0");

    const year =
        now.getFullYear();


    timeElement.textContent =
        `${hours}:${minutes}:${seconds}`;

    dateElement.textContent =
        `${day}/${month}/${year}`;
}


// Jalankan jam setiap 1 detik

setInterval(updateClock, 1000);

updateClock();


// ==============================
// SUHU SIMULASI
// ==============================

function generateTemperature() {

    // Membuat suhu antara 27 - 32 °C

    const temperature =
        27 + Math.random() * 5;

    return temperature;
}


// ==============================
// KELEMBAPAN SIMULASI
// ==============================

function generateHumidity() {

    // Membuat kelembapan antara 60 - 80 %

    const humidity =
        60 + Math.random() * 20;

    return humidity;
}


// ==============================
// MENENTUKAN STATUS SUHU
// ==============================

function getStatus(temperature) {

    if (temperature < 25) {

        return "DINGIN";

    } else if (temperature <= 30) {

        return "NORMAL";

    } else {

        return "PANAS";

    }
}


// ==============================
// MEMBUAT GRAFIK
// ==============================

const ctx =
    document.getElementById("temperatureChart");


const temperatureChart =
    new Chart(ctx, {

        type: "line",

        data: {

            labels: [],

            datasets: [{

                label: "Suhu (°C)",

                data: [],

                borderWidth: 2,

                tension: 0.3

            }]

        },

        options: {

            responsive: true,

            scales: {

                y: {

                    beginAtZero: false

                }

            }

        }

    });


// ==============================
// UPDATE DASHBOARD
// ==============================

function updateDashboard() {

    // Ambil suhu simulasi

    const temperature =
        generateTemperature();


    // Ambil kelembapan simulasi

    const humidity =
        generateHumidity();


    // Tentukan status

    const status =
        getStatus(temperature);


    // Tampilkan suhu

    temperatureElement.textContent =
        temperature.toFixed(1);


    // Tampilkan kelembapan

    humidityElement.textContent =
        humidity.toFixed(0);


    // Tampilkan status

    statusElement.textContent =
        status;


    // Ambil waktu sekarang

    const now = new Date();

    const time =
        now.toLocaleTimeString();


    // Masukkan waktu ke grafik

    temperatureChart.data.labels.push(time);


    // Masukkan suhu ke grafik

    temperatureChart.data.datasets[0].data.push(
        temperature
    );


    // Batasi grafik hanya 10 data

    if (
        temperatureChart.data.labels.length > 10
    ) {

        temperatureChart.data.labels.shift();

        temperatureChart.data.datasets[0].data.shift();

    }


    // Update grafik

    temperatureChart.update();
}


// Jalankan update setiap 2 detik

setInterval(updateDashboard, 2000);

updateDashboard();