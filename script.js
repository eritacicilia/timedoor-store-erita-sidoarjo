/* =====================
   DATA PRODUK
===================== */
const products = [
  { id: 1, name: "Product 1", price: 10, image: "assets/product-1.png", description: "This is Product 1" },
  { id: 2, name: "Product 2", price: 20, image: "assets/product-2.png", description: "This is Product 2" },
  { id: 3, name: "Product 3", price: 30, image: "assets/product-3.png", description: "This is Product 3" },
  { id: 4, name: "Product 4", price: 40, image: "assets/product-4.png", description: "This is Product 4" },
  { id: 5, name: "Product 5", price: 50, image: "assets/product-5.png", description: "This is Product 5" },
  { id: 6, name: "Product 6", price: 60, image: "assets/product-6.png", description: "This is Product 6" }
];

/* =====================
   CART
===================== */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =====================
   UPDATE CART COUNT
===================== */
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (!cartCount) return;

  const totalItems = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  cartCount.textContent = totalItems > 0 ? `${totalItems}` : "";
}

/* =====================
   TOAST NOTIFICATION
===================== */
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

/* =====================
   ADD TO CART
===================== */
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingIndex = cart.findIndex(item => item.id === product.id);
  if (existingIndex > -1) {
    cart[existingIndex].qty = (cart[existingIndex].qty || 1) + 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showToast(product.name + " added to cart!");
}

/* =====================
   HELPER: ADD BY BUTTON
===================== */
function addToCartById(productId) {
  addToCart(productId);
}

/* =====================
   PRODUCT DETAIL
===================== */
function goToProductDetail(productId) {
  window.location.href = `product-detail.html?id=${productId}`;
}

function loadProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  if (!id) return;

  const product = products.find(p => p.id === id);
  if (!product) return;

  document.getElementById("product-title").textContent = product.name;
  document.getElementById("product-img").src = product.image;
  document.getElementById("product-description").textContent = product.description;
  document.getElementById("product-price-value").textContent = product.price;

  document.getElementById("add-to-cart-button").onclick = () => addToCart(product.id);
}

/* =====================
   RENDER CART
===================== */
function renderCart() {
  const cartContainer = document.getElementById("cart-container");
  const totalPriceElem = document.getElementById("total-price");
  if (!cartContainer || !totalPriceElem) return;

  cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalPriceElem.textContent = "Total: $0";
    return;
  }

  let total = 0;

  cart.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.style.display = "flex";
    itemDiv.style.alignItems = "center";
    itemDiv.style.gap = "12px";
    itemDiv.style.marginBottom = "14px";

    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" style="width:60px;height:60px;object-fit:cover;border-radius:8px;">
      <div style="flex:1;">
        <p style="margin:0;font-weight:600;">${item.name}</p>
        <p style="margin:0;">$${item.price} x ${item.qty}</p>
      </div>
      <button onclick="removeFromCart(${item.id})" style="padding:4px 8px;border:none;border-radius:6px;background:red;color:white;cursor:pointer">Remove</button>
    `;
    cartContainer.appendChild(itemDiv);

    total += item.price * item.qty;
  });

  totalPriceElem.textContent = `Total: $${total}`;
}

/* =====================
   REMOVE ITEM FROM CART
===================== */
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

/* =====================
   CLEAR CART
===================== */
document.getElementById("clear-cart-button")?.addEventListener("click", () => {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
});

/* =====================
   CHECKOUT
===================== */
document.getElementById("checkout-button")?.addEventListener("click", () => {
  if (!cart || cart.length === 0) {
    showToast("Your cart is empty!");
    return;
  }
  showToast("Proceeding to payment...");
  // Bisa ditambahkan redirect ke payment page
});

/* =====================
   ON LOAD
===================== */
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  loadProductDetail();
  renderCart();
});

// tombol checkout menuju payment.html
document.getElementById("checkout-button")?.addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        showToast("Your cart is empty!");
        return;
    }

    // redirect ke payment page
    window.location.href = "payment.html";
});

