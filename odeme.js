/* odeme.js
  'odeme.html' sayfasının mantığını yönetir.
  Sepeti gösterir, formu (şimdilik görsel) işler,
  siparişi tamamlar (mesaj gösterir, sepeti temizler).
*/

document.addEventListener('DOMContentLoaded', () => {
    console.log("odeme.js: DOMContentLoaded tetiklendi.");

    // Gerekli cart.js fonksiyonlarını kontrol et
    if (typeof getCart !== 'function' || typeof saveCart !== 'function' || typeof formatPrice !== 'function' || typeof updateCartCounter !== 'function' || typeof showNotification !== 'function') {
        console.error("Hata: cart.js yüklenemedi veya gerekli fonksiyonlar eksik.");
        const checkoutContent = document.getElementById('checkout-content');
        if (checkoutContent) checkoutContent.innerHTML = "<h2>Hata: Ödeme sayfası yüklenemedi. Sepet sistemi bulunamadı.</h2>";
        return;
    }
    console.log("odeme.js: cart.js fonksiyonları bulundu.");

    // HTML Elementlerini Seç
    const checkoutItemsList = document.getElementById('checkout-items-list');
    const checkoutTotalEl = document.getElementById('checkout-total');
    const completeOrderButton = document.getElementById('complete-order-button');
    const deliveryForm = document.getElementById('delivery-form');
    const checkoutContent = document.getElementById('checkout-content'); // Form ve özeti içeren ana div
    const orderSuccessMessage = document.getElementById('order-success'); // Başarı mesajı div'i

    // Elementler bulundu mu kontrol et
    if (!checkoutItemsList || !checkoutTotalEl || !completeOrderButton || !deliveryForm || !checkoutContent || !orderSuccessMessage) {
        console.error("Hata: odeme.html sayfasında gerekli HTML elementlerinden biri veya birkaçı bulunamadı. ID'leri kontrol et.");
        if (checkoutContent) checkoutContent.innerHTML = "<h2>Sayfa Hatası: Ödeme arayüzü yüklenemedi.</h2>";
        return;
    }
     console.log("odeme.js: Gerekli HTML elementleri bulundu.");

    let currentCart = []; // O anki sepeti saklamak için

    // Sipariş özetini ve toplamı güncelleyen fonksiyon
    function renderCheckoutSummary() {
         console.log("odeme.js: renderCheckoutSummary() çağrıldı.");
        currentCart = getCart(); // Sepeti al
        checkoutItemsList.innerHTML = ''; // Listeyi temizle
        let total = 0;

        if (!Array.isArray(currentCart) || currentCart.length === 0) {
             console.log("odeme.js: Sepet boş, ana sayfaya yönlendiriliyor.");
            // Sepet boşsa belki kullanıcıyı sepet sayfasına veya ana sayfaya yönlendirebiliriz.
            checkoutItemsList.innerHTML = '<p>Sepetiniz boş. Ödeme yapmak için önce sepetinize ürün eklemelisiniz.</p>';
            checkoutTotalEl.textContent = formatPrice(0);
            completeOrderButton.disabled = true; // Butonu pasif yap
            return;
        }

        // Sepet doluysa özet listesini oluştur
        currentCart.forEach(item => {
            const itemPrice = Number(item.price) || 0;
            const itemQuantity = Number(item.quantity) || 1;
            const lineTotal = itemPrice * itemQuantity;
            total += lineTotal;

            const itemElement = document.createElement('div');
            itemElement.className = 'checkout-item'; // Basit bir özet satırı stili için
            itemElement.innerHTML = `
                <span class="checkout-item-name">${item.name || 'Unbekanntes Produkt'} (x${itemQuantity})</span>
                <span class="checkout-item-price">${formatPrice(lineTotal)}</span>
            `;
            checkoutItemsList.appendChild(itemElement);
        });

        // Toplam tutarı güncelle
        checkoutTotalEl.textContent = formatPrice(total);
        completeOrderButton.disabled = false; // Butonu aktif yap
         console.log("odeme.js: Özet oluşturuldu. Toplam:", total);
    }

    // "Siparişi Tamamla" butonuna tıklanınca çalışacak fonksiyon
    function completeOrder(event) {
        event.preventDefault(); // Formun gerçekten gönderilmesini engelle
         console.log("odeme.js: Siparişi Tamamla butonuna tıklandı.");

        // Basit form doğrulaması (Boş alan var mı?)
        let formValid = true;
        const requiredFields = deliveryForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                formValid = false;
                // Alanı vurgulayabiliriz (isteğe bağlı)
                 field.style.border = '1px solid red'; 
                 // İlk boş alana odaklan
                 if(formValid) field.focus(); 
            } else {
                 field.style.border = ''; // Hata yoksa vurguyu kaldır
            }
        });

        if (!formValid) {
            console.warn("odeme.js: Form doğrulaması başarısız. Eksik alanlar var.");
            showNotification("Lütfen teslimat bilgilerindeki tüm zorunlu alanları doldurun.");
            return; // Fonksiyondan çık
        }
         console.log("odeme.js: Form doğrulandı.");

        // 1. Başarı Mesajını Göster
        checkoutContent.style.display = 'none'; // Formu ve özeti gizle
        orderSuccessMessage.style.display = 'flex'; // Başarı mesajını göster

        // 2. Sepeti Temizle (localStorage'dan)
        saveCart([]); // Boş bir dizi kaydederek sepeti temizle
         console.log("odeme.js: Sepet temizlendi.");

        // 3. (İsteğe Bağlı) Navbar Sayacını hemen güncelle (saveCart zaten yapıyor ama garanti olsun)
        updateCartCounter(); 

        // 4. (İsteğe Bağlı) Birkaç saniye sonra ana sayfaya yönlendir
        setTimeout(() => {
             console.log("odeme.js: Ana sayfaya yönlendiriliyor...");
            window.location.href = 'index.html'; 
        }, 5000); // 5 saniye sonra
    }

    // --- Başlangıç ---

    // Sayfa ilk yüklendiğinde özet alanını doldur
    renderCheckoutSummary();

    // "Siparişi Tamamla" butonuna olay dinleyici ekle
    completeOrderButton.addEventListener('click', completeOrder);
     console.log("odeme.js: Olay dinleyiciler eklendi.");

}); // DOMContentLoaded sonu