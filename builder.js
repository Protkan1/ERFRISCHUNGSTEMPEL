/* builder.js
 * GÜNCELLEME: Nur 'cpu' (Rekorder), 'motherboard' (Festplatte) und 'ram' (Kamera) Kategorien.
 * DİKKAT: currentBuild data-type Namen (cpu, motherboard, ram) bleiben für Kompatibilität GLEICH.
 * ÖNEMLİ DÜZELTME: Datenabfrage (DB[type]) auf neue Schlüssel in 'data.js' umgeleitet.
 */

// DOM Elemente auswählen
const selectButtons = document.querySelectorAll('.btn-select');
const modalOverlay = document.getElementById('product-modal');
const modalTitle = document.getElementById('modal-title');
const modalProductList = document.getElementById('modal-product-list');
const closeModalBtn = document.getElementById('close-modal-btn');
const summaryList = document.getElementById('summary-list');
const totalPriceEl = document.getElementById('total-price');
const addToCartBtn = document.querySelector('.btn-add-to-cart');

// Aktuelles Systemobjekt (Nur 3 benötigte Komponenten)
let currentBuild = {
    cpu: null, // Rekorder
    motherboard: null, // Festplatte
    ram: null // Kamera
};

// Aktuell ausgewählter Komponententyp speichern
let currentSelectionType = null;

// Preisformatierung-Hilfsfunktion
function formatPrice(price) {
    // Showcase mode - keine Preise anzeigen
    return '';
}

// === Kompatibilitäts- und Filterfunktionen ===

// Bestimmt den korrekten Datenschlüssel für den ausgewählten Typ
function getDataKey(type) {
    if (type === 'motherboard') return 'ssd'; // Festplattendaten vom 'ssd'-Schlüssel holen
    if (type === 'ram') return 'motherboard'; // Kameradaten vom 'motherboard'-Schlüssel holen
    return type; // 'cpu' (Rekorder) bleibt 'cpu'
}

function getFilteredProducts(type) {
    // 1. KORREKTUR: Datenschlüssel korrekt bestimmen und Daten abrufen
    const dataKey = getDataKey(type);
    let allProducts = DB[dataKey];
    
    if (!allProducts || !Array.isArray(allProducts)) return [];

    // Aktuell ausgewählte Produktobjekte abrufen (nicht ID)
    const currentDvr = currentBuild.cpu; // Rekorder
    
    // 2. Kamera (ram) Auswahl filtern
    if (type === 'ram' && currentDvr) {
        // Rekorder (cpu) Typ-basierte Einschränkung
        const dvrType = currentDvr.type; 

        return allProducts.filter(camera => {
             // Typ-Kompatibilität: (z.B.: NVR nur IP Kamera, DVR nur HD Kamera unterstützt)
             const typeMatch = (dvrType === 'NVR' && camera.connection === 'IP') || 
                               (dvrType === 'DVR' && camera.connection === 'HD');
             
             return typeMatch;
        });
    }
    
    // Festplatte oder Rekorder - vorerst keine zusätzliche Filterung
    return allProducts; 
}


// === Modal (Fenster) Funktionen ===

function openModal(componentType) {
    currentSelectionType = componentType;
    let displayTitle = '';
    
    if (componentType === 'cpu') displayTitle = 'Rekorder (DVR/NVR) Auswählen';
    else if (componentType === 'motherboard') displayTitle = 'Festplatte (Speicher) Auswählen';
    else if (componentType === 'ram') displayTitle = 'Kamera Auswählen';
    else displayTitle = `${componentType.toUpperCase()} Auswählen`; 

    modalTitle.textContent = displayTitle;
    modalProductList.innerHTML = '';
    
    const products = getFilteredProducts(componentType);

    if (!products || products.length === 0) {
        modalProductList.innerHTML = '<p class="modal-product-name">In dieser Kategorie wurden keine mit Ihren anderen Teilen kompatiblen Produkte gefunden.</p>';
    } else {
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'modal-product-item';
            
            let specHtml = '';
            // Kompatibilitätsparameter an Sicherheitssystem anpassen:
            if(product.maxChannels) specHtml += `<span>Kanäle: ${product.maxChannels}</span>`; // Für Rekorder
            if(product.capacity) specHtml += `<span style="margin-left:10px;">Kapazität: ${product.capacity}</span>`; // Für HDD
            if(product.resolution) specHtml += ` <span style="margin-left:10px;">Auflösung: ${product.resolution}</span>`; // Für Kamera

            productItem.innerHTML = `
                <img src="${product.image || 'images/default-kamera.png'}" alt="${product.name || '?'}" class="modal-product-image">
                <div class="product-info">
                    <div class="modal-product-name">${product.name || '?'}</div>
                    ${specHtml ? `<div class="modal-product-spec">${specHtml}</div>` : ''}
                </div>
                <div class="modal-product-price">${formatPrice(product.price || 0)}</div>
                <button class="btn-modal-select" data-id="${product.id}">Hinzufügen</button>
            `;
            modalProductList.appendChild(productItem);
        });
    }

    modalOverlay.classList.add('visible');
}

function closeModal() {
    modalOverlay.classList.remove('visible');
    currentSelectionType = null;
}

// === Komponentenauswahl ===

function selectProduct(productId) {
    // 2. KORREKTUR: Produkt aus DB mit korrektem Schlüssel abrufen
    const dataKey = getDataKey(currentSelectionType);
    const product = DB[dataKey]?.find(p => p.id === productId);
    
    if (!product) {
        console.error("Ausgewähltes Produkt nicht gefunden:", dataKey, productId);
        closeModal();
        return;
    }
    
    // PRODUKTOBJEKT in currentBuild mit korrektem type-Schlüssel speichern
    currentBuild[currentSelectionType] = product; 
    
    // Oberfläche aktualisieren 
    const selectedItemText = document.getElementById(`selected-${currentSelectionType}`);
    const componentImage = document.getElementById(`img-${currentSelectionType}`);
    if (selectedItemText) selectedItemText.textContent = product.name;
    if (selectedItemText) selectedItemText.classList.add('chosen');
    
    // 3. KORREKTUR: Visuellen Pfad mit korrektem Standardnamen aktualisieren
    if (componentImage) {
        let defaultImage = `images/default-${currentSelectionType}.png`;
        if (currentSelectionType === 'cpu') defaultImage = 'images/default-dvr.png';
        else if (currentSelectionType === 'motherboard') defaultImage = 'images/default-hdd.png'; // Festplatte
        else if (currentSelectionType === 'ram') defaultImage = 'images/default-kamera.png'; // Kamera
        
        componentImage.src = product.image || defaultImage;
    }
    
    // Kompatibilitätsprüfung und andere Teile zurücksetzen
    if (currentSelectionType === 'cpu') {
        const dvr = product;
        const camera = currentBuild.ram; // Kamera (ram)
        
        // Wenn Kamera ausgewählt UND nicht mit DVR-Typ kompatibel, zurücksetzen
        if (camera) {
             const dvrType = dvr.type; 
             const cameraConnection = camera.connection; 
             if ((dvrType === 'NVR' && cameraConnection !== 'IP') || (dvrType === 'DVR' && cameraConnection !== 'HD')) {
                 clearSelection('ram');
                 showNotification("Warnung: Kamera nicht mit Rekorder-Typ kompatibel, zurückgesetzt!");
             }
        }
    }
    
    updateSummary(); 
    updateTotalPrice(); 
    checkCompatibilityAndUnlock(); 
    closeModal();
}

function clearSelection(type) {
    currentBuild[type] = null;
    
    const selectedItemText = document.getElementById(`selected-${type}`);
    const componentImage = document.getElementById(`img-${type}`);

    if (selectedItemText) {
        selectedItemText.textContent = (type === 'cpu' || type === 'motherboard') ? "Noch nicht ausgewählt (Erforderlich)" : "Noch nicht ausgewählt (Min. 1 Stück)";
        selectedItemText.classList.remove('chosen');
    }

    // 4. KORREKTUR: Visuelle Bereinigung mit korrektem Standardbild verwenden
    if (componentImage) {
        let defaultImageName = `default-${type}.png`;
        if (type === 'cpu') defaultImageName = 'default-dvr.png';
        else if (type === 'motherboard') defaultImageName = 'default-hdd.png'; // Festplatte
        else if (type === 'ram') defaultImageName = 'default-kamera.png'; // Kamera
        
        componentImage.src = `images/${defaultImageName}`;
    }

    // Kettenbereinigung
    // Wenn Rekorder (CPU) bereinigt wird, müssen Kamera (RAM) und Festplatte (Mobo) bereinigt werden.
    if(type === 'cpu') {
        clearSelection('motherboard'); 
        clearSelection('ram');
    }
    
    updateSummary();
    updateTotalPrice();
    checkCompatibilityAndUnlock();
}


// === Zusammenfassung und Gesamtpreis Aktualisierung ===

function updateSummary() {
    summaryList.innerHTML = '';
    let hasItems = false;
    const requiredTypes = ['cpu', 'motherboard', 'ram'];
    let allRequiredSelected = true;

    // Zusammenfassungsliste füllen
    requiredTypes.forEach(type => {
        const product = currentBuild[type];
        if (product) {
            hasItems = true;
            const summaryItem = document.createElement('div');
            summaryItem.className = 'summary-item';
            
            let componentName = '';
            if (type === 'cpu') componentName = 'Rekorder';
            else if (type === 'motherboard') componentName = 'Festplatte';
            else if (type === 'ram') componentName = 'Kamera';
            
            summaryItem.innerHTML = `
                <span class="summary-item-name">${componentName}: ${product.name || '?'}</span>
                <span class="summary-item-price">${formatPrice(product.price || 0)}</span>
            `;
            summaryList.appendChild(summaryItem);
        } else {
            allRequiredSelected = false;
        }
    });

    if (!hasItems) {
        summaryList.innerHTML = '<p class="summary-placeholder">Noch keine Teile ausgewählt.</p>';
    }
    
    // In den Warenkorb Button aktivieren/deaktivieren
    if(addToCartBtn) addToCartBtn.disabled = !allRequiredSelected;
}

function updateTotalPrice() {
    let total = 0;
    for (const type in currentBuild) {
        if (currentBuild[type] && typeof currentBuild[type].price === 'number') {
            total += currentBuild[type].price;
        }
    }
    if(totalPriceEl) totalPriceEl.textContent = formatPrice(total);
    return total;
}

function checkCompatibilityAndUnlock() {
    const hddButton = document.querySelector('button[data-type="motherboard"]');
    const cameraButton = document.querySelector('button[data-type="ram"]');
    
    // Festplatte und Kamera Auswahl erfordert ausgewählten Rekorder (cpu)
    if(hddButton) hddButton.disabled = !currentBuild.cpu; 
    if(cameraButton) cameraButton.disabled = !currentBuild.cpu; 
}

// === Event Listener ===

// "Auswählen" Buttons
selectButtons.forEach(button => {
    button.addEventListener('click', () => {
        const componentType = button.getAttribute('data-type');
        openModal(componentType);
    });
});

// Modal Schließen
if(closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
if(modalOverlay) modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

// Auswahl aus Modal
if(modalProductList) modalProductList.addEventListener('click', (e) => {
    const targetButton = e.target.closest('button.btn-modal-select');
    if (targetButton) { 
        const productId = targetButton.getAttribute('data-id');
        if(productId) selectProduct(productId);
    }
});

// ===============================================
// In den Warenkorb Button Event Listener
// ===============================================
if (addToCartBtn) {
    if (typeof addSystemToCart === 'undefined' || typeof showNotification === 'undefined') {
        console.error("Fehler: cart.js nicht geladen oder addSystemToCart Funktion fehlt. In den Warenkorb Funktion wird nicht arbeiten.");
        addToCartBtn.disabled = true;
        addToCartBtn.textContent = "Warenkorb Fehler";
    } else {
        addToCartBtn.addEventListener('click', () => {
            if (!addToCartBtn.disabled) {
                const totalPrice = updateTotalPrice();

                let buildIDs = {};
                let isValidBuild = true;
                const requiredTypes = ['cpu', 'motherboard', 'ram'];

                requiredTypes.forEach(type => {
                    if (currentBuild[type]) {
                        buildIDs[type] = currentBuild[type].id;
                    } else {
                        isValidBuild = false;
                        showNotification(`Fehler: ${type.toUpperCase()} nicht ausgewählt!`);
                    }
                });

                if (isValidBuild) {
                    const customSystemData = {
                        id: `custom-${Date.now()}`,
                        name: "Benutzerdefiniertes Sicherheitssystem",
                        image: currentBuild.cpu?.image || 'images/default-dvr.png', 
                    };

                    addSystemToCart(customSystemData, buildIDs, totalPrice);
                    showNotification("Ihr benutzerdefiniertes System wurde zum Warenkorb hinzugefügt!");
                }
            }
        });
    }
} else {
    console.error("In den Warenkorb Button nicht gefunden!");
}

// Status beim ersten Seitenladen einstellen
checkCompatibilityAndUnlock();
updateSummary();
updateTotalPrice();