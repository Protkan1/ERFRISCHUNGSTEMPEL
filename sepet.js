/* sepet.js
  'sepet.html' Seite Logik.
  cart.js'den Warenkorbdaten abrufen, auflisten,
  Mengenänderungs- und Löschfunktionen hinzufügen,
  Gesamtpreis berechnen.
  (renderCart Funktion stabiler gemacht)
  (UPDATE: Zahlungs-Link anzeigen/ausblenden hinzugefügt)
*/

document.addEventListener('DOMContentLoaded', () => {
    console.log("sepet.js: DOMContentLoaded ausgelöst."); // DEBUG

    // Gerekli fonksiyonlar cart.js'den geliyor mu kontrol et
    if (typeof getCart !== 'function' || typeof saveCart !== 'function' || typeof formatPrice !== 'function' || typeof updateCartCounter !== 'function' || typeof showNotification !== 'function' ) {
        console.error("Fehler: cart.js nicht geladen oder erforderliche Funktionen (getCart, saveCart, formatPrice, updateCartCounter, showNotification) fehlen.");
        const cartItemsList = document.getElementById('cart-items-list');
        if (cartItemsList) cartItemsList.innerHTML = '<div class="cart-empty"><p>Warenkorbsystem konnte beim Laden nicht initialisiert werden.</p></div>';
        const cartSummaryBox = document.getElementById('cart-summary-box');
        if(cartSummaryBox) cartSummaryBox.style.display = 'none';
        return;
    }
     console.log("sepet.js: cart.js Funktionen gefunden."); // DEBUG

    // HTML Elemente auswählen
    const cartItemsList = document.getElementById('cart-items-list');
    const cartEmptyMessage = document.getElementById('cart-empty-message');
    const summarySubtotal = document.getElementById('summary-subtotal');
    const summaryTotal = document.getElementById('summary-total');
    // const checkoutButton = document.getElementById('checkout-button'); // Bu artık bir link <a>
    const checkoutLink = document.getElementById('checkout-button'); // ID'si aynı kaldı
    const cartSummaryBox = document.getElementById('cart-summary-box');

    // Prüfen ob Elemente gefunden wurden
    if (!cartItemsList || !cartEmptyMessage || !summarySubtotal || !summaryTotal || !checkoutLink || !cartSummaryBox) {
        console.error("Fehler: Ein oder mehrere HTML Elemente in sepet.html nicht gefunden. IDs prüfen:",
                      { cartItemsList, cartEmptyMessage, summarySubtotal, summaryTotal, checkoutLink, cartSummaryBox });
        if(cartItemsList) cartItemsList.innerHTML = '<div class="cart-empty"><p>Fehler beim Laden der Seitenstruktur.</p></div>';
        return;
    }
     console.log("sepet.js: Erforderliche HTML Elemente gefunden."); // DEBUG

    // Hauptfunktion zum Aktualisieren von Warenkorb und Zusammenfassung
    function renderCart() {
        console.log("sepet.js: renderCart() aufgerufen."); // DEBUG
        let cart = []; // Anfangs leeres Array
        try {
             cart = getCart(); // Warenkorb von cart.js abrufen
             console.log("sepet.js: Empfangener Warenkorb:", JSON.stringify(cart)); // DEBUG: Warenkorb Inhalt als String ausgeben
        } catch (e) {
             console.error("sepet.js: getCart() Fehler:", e);
             cartItemsList.innerHTML = '<div class="cart-empty"><p>Fehler beim Lesen der Warenkorbdaten.</p></div>';
             cartEmptyMessage.style.display = 'none';
             cartSummaryBox.style.display = 'none';
             if(checkoutLink) checkoutLink.style.display = 'none'; // Hata durumunda linki gizle
             return;
        }

        // Anfangs Liste leeren, leere Nachricht und Zusammenfassung ausblenden
        cartItemsList.innerHTML = '';
        cartEmptyMessage.style.display = 'none';
        cartSummaryBox.style.display = 'none';
        checkoutLink.style.display = 'none'; // Linki de gizle

        // Prüfen ob Warenkorb leer ist (sicherere Prüfung)
        if (!Array.isArray(cart) || cart.length === 0) {
            console.log("sepet.js: Warenkorb leer oder ungültiges Format."); // DEBUG
            cartEmptyMessage.style.display = 'flex'; // NUR leere Nachricht anzeigen
            // checkoutLink zaten gizli
            return; // Funktion beenden
        }

        // Wenn Warenkorb voll ist, mit Operationen fortfahren
        console.log(`sepet.js: Warenkorb voll (${cart.length} Produkte), Produkte werden gerendert...`); // DEBUG
        cartSummaryBox.style.display = 'block'; // Zusammenfassung anzeigen
        checkoutLink.style.display = 'inline-block'; // <<<--- NEU: Link sichtbar machen (für <a> inline-block besser geeignet)

        let subtotal = 0;
        let renderError = false; // Wenn Fehler beim Rendern auftreten, markieren

        cart.forEach((item, index) => {
            try {
                const itemId = item.id || `item-${index}`;
                const itemType = item.type || 'component';
                const itemName = item.name || 'Unbekanntes Produkt';
                const itemPrice = Number(item.price) || 0;
                const itemQuantity = Number(item.quantity) || 1;
                const itemImage = item.image || 'images/default-gpu.png';

                if (isNaN(itemPrice) || itemPrice < 0) console.warn(`Produkt ${itemId} hat ungültigen Preis:`, item.price);
                if (isNaN(itemQuantity) || itemQuantity < 1) console.warn(`Produkt ${itemId} hat ungültige Menge:`, item.quantity);

                const itemElement = document.createElement('div');
                itemElement.className = `cart-item ${itemType === 'system' ? 'system-item' : ''}`;

                let componentsHtml = '';
                if (itemType === 'system' && Array.isArray(item.components)) {
                    componentsHtml = `
                        <ul class="cart-system-components">
                            ${item.components.map(comp => `<li>${comp || '?'}</li>`).join('')}
                        </ul>`;
                }

                itemElement.innerHTML = `
                    <img src="${itemImage}" alt="${itemName}" class="cart-item-image" onerror="this.src='images/default-gpu.png'; this.alt='Bild konnte nicht geladen werden';">
                    <div class="cart-item-details">
                        <h3 class="cart-item-title">${itemName}</h3>
                        ${componentsHtml}
                        <p class="cart-item-id">ID: ${itemId}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease-qty" data-id="${itemId}" data-type="${itemType}" ${itemQuantity <= 1 ? 'disabled' : ''}>-</button>
                        <span class="item-quantity">${itemQuantity}</span>
                        <button class="quantity-btn increase-qty" data-id="${itemId}" data-type="${itemType}">+</button>
                    </div>
                    <div class="cart-item-price">${formatPrice(itemPrice * itemQuantity)}</div>
                    <button class="cart-item-remove" data-id="${itemId}" data-type="${itemType}" title="Aus Warenkorb entfernen">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                `;
                cartItemsList.appendChild(itemElement);
                subtotal += itemPrice * itemQuantity;

            } catch (e) {
                console.error(`sepet.js: Fehler beim Rendern von Warenkorbprodukt #${index}:`, item, e);
                renderError = true;
            }
        } // forEach Ende

        if (!renderError) {
             summarySubtotal.textContent = formatPrice(subtotal);
             summaryTotal.textContent = formatPrice(subtotal);
             // checkoutLink bereits sichtbar gemacht
             console.log("sepet.js: Warenkorb Rendern abgeschlossen."); // DEBUG
        } else {
             cartItemsList.innerHTML = '<div class="cart-empty"><p>Fehler beim Anzeigen der Warenkorbprodukte.</p></div>';
             cartEmptyMessage.style.display = 'none';
             cartSummaryBox.style.display = 'none';
             checkoutLink.style.display = 'none'; // Bei Fehler Link ausblenden
        }
    }

    // Funktion zum Ändern der Menge
    function changeQuantity(itemId, itemType, change) {
        console.log(`sepet.js: changeQuantity(${itemId}, ${itemType}, ${change}) aufgerufen.`); // DEBUG
        const cart = getCart();
        const itemIndex = cart.findIndex(item => item.id === itemId && item.type === itemType);

        if (itemIndex > -1) {
            let currentQuantity = Number(cart[itemIndex].quantity) || 0;
            cart[itemIndex].quantity = Math.max(0, currentQuantity + change);

            if (cart[itemIndex].quantity <= 0) {
                console.log(`sepet.js: Produkt ${itemId} wird entfernt (Menge wurde 0).`); // DEBUG
                cart.splice(itemIndex, 1);
            }
            saveCart(cart);
            renderCart();
        } else {
             console.warn("sepet.js: Produkt zum Ändern der Menge nicht gefunden:", itemId, itemType);
        }
    }

    // Funktion zum Entfernen des Produkts aus dem Warenkorb
    function removeItem(itemId, itemType) {
        console.log(`sepet.js: removeItem(${itemId}, ${itemType}) aufgerufen.`); // DEBUG
        let cart = getCart();
        const initialLength = cart.length;
        cart = cart.filter(item => !(item.id === itemId && item.type === itemType));

        if (cart.length < initialLength) {
            console.log(`sepet.js: Produkt ${itemId} entfernt.`); // DEBUG
            saveCart(cart);
            renderCart();
        } else {
            console.warn("sepet.js: Zu löschendes Produkt nicht gefunden:", itemId, itemType);
        }
    }

    // Event Listener hinzufügen
    if (cartItemsList) {
        cartItemsList.addEventListener('click', (e) => {
            const targetButton = e.target.closest('button');
            if (!targetButton) return;

            const itemId = targetButton.getAttribute('data-id');
            const itemType = targetButton.getAttribute('data-type');

            if (!itemId || !itemType || !(targetButton.classList.contains('quantity-btn') || targetButton.classList.contains('cart-item-remove'))) return;

            console.log(`sepet.js: Button geklickt - ID: ${itemId}, Typ: ${itemType}, Klasse: ${targetButton.className}`); // DEBUG

            if (targetButton.classList.contains('decrease-qty')) {
                changeQuantity(itemId, itemType, -1);
            }
            else if (targetButton.classList.contains('increase-qty')) {
                changeQuantity(itemId, itemType, 1);
            }
            else if (targetButton.classList.contains('cart-item-remove')) {
                 removeItem(itemId, itemType);
            }
        });
        console.log("sepet.js: Event Listener für Warenkorbliste hinzugefügt."); // DEBUG
    } else {
        console.error("sepet.js: Warenkorblisten Element nicht gefunden (ID: cart-items-list), Event Listener konnte nicht hinzugefügt werden.");
    }

    // Warenkorb beim ersten Seitenladen rendern
    console.log("sepet.js: Erster Warenkorb-Render wird durchgeführt..."); // DEBUG
    renderCart();

}); // DOMContentLoaded Ende