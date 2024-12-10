function downloadCV() {
    window.location.href = "CV_Kimberly.pdf";
  }

  document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
  
    if (!name || !email || !message) {
      alert("Vänligen fyll i alla fält.");
    } else {
      alert("Ditt meddelande har skickats, tack för att du kontaktar mig!");
      this.reset();
    }
  });
  