/* cart.js (Vitrin Modu)
   Bu dosya sepete ekleme özelliklerini devre dışı bırakmak için güncellendi.
   Web sitesi şu an sadece vitrin/showcase olarak çalışmaktadır.
*/

function getCart() { return []; }
function saveCart(cart) { }
function updateCartCounter() { 
    const counter = document.getElementById('cart-item-count');
    if (counter) counter.style.display = 'none';
}
function showNotification(message) { 
    console.log("Bildirim (Pasif):", message);
}
function addToCart(product, type) { 
    console.log("Sepete ekleme devre dışı.");
}
function addSystemToCart(system, currentBuild, totalPrice) { 
    console.log("Sistem sepete ekleme devre dışı.");
}
function formatPrice(price) {
    // Showcase mode - no prices displayed
    return '';
}

document.addEventListener('DOMContentLoaded', updateCartCounter);