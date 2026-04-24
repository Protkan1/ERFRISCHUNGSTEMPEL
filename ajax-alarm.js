/* ajax-alarm.js
  Lists AJAX Alarm products.
*/

document.addEventListener('DOMContentLoaded', () => {
    if (typeof DB === 'undefined' || !DB.peripherals || !Array.isArray(DB.peripherals.alarm)) {
        console.error('Error: DB.peripherals.alarm not found.');
        return;
    }

    const alarmItems = DB.peripherals.alarm;

    function formatPrice(price) {
        // Showcase mode - keine Preise anzeigen
        return '';
    }

    function renderProducts() {
        const container = document.getElementById('ajax-alarm-list');
        if (!container) return;

        const ajaxItems = alarmItems.filter(item => item.brand === 'AJAX');
        container.innerHTML = '';
        
        if (ajaxItems.length === 0) {
            container.innerHTML = `<p class="no-products">${langManager.lang === 'de' ? 'Keine AJAX-Produkte gefunden.' : 'No AJAX products found.'}</p>`;
            return;
        }

        ajaxItems.forEach(item => {
            const name = langManager.getLocalValue(item, 'name');
            const features = langManager.getLocalValue(item, 'features');
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${item.image || 'images/default-alarm.png'}" alt="${name}" class="product-card-image" onerror="this.src='images/default-alarm.png';">
                <div class="product-card-content">
                    <h3 class="product-card-title">${name}</h3>
                    <p class="product-brand">${item.brand}</p>
                    <p class="product-features">${Array.isArray(features) ? features.join(', ') : ''}</p>
                    <div class="product-card-footer">
                        <span class="product-card-price">${formatPrice(item.price)}</span>
                        <button class="btn btn-primary btn-incele" data-id="${item.id}">
                            <i class="fas fa-eye"></i> Anzeigen
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }

    renderProducts();

    window.addEventListener('languageChanged', () => {
        renderProducts();
    });

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-incele');
        if (btn) {
            const productId = btn.dataset.id;
            window.location.href = `detay-urun.html?id=${productId}`;
        }
    });
});

