// Fungsi toast untuk payment page
function showToast(message) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 10);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => container.removeChild(toast), 300);
  }, 2500);
}

// Handle form submit
document.getElementById("payment-form").addEventListener("submit", function(e) {
  e.preventDefault();

  // tampilkan toast
  showToast("Payment processed successfully! Thank you for your purchase.");

  // kosongkan cart
  localStorage.setItem("cart", JSON.stringify([]));

  // redirect setelah toast muncul
  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 2600);
});
