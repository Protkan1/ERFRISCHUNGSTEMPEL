/* detay.js
  ERFRISCHUNGSTEMPEL GmbH - Hazır Sistem Detay Sayfası Mantığı
*/

let currentBuild = { cpu: null, motherboard: null, ram: null }; // cpu=DVR/NVR, motherboard=HDD, ram=Kamera
let originalSystem = null; 
let basePrice = 0;

const componentMap = {
    'cpu': 'Rekorder (DVR / NVR)',
    'motherboard': 'Festplatte (Speicher)',
    'ram': 'Kameraanzahl und Modell'
};

const i18n_componentMap = {
    'cpu': { de: 'Rekorder (DVR / NVR)', en: 'Recorder (DVR / NVR)' },
    'motherboard': { de: 'Festplatte (Speicher)', en: 'Hard Drive (Storage)' },
    'ram': { de: 'Kameraanzahl und Modell', en: 'Camera Count and Model' }
};

function getComponentTitle(type) {
    const lang = langManager.lang || 'de';
    return i18n_componentMap[type] ? i18n_componentMap[type][lang] : type;
}

function formatPrice(price) {
    // Showcase mode - no prices displayed
    return '';
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("detay.js: Gestartet.");

    const loadingEl = document.getElementById('detail-loading');
    const contentEl = document.getElementById('detail-main-content');
    const titlePlaceholder = document.getElementById('detail-title-placeholder');
    const detailImage = document.getElementById('detail-image');
    const detailTitle = document.getElementById('detail-title');
    const detailPrice = document.getElementById('detail-price');
    const detailDescription = document.getElementById('detail-description');
    
    const elements = { loadingEl, contentEl, titlePlaceholder, detailImage, detailTitle, detailPrice, detailDescription };
    for (const [name, el] of Object.entries(elements)) {
        if (!el) {
            console.error(`Fehlendes Element: ${name}`);
            if (loadingEl) loadingEl.innerHTML = `<h1>${t('config_error')}</h1>`;
            return;
        }
    }

    const urlParams = new URLSearchParams(window.location.search);
    const systemId = urlParams.get('id');

    if (!systemId || typeof DB === 'undefined' || !DB.readySystems) {
        titlePlaceholder.textContent = t('error_db');
        return;
    }

    originalSystem = DB.readySystems.find(s => s.id === systemId);
    if (!originalSystem) {
        titlePlaceholder.textContent = t('error_not_found');
        return;
    }

    // Başlangıç Ayarları
    currentBuild = { ...originalSystem.componentIDs };
    loadingEl.style.display = 'none';
    contentEl.style.display = 'flex';
    
    const systemName = langManager.getLocalValue(originalSystem, 'name');
    document.title = `${systemName} | ERFRISCHUNGSTEMPEL GmbH`;
    detailImage.src = originalSystem.image || 'images/default-paket.png';
    detailTitle.textContent = systemName;
    detailDescription.textContent = langManager.getLocalValue(originalSystem.performanceData, 'description') || "";

    // Fiyat Hesaplama
    calculateAndShowPrice();
    
    // Tab İçerikleri
    updateTabs(originalSystem);
    updateBuilderUI();

    // Event Listeners - Tablar
    document.querySelectorAll('.tab-link').forEach(link => {
        link.onclick = () => {
            document.querySelectorAll('.tab-link').forEach(l => l.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            link.classList.add('active');
            document.getElementById(link.dataset.tab).classList.add('active');
        };
    });

    // Event Listeners - Seçim Butonları
    document.querySelectorAll('.btn-select').forEach(btn => {
        btn.onclick = () => openModal(btn.dataset.type);
    });

    window.addEventListener('languageChanged', () => {
        calculateAndShowPrice();
        updateTabs(originalSystem);
        updateBuilderUI();
        const systemName = langManager.getLocalValue(originalSystem, 'name');
        detailTitle.textContent = systemName;
        detailDescription.textContent = langManager.getLocalValue(originalSystem.performanceData, 'description') || "";
    });
});

function calculatePrice() {
    let total = 0;
    for (const type in currentBuild) {
        const partId = currentBuild[type];
        if (partId && DB[type]) {
            const part = DB[type].find(p => p.id === partId);
            if (part) total += part.price;
        }
    }
    const originalTotal = originalSystem.price || 0;
    return total > 0 ? total : originalTotal;
}

function calculateAndShowPrice() {
    const price = calculatePrice();
    const priceEl = document.getElementById('detail-price');
    if (priceEl) priceEl.textContent = formatPrice(price);
}

function updateTabs(system) {
    const perfList = document.getElementById('detail-games-list');
    const techList = document.getElementById('detail-benchmarks-list');
    
    if (perfList && system.performanceData?.benchmarks) {
        perfList.innerHTML = '';
        system.performanceData.benchmarks.forEach(b => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${langManager.getLocalValue(b, 'name')}:</strong> <span>${b.score || b.time || b.temp}</span>`;
            perfList.appendChild(li);
        });
    }

    if (techList) {
        techList.innerHTML = `<li>${langManager.lang === 'de' ? 'Alle Komponenten in diesem Paket sind miteinander kompatibel.' : 'All components in this package are compatible with each other.'}</li>`;
    }
}

function updateBuilderUI() {
    for (const type in currentBuild) {
        const partId = currentBuild[type];
        const selectedEl = document.getElementById(`selected-${type}`);
        const imgEl = document.getElementById(`img-${type}`);
        
        if (partId && DB[type]) {
            const part = DB[type].find(p => p.id === partId);
            if (part) {
                if (selectedEl) selectedEl.textContent = langManager.getLocalValue(part, 'name');
                if (imgEl) imgEl.src = part.image || `images/icon-${type}.png`;
            }
        }
    }
}

function openModal(type) {
    const modal = document.getElementById('product-modal');
    const modalTitle = document.getElementById('modal-title');
    const list = document.getElementById('modal-product-list');
    
    modalTitle.textContent = `${getComponentTitle(type)} ${langManager.lang === 'de' ? 'Auswählen' : 'Select'}`;
    list.innerHTML = '';
    
    if (DB[type]) {
        DB[type].forEach(p => {
            const item = document.createElement('div');
            item.className = 'modal-product-item';
            item.innerHTML = `
                <img src="${p.image}" class="modal-product-image">
                <div class="product-info">
                    <div class="modal-product-name">${langManager.getLocalValue(p, 'name')}</div>
                    <div class="modal-product-price">${formatPrice(p.price)}</div>
                </div>
                <button class="btn-modal-select" onclick="selectPart('${type}', '${p.id}')">${t('add')}</button>
            `;
            list.appendChild(item);
        });
    }
    modal.classList.add('visible');
}


window.selectPart = (type, id) => {
    currentBuild[type] = id;
    updateBuilderUI();
    calculateAndShowPrice();
    document.getElementById('product-modal').classList.remove('visible');
};

document.getElementById('close-modal-btn').onclick = () => {
    document.getElementById('product-modal').classList.remove('visible');
};