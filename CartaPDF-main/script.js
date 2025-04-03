document.querySelector('.heart').addEventListener('click', function() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'Galaxia.pdf', true); // Asegúrate que el nombre del archivo sea correcto.
    xhr.responseType = 'blob'; 
    xhr.onload = function() {
      if (xhr.status === 200) {
        const blob = xhr.response;
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'mi_gatita_hermosa.pdf'; // Nombre con el que se descarga la carta
        link.click();
        window.URL.revokeObjectURL(link.href);

        // 🟢 Reiniciar el temporizador cuando se descarga el archivo
        reiniciarTemporizador();
      } else {
        console.error('No se pudo descargar el archivo.');
      }
    };
    xhr.send();
});

// Tiempo del contador en horas (2 días = 48 horas)
var countDownHours = 48;
var countDownDate;

// 🟢 Función para reiniciar el temporizador
function reiniciarTemporizador() {
    countDownDate = new Date().getTime() + (countDownHours * 60 * 60 * 1000);
    localStorage.setItem('countDownDate', countDownDate.toString());
}

// Verificar si ya hay un temporizador guardado
var savedCountdown = localStorage.getItem('countDownDate');
if (!savedCountdown) {
    reiniciarTemporizador(); // Si no hay un temporizador guardado, iniciarlo
} else {
    countDownDate = parseInt(savedCountdown, 10);
}

// 🟢 Función para actualizar la cuenta regresiva
var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown").textContent = `Nueva carta en: ${days}d ${hours}h ${minutes}m ${seconds}s`;

    localStorage.setItem('countDownDate', countDownDate.toString());

    // Si el contador llega a 0
    if (distance < 0) {
        clearInterval(x); // Detener el temporizador
        document.getElementById("countdown").textContent = "¡Nueva carta disponible!";
    }
}, 1000);
