let cart = [];
let total = 0;

document.getElementById("varian").addEventListener("change", updateHarga);

function updateHarga() {
    let harga = document.getElementById("varian").value;
    document.getElementById("harga").innerText =
        "Harga: Rp" + Number(harga).toLocaleString("id-ID");
}

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

function checkout() {
    if (cart.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }

    let pesan = "Halo, saya ingin memesan:%0A%0A";

    cart.forEach((item, index) => {
        pesan += `${index + 1}. Kopi ${item.varian}%0A`;
        pesan += `Jumlah: ${item.qty}%0A`;
        pesan += `Subtotal: Rp${(item.harga * item.qty).toLocaleString("id-ID")}%0A%0A`;
    });

    pesan += `Total Bayar: Rp${total.toLocaleString("id-ID")}`;

    // GANTI NOMOR WHATSAPP INI
    let nomorWA = "6288290813011";

    let linkWA = `https://wa.me/${nomorWA}?text=${pesan}`;
    window.open(linkWA, "_blank");

    // reset
    cart = [];
    renderCart();
}
