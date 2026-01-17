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

// Render keranjang ke halaman
function renderCart() {
  let list = document.getElementById("cartList");
  list.innerHTML = "";
  total = 0;

  cart.forEach(item => {
    let subtotal = item.harga * item.qty;
    total += subtotal;

    let li = document.createElement("li");
    li.textContent =
      `${item.varian} x${item.qty} = Rp${subtotal.toLocaleString("id-ID")}`;
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

  // Pesan WA
  let pesan = `Halo Panasea Coffee,\n\nSaya ingin memesan kopi berikut:\n\n`;

  cart.forEach((item, index) => {
    let subtotal = item.harga * item.qty;
    pesan += `${index + 1}. ${item.varian}\n`;
    pesan += `Jumlah: ${item.qty}\n`;
    pesan += `Subtotal: Rp${subtotal.toLocaleString("id-ID")}\n\n`;
  });

  pesan += `Total Bayar: Rp${total.toLocaleString("id-ID")}\n`;
  pesan += "Terima kasih 🙏";

  // Nomor WhatsApp (format internasional tanpa +)
  let nomorWA = "6285693604172";

  // Encode pesan agar spasi & enter terbaca benar
  let linkWA = "https://wa.me/" + nomorWA + "?text=" + encodeURIComponent(pesan);

  // Buka WA di tab baru
  window.open(linkWA, "_blank");

  // Reset keranjang
  cart = [];
  renderCart();
}
