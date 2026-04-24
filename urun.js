/* urun.js
  ERFRISCHUNGSTEMPEL GmbH - Produkt Detail Seite
*/

document.addEventListener('DOMContentLoaded', () => {
    // Element Auswahl
    const loadingEl = document.getElementById('detail-loading');
    const contentEl = document.getElementById('detail-main-content');
    const titlePlaceholder = document.getElementById('detail-title-placeholder');
    const detailImage = document.getElementById('detail-image');
    const detailTitle = document.getElementById('detail-title');
    const detailDescription = document.getElementById('detail-description');
    const detailSpecsList = document.getElementById('detail-specs-list');
    const detailPrice = document.getElementById('detail-price');

    if (!loadingEl || !contentEl || !titlePlaceholder || !detailImage || !detailTitle || !detailPrice) {
        console.error("Kritische Elemente fehlen.");
        return;
    }

    // URL Parametreleri
    const urlParams = new URLSearchParams(window.location.search);
    let kategori = urlParams.get('kategori');
    const productId = urlParams.get('id');

    if (!productId) {
        titlePlaceholder.textContent = "Fehler: Ungültige Produkt ID.";
        return;
    }

    // Produkt Suchlogik
    if (typeof DB === 'undefined') {
        titlePlaceholder.textContent = 'Datenfehler: Auf Datenbank kann nicht zugegriffen werden.';
        return;
    }

    let product = null;

    // 1. Kategori biliniyorsa önce ona bak
    if (kategori) {
        if (DB[kategori] && Array.isArray(DB[kategori])) {
            product = DB[kategori].find(p => p.id === productId);
        }
        if (!product && DB.peripherals && DB.peripherals[kategori] && Array.isArray(DB.peripherals[kategori])) {
            product = DB.peripherals[kategori].find(p => p.id === productId);
        }
    }

    // 2. Kategori yoksa veya ürün kategoride bulunamadıysa tüm DB'yi tara
    if (!product) {
        // Ana kategorileri tara
        for (const key in DB) {
            if (Array.isArray(DB[key])) {
                product = DB[key].find(p => p.id === productId);
                if (product) {
                    kategori = key;
                    break;
                }
            }
        }
        // Peripherals altını tara
        if (!product && DB.peripherals) {
            for (const key in DB.peripherals) {
                if (Array.isArray(DB.peripherals[key])) {
                    product = DB.peripherals[key].find(p => p.id === productId);
                    if (product) {
                        kategori = key;
                        break;
                    }
                }
            }
        }
    }

    if (!product) {
        titlePlaceholder.textContent = "Fehler: Produkt nicht gefunden.";
        return;
    }

    // Sayfayı Doldur
    loadingEl.style.display = 'none';
    contentEl.style.display = 'grid';

    document.title = `${product.name} | ERFRISCHUNGSTEMPEL GmbH`;
    
    detailImage.src = product.image || 'images/default-kamera.png';
    detailImage.alt = product.name;
    detailTitle.textContent = product.name;
    detailPrice.textContent = ''; // Hide price for showcase

    // Technische Details erstellen
    if (detailSpecsList) {
        detailSpecsList.innerHTML = '';
        
        // Temel Özellikler
        if (product.resolution) addSpec('Auflösung', product.resolution);
        if (product.brand) addSpec('Marke', product.brand);
        if (product.connection) addSpec('Verbindungstyp', product.connection);
        
        // Detaylar objesi varsa
        if (product.details) {
            for (const [key, value] of Object.entries(product.details)) {
                addSpec(key, value);
            }
        }
        
        // Features array varsa
        if (Array.isArray(product.features)) {
            product.features.forEach(f => addSpec('Eigenschaft', f));
        }

        if (detailSpecsList.innerHTML === '') {
            detailSpecsList.innerHTML = '<li>Für dieses Produkt wurden keine technischen Details eingegeben.</li>';
        }
    }

    function addSpec(label, value) {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${label}:</strong> ${value}`;
        detailSpecsList.appendChild(li);
    }
});