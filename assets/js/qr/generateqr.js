  // Loader with 3 second delay
  window.addEventListener("load", function () {
    setTimeout(() => {
      const loader = document.getElementById("loader");
      const content = document.getElementById("page-content");

      // Add fade-out animation
      loader.style.transition = "opacity 0.5s ease";
      loader.style.opacity = "0";

      setTimeout(() => {
        loader.style.display = "none";
        content.style.display = "block";
      }, 500); // wait for fade-out to finish
    }, 1000); // 3 second delay
  });


// ================== QR GENERATOR ==================
let qrcode; // Global variable for QR code instance

document.getElementById("generateQR").addEventListener("click", function () {
  const rawlinkInput = document.getElementById('floatingLink');
  const rawlink = rawlinkInput.value.trim();
  const splink = document.getElementById('floatingSP').value.trim();
  const download = document.getElementById('downloadQR');

  // Reset validation state
  rawlinkInput.classList.remove("is-invalid");

  if (!rawlink) {
    rawlinkInput.classList.add("is-invalid");
    return;
  }

  // Extract FILE_ID from Google Drive link
  const match = rawlink.match(/[-\w]{25,}/);
  if (!match) {
    rawlinkInput.classList.add("is-invalid");
    return;
  }
  const fileId = match[0];
  const drivelink = `https://drive.google.com/open?id=${fileId}`;

  // Show loading spinner inside qrcode container
  const qrContainer = document.getElementById("qrcode");
  qrContainer.innerHTML = `
    <div class="d-flex justify-content-center align-items-center" style="height:200px;">
      <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `;

  // Simulate loading before showing QR (1s)
  setTimeout(() => {
    // Clear spinner
    qrContainer.innerHTML = "";

    const options = {
      text: drivelink,
      width: 200,
      height: 200,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,

      // Title
      title: splink,
      titleFont: "normal bold italic 25px Cambria",
      titleColor: "#000000",
      titleBackgroundColor: "#fff",
      titleHeight: 50,
      titleTop: 30,

      // Background logo
      backgroundImage: 'assets/img/ossp_logo.svg',
      backgroundImageAlpha: 2,
      autoColor: true,
      autoColorDark: "rgba(0, 0, 0, .6)",
      autoColorLight: "rgba(255, 255, 255, .7)",

      // Colors
      PO: '#A91B1F',
      PI: '#16036C',
      AO: '#16036C',
      AI: '#A91B1F',

      // Dot scaling
      dotScale: .5,
      quietZone: 0,
      quietZoneColor: "#16036C",

      version: 0
    };

    // Generate QR
    qrcode = new QRCode(qrContainer, options);

    download.classList.remove('d-none');
    download.classList.add('d-block');
  }, 1000);
});

// Download QR event
document.getElementById("downloadQR").addEventListener("click", downloadQRcode);

function downloadQRcode() {
  if (!qrcode) {
    alert("Please generate a QR code first!");
    return;
  }
  const splink = document.getElementById("floatingSP").value.trim() || "qrcode";
  qrcode.download(splink);
}
// ================== END QR GENERATOR ==================