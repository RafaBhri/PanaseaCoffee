// Keranjang belanja
let cart = [];
let total = 0;

// Update harga saat pilih varian
document.getElementById("varian").addEventListener("change", updateHarga);

function updateHarga() {
  let harga = document.getElementById("varian").value;
  document.getElementById("harga").innerText =
    "Harga: Rp" + Number(harga).toLocaleString("id-ID");
}

// Harga langsung sinkron saat load
updateHarga();

// Tambah produk ke keranjang
function tambahKeranjang() {
  let select = document.getElementById("varian");
  let varian = select.options[select.selectedIndex].text;
  let harga = Number(select.value);
  let qty = Number(document.getElementById("qty").value);

  if (qty < 1) {
    alert("Jumlah minimal 1");
    return;
  }

  cart.push({ varian, harga, qty });
  renderCart();
}

// Render keranjang + tombol hapus
function renderCart() {
  let list = document.getElementById("cartList");
  list.innerHTML = "";
  total = 0;

  cart.forEach(function (item, index) {
    let subtotal = item.harga * item.qty;
    total += subtotal;

    let li = document.createElement("li");

    // Text item
    let text = document.createElement("span");
    text.textContent =
      item.varian +
      " x" +
      item.qty +
      " = Rp" +
      subtotal.toLocaleString("id-ID");

    // Tombol hapus
    let btn = document.createElement("button");
    btn.textContent = "❌";
    btn.style.marginLeft = "10px";
    btn.style.background = "#ccc";
    btn.style.border = "none";
    btn.style.borderRadius = "4px";
    btn.style.cursor = "pointer";

    btn.onclick = function () {
      cart.splice(index, 1);
      renderCart();
    };

    li.appendChild(text);
    li.appendChild(btn);
    list.appendChild(li);
  });

  document.getElementById("total").innerText =
    "Total: Rp" + total.toLocaleString("id-ID");
}

// Checkout ke WhatsApp
function checkout() {
  if (cart.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  let pesan = `Halo Panasea Coffee,

Saya ingin memesan kopi berikut:

`;

  cart.forEach(function (item, index) {
    let subtotal = item.harga * item.qty;
    pesan += index + 1 + ". " + item.varian + "\n";
    pesan += "Jumlah: " + item.qty + "\n";
    pesan += "Subtotal: Rp" + subtotal.toLocaleString("id-ID") + "\n\n";
  });

  pesan += "Total Bayar: Rp" + total.toLocaleString("id-ID") + "\n";
  pesan += "Terima kasih 🙏";

  let nomorWA = "6285693604172";
  let linkWA =
    "https://wa.me/" + nomorWA + "?text=" + encodeURIComponent(pesan);

  window.open(linkWA, "_blank");

  cart = [];
  renderCart();
}
