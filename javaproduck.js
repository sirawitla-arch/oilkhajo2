const products = [
    { id: 1, name: "ชุดเนื้อวากิวพรีเมียม", price: 399, img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80" },
    { id: 2, name: "ชุดซีฟู้ดจัดเต็ม", price: 359, img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80" },
    { id: 3, name: "ชุดหมูสไลซ์นุ่ม", price: 299, img: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=500&q=80" },
    { id: 4, name: "ชุดผักสดออร์แกนิก", price: 129, img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80" },
    { id: 5, name: "ชุดลูกชิ้นชาบูรวม", price: 159, img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80" },
    { id: 6, name: "ชุดของหวานและไอศกรีม", price: 99, img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80" }
];

let cart = {};

function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = products.map(p => {
        const qty = cart[p.id] || 0;
        return `
            <div class="product-card">
                <img src="${p.img}" alt="${p.name}">
                <h4>${p.name}</h4>
                <p class="price">${p.price} บาท</p>
                <div class="qty-control">
                    <button class="btn-qty" onclick="updateQty(${p.id}, -1)">-</button>
                    <span>${qty}</span>
                    <button class="btn-qty" onclick="updateQty(${p.id}, 1)">+</button>
                </div>
            </div>
        `;
    }).join('');
}

function updateQty(id, change) {
    if (!cart[id]) cart[id] = 0;
    cart[id] += change;
    if (cart[id] <= 0) delete cart[id];
    
    renderProducts();
    renderCart();
}

function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const totalEl = document.getElementById('total-price');
    let total = 0;
    
    const cartKeys = Object.keys(cart);
    if (cartKeys.length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart">ไม่มีสินค้าในตะกร้า</p>';
        totalEl.innerText = 0;
        return;
    }

    let html = '';
    cartKeys.forEach(id => {
        const product = products.find(p => p.id == id);
        const qty = cart[id];
        const itemTotal = product.price * qty;
        total += itemTotal;

        html += `
            <div class="cart-item">
                <div>
                    <strong>${product.name}</strong><br>
                    <small>${product.price} x ${qty}</small>
                </div>
                <div class="qty-control">
                    <button class="btn-qty" onclick="updateQty(${product.id}, -1)">-</button>
                    <span>${qty}</span>
                    <button class="btn-qty" onclick="updateQty(${product.id}, 1)">+</button>
                </div>
            </div>
        `;
    });

    cartContainer.innerHTML = html;
    totalEl.innerText = total;
}

function checkout() {
    if (Object.keys(cart).length === 0) {
        alert("กรุณาเลือกสินค้าก่อนทำการสั่งซื้อ");
        return;
    }
    alert("สั่งซื้อสำเร็จ! ขอบคุณที่ใช้บริการ Oilkhajo Buffet");
    cart = {};
    renderProducts();
    renderCart();
}

// Initial Render
renderProducts();