document.addEventListener("DOMContentLoaded", function() {
    // Obtener el año actual
    const currentYear = new Date().getFullYear();
    document.getElementById("currentyear").textContent = currentYear;
  
    // Obtener la última fecha de modificación del documento
    const lastModified = document.lastModified;
    document.getElementById("lastModified").textContent = `Last modification: ${lastModified}`;
  });