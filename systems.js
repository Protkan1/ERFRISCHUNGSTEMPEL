/* systems.js
  Fertige Sicherheitspakete auflisten.
*/

document.addEventListener('DOMContentLoaded', () => {
    const systemsListContainer = document.getElementById('ready-systems-list');
    if (!systemsListContainer) return;

    if (typeof DB === 'undefined' || !DB.readySystems) {
        console.error("Error: DB.readySystems not found.");
        return;
    }

    const readySystems = DB.readySystems;

    function formatPrice(price) {
        // Showcase mode - keine Preise anzeigen
        return '';
    }

    function renderPerformanceData(data) {
        if (!data || !data.benchmarks) return '';
        let description = langManager.getLocalValue(data, 'description');
        let html = `<p class="system-performance-desc">${description}</p><ul class="system-benchmarks">`;
        data.benchmarks.forEach(item => {
            let name = langManager.getLocalValue(item, 'name');
            let score = item.score || item.time || item.temp || item.features || (langManager.lang === 'de' ? 'Nicht angegeben' : 'Not specified');
            html += `<li><i class="fas fa-check-circle system-icon"></i> ${name}: <strong>${score}</strong></li>`;
        });
        html += `</ul>`;
        return html;
    }

    function renderSystems() {
        systemsListContainer.innerHTML = '';
        readySystems.forEach(system => {
            const specs = langManager.getLocalValue(system, 'specs');
            const specsHtml = (Array.isArray(specs) ? specs.map(spec => `<li><i class="fas fa-circle-notch"></i> ${spec}</li>`).join('') : '');
            const systemName = langManager.getLocalValue(system, 'name');
            const systemCard = document.createElement('div');
            systemCard.className = 'system-card';
            
            systemCard.innerHTML = `
                <div class="system-image-area">
                    <a href="sistem-detay.html?id=${system.id}">
                        <img src="${system.image || 'images/default-kasa.png'}" alt="${systemName}" class="system-image" onerror="this.src='images/default-kasa.png';">
                    </a>
                </div>
                <div class="system-content">
                    <h2 class="system-name">
                        <a href="sistem-detay.html?id=${system.id}">${systemName}</a>
                    </h2>
                    <div class="system-specs">
                        <h3><i class="fas fa-list"></i> ${t('included_components')}</h3>
                        <ul>${specsHtml}</ul>
                    </div>
                    <div class="system-performance">
                        <h3><i class="fas fa-chart-line"></i> ${t('package_features')}</h3>
                        ${renderPerformanceData(system.performanceData)}
                    </div>
                    <div class="system-footer">
                        <div class="system-price">${formatPrice(system.price)}</div>
                        <button class="btn btn-primary btn-incele-paket" data-id="${system.id}">
                            <i class="fas fa-eye"></i> ${t('btn_examine')}
                        </button>
                    </div>
                </div>
            `;
            systemsListContainer.appendChild(systemCard);
        });
    }


    renderSystems();

    window.addEventListener('languageChanged', () => {
        renderSystems();
    });
    
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-incele-paket');
        if (btn) {
            const systemId = btn.dataset.id;
            window.location.href = `sistem-detay.html?id=${systemId}`;
        }
    });
});