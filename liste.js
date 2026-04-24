/* liste.js
  'liste.html' sayfası için
  data.js'den verileri çeker ve listeler.
  GÜNCELLEME: Ürün kartındaki resim ve başlık linkleri
  'detay-urun.html?kategori=...&id=...' sayfasına yönlendirildi.
*/

// GÜNCELLEME: Kategori adları GÖZCÜGÜVENLİK projesine uyarlandı.
const KATEGORI_ADLARI = {
    // Hauptkomponenten (Vereinfacht)
    'cpu': 'Rekorder (DVR/NVR)', 
    'ssd': 'Festplatten (Speicher)',
    'motherboard': 'Kameras', 
    'alarm': 'Alarm & Sensoren',
    'gpu': 'Strom & Kabel', 
    'monitor': 'Monitore'
};

document.addEventListener('DOMContentLoaded', () => {
    console.log("liste.js: DOMContentLoaded tetiklendi.");

    if (typeof addToCart !== 'function' || typeof showNotification !== 'function' || typeof formatPrice !== 'function') {
         console.error("Fehler: cart.js Datei nicht geladen oder erforderliche Funktionen fehlen.");
         const container = document.getElementById('product-list-container');
         if(container) container.innerHTML = "<p>Produkte können nicht gelistet werden, da das Warenkorbsystem nicht geladen wurde.</p>";
         return;
    }
     console.log("liste.js: cart.js Funktionen gefunden.");

    const urlParams = new URLSearchParams(window.location.search);
    let kategori = urlParams.get('kategori');

    // Vitrin modunda otomatik kategori seçimi (Sayfa adına göre)
    const pagePath = decodeURIComponent(window.location.pathname);
    
    if (!kategori) {
        if (pagePath.includes('cevre-birimleri.html')) {
            kategori = 'alarm';
        } else if (pagePath.includes('bileşenler.html')) {
            kategori = 'motherboard';
        }
    }
     console.log("liste.js: Endgültige Kategorie:", kategori);

    const container = document.getElementById('product-list-container');
    const titleEl = document.getElementById('kategori-basligi');
    const descriptionEl = document.getElementById('kategori-aciklama');

    if (!container || !titleEl || !descriptionEl) {
         console.error("Fehler: Erforderliche Elemente in liste.html nicht gefunden.");
         if(container) container.innerHTML = "<p>Seitenstruktur konnte nicht geladen werden.</p>";
         else if (titleEl) titleEl.textContent = "Seitenfehler";
         return;
    }
     console.log("liste.js: Erforderliche HTML Elemente gefunden.");

    let products = null;
    let kategoriAdi = '';

    if (typeof DB === 'undefined') {
        console.error("Fehler: data.js konnte nicht geladen werden oder DB Objekt nicht gefunden.");
        titleEl.textContent = 'Datenfehler';
        descriptionEl.textContent = 'Produktdatenbank konnte nicht geladen werden.';
        return;
    }

    // Ürünleri DB[kategori] veya DB.peripherals[kategori] altından bulma mantığı
    if (kategori && DB[kategori] && Array.isArray(DB[kategori])) {
        products = DB[kategori];
        kategoriAdi = KATEGORI_ADLARI[kategori] || kategori.charAt(0).toUpperCase() + kategori.slice(1);
         console.log(`liste.js: Kategorie '${kategori}' unter DB gefunden.`);
    } else if (kategori && DB.peripherals && DB.peripherals[kategori] && Array.isArray(DB.peripherals[kategori])) {
        products = DB.peripherals[kategori];
        kategoriAdi = KATEGORI_ADLARI[kategori] || kategori.charAt(0).toUpperCase() + kategori.slice(1);
         console.log(`liste.js: Kategorie '${kategori}' unter DB.peripherals gefunden.`);
    } else {
         console.warn(`liste.js: Ungültige oder leere Kategorie: ${kategori}`);
        // Kategori bulunamazsa bu blok çalışır
        titleEl.textContent = 'Kategorie nicht gefunden';
        descriptionEl.textContent = `Die gesuchte Kategorie '${kategori}' wurde nicht gefunden oder diese Kategorie enthält keine Produkte.`;
        container.innerHTML = '';
        return;
    }

    // Başlık ve Sayfa Başlığını Güncelle
    titleEl.textContent = kategoriAdi;
    document.title = kategoriAdi;
    descriptionEl.textContent = `Alle ${kategoriAdi} der ausgewählten Kategorie werden aufgelistet.`; // Açıklamayı dinamikleştirme

    if (!products || products.length === 0) {
         console.log(`liste.js: '${kategori}' kategorisinde ürün bulunamadı.`);
        container.innerHTML = "<p>In dieser Kategorie wurden keine Produkte gefunden.</p>";
        return;
    }
     console.log(`liste.js: ${products.length} Produkte für Kategorie '${kategori}' werden aufgelistet...`);

    container.innerHTML = '';
    products.forEach((product, index) => {
        try {
            const productId = product.id || `unknown-${index}`;
            const productName = product.name || 'Unbekanntes Produkt';
            const productPrice = Number(product.price) || 0;
            const productImage = product.image || 'images/default-kamera.png';
            // Detay sayfası linki oluştur
            const detailLink = `detay-urun.html?kategori=${kategori}&id=${productId}`;

            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <a href="${detailLink}">
                    <img src="${productImage}" alt="${productName}" class="product-card-image" onerror="this.onerror=null; this.src='images/default-kamera.png'; this.alt='Bild konnte nicht geladen werden';">
                </a>
                <div class="product-card-content">
                    <h3 class="product-card-title">
                        <a href="${detailLink}">${productName}</a>
                    </h3>
                    <div class="product-card-footer">
                        <span class="product-card-price">${formatPrice(productPrice)}</span>
                        <button class="btn btn-primary btn-incele" data-id="${productId}" data-kategori="${kategori}">
                            <i class="fas fa-eye"></i> Anzeigen
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        } catch (e) {
             console.error(`liste.js: Fehler bei der Verarbeitung von Produkt #${index}:`, product, e);
        }
    });
     console.log("liste.js: Produktliste abgeschlossen.");

    // İncele Olay Dinleyicisi
    container.addEventListener('click', (e) => {
        const targetButton = e.target.closest('button.btn-incele');
        if (targetButton) {
            const productId = targetButton.getAttribute('data-id');
            const productKategori = targetButton.getAttribute('data-kategori');
             console.log(`liste.js: Anzeigen geklickt - ID: ${productId}, Kategorie: ${productKategori}`);
            // Detay sayfasına yönlendir
            window.location.href = `detay-urun.html?kategori=${productKategori}&id=${productId}`;
        }
    });
     console.log("liste.js: In den Warenkorb und Detail-Link Event Listener hinzugefügt.");

}); // DOMContentLoaded sonu