/* goliath.js
  GOLIATH ürünleri için sayfayı doldurur.
  data.js'den avaloidProducts'ı çeker ve HTML'e yerleştirir.
*/

document.addEventListener('DOMContentLoaded', () => {
    // Sepet fonksiyonlarının yüklü olup olmadığını kontrol et


    // Preisformatierung-Hilfsfunktion
    function formatPrice(price) {
        // Showcase mode - keine Preise anzeigen
        return '';
    }

    // GOLIATH kameralar listesi (Kamera Setleri)
    const camerasList = document.getElementById('goliath-cameras-list');
    if (camerasList && DB.motherboard) {
        camerasList.innerHTML = '';
        const cameraSets = DB.motherboard.filter(cam => cam.brand === 'GOLIATH' && cam.cameraCount);
        
        if (cameraSets.length === 0) {
            camerasList.innerHTML = '<p class="no-products">GOLIATH Kamera-Sets nicht gefunden.</p>';
        } else {
            cameraSets.forEach(camera => {
                const cameraCard = document.createElement('div');
                cameraCard.className = 'product-card';
                const features = camera.features || camera.features_de || camera.features_en || [];
                const name = camera.name || 'GOLIATH Kamera Set';
                
                cameraCard.innerHTML = `
                    <img src="${camera.image || 'images/default-camera.png'}" alt="${name}" class="product-card-image" onerror="this.src='images/default-camera.png';">
                    <div class="product-card-content">
                        <h3 class="product-card-title">${name}</h3>
                        <p class="product-brand">${camera.brand}</p>
                        <p class="product-features">${features.join(', ')}</p>
                        <div class="product-card-footer">
                            <span class="product-card-price">${formatPrice(camera.price)}</span>
                            <button class="btn btn-primary btn-incele" data-id="${camera.id}">
                                <i class="fas fa-eye"></i> Anzeigen
                            </button>
                        </div>
                    </div>
                `;
                camerasList.appendChild(cameraCard);
            });
        }
    }

    // GOLIATH tekli kameralar listesi
    const singleCamerasList = document.getElementById('goliath-single-cameras-list');
    if (singleCamerasList && DB.motherboard) {
        singleCamerasList.innerHTML = '';
        const singleCameras = DB.motherboard.filter(cam => cam.brand === 'GOLIATH' && !cam.cameraCount);
        
        if (singleCameras.length === 0) {
            singleCamerasList.innerHTML = '<p class="no-products">GOLIATH Einzelkameras nicht gefunden.</p>';
        } else {
            singleCameras.forEach(camera => {
                const cameraCard = document.createElement('div');
                cameraCard.className = 'product-card';
                const features = camera.features || camera.features_de || camera.features_en || [];
                const name = camera.name || 'GOLIATH Kamera';
                
                cameraCard.innerHTML = `
                    <img src="${camera.image || 'images/default-camera.png'}" alt="${name}" class="product-card-image" onerror="this.src='images/default-camera.png';">
                    <div class="product-card-content">
                        <h3 class="product-card-title">${name}</h3>
                        <p class="product-brand">${camera.brand}</p>
                        <p class="product-features">${features.join(', ')}</p>
                        <div class="product-card-footer">
                            <span class="product-card-price">${formatPrice(camera.price)}</span>
                            <button class="btn btn-primary btn-incele" data-id="${camera.id}">
                                <i class="fas fa-eye"></i> Anzeigen
                            </button>
                        </div>
                    </div>
                `;
                singleCamerasList.appendChild(cameraCard);
            });
        }
    }

    // GOLIATH kapı telefonları listesi
    const doorbellsList = document.getElementById('goliath-doorbells-list');
    if (doorbellsList && DB.doorbells) {
        doorbellsList.innerHTML = '';
        const goliathDoorbells = DB.doorbells.filter(doorbell => doorbell.brand === 'GOLIATH');
        
        if (goliathDoorbells.length === 0) {
            doorbellsList.innerHTML = '<p class="no-products">GOLIATH Türsprechanlagen nicht gefunden.</p>';
        } else {
            goliathDoorbells.forEach(doorbell => {
                const doorbellCard = document.createElement('div');
                doorbellCard.className = 'product-card';
                const features = doorbell.features || doorbell.features_de || doorbell.features_en || [];
                const name = doorbell.name || 'GOLIATH Türsprechanlage';
                
                doorbellCard.innerHTML = `
                    <img src="${doorbell.image || 'images/default-doorbell.png'}" alt="${name}" class="product-card-image" onerror="this.src='images/default-doorbell.png';">
                    <div class="product-card-content">
                        <h3 class="product-card-title">${name}</h3>
                        <p class="product-brand">${doorbell.brand}</p>
                        <p class="product-features">${features.join(', ')}</p>
                        <div class="product-card-footer">
                            <span class="product-card-price">${formatPrice(doorbell.price)}</span>
                            <button class="btn btn-primary btn-incele" data-id="${doorbell.id}">
                                <i class="fas fa-eye"></i> Anzeigen
                            </button>
                        </div>
                    </div>
                `;
                doorbellsList.appendChild(doorbellCard);
            });
        }
    }

    // Anzeigen Button Event Listener
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-incele');
        if (btn) {
            const productId = btn.dataset.id;
            // Detay sayfasına yönlendir
            window.location.href = `detay-urun.html?id=${productId}`;
        }
    });
});