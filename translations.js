const translations = {
    de: {
        nav_home: "Startseite",
        nav_systems: "Sicherheitspakete",
        nav_cameras: "Kameras",
        nav_alarms: "Alarm & Sensoren",
        nav_goliath: "GOLIATH Systeme",
        nav_ajax: "AJAX Alarm",
        hero_title: "Bringen Sie Ihre Sicherheit auf das <span class='logo-accent'>höchste Niveau</span>",
        hero_subtitle: "Hochauflösende IP-Kameras, Rekorder und intelligente Alarmsysteme für Ihr Zuhause und Ihr Unternehmen. Sichern Sie Ihren Seelenfrieden.",
        hero_cta: "Pakete ansehen",
        section_solutions: "Sicherheitslösungen",
        cat_systems_title: "Sicherheitspakete",
        cat_systems_desc: "Schlüsselfertige, einfach zu installierende Kamerapakete für Zuhause oder Büro.",
        cat_cameras_title: "Kameras",
        cat_cameras_desc: "Alle Modelle von IP-, Dome- und Bullet-Kameras.",
        cat_alarms_title: "Alarm & Zubehör",
        cat_alarms_desc: "Drahtlose Alarme, Sensoren und Sicherheitszubehör.",
        cat_goliath_title: "GOLIATH Systeme",
        cat_goliath_desc: "Hochwertige IP-Kameras und Türsprechanlagen mit deutscher Technologie.",
        cat_ajax_title: "AJAX Alarmsysteme",
        cat_ajax_desc: "Professionelle Sicherheitslösungen mit drahtloser Alarmtechnologie.",
        footer_rights: "Alle Rechte vorbehalten.",
        btn_examine: "Ansehen",
        btn_details: "Paket Details",
        price_prefix: "",
        price_suffix: " €",
        included_components: "Enthaltene Komponenten",
        package_features: "Paketmerkmale",
        loading: "Laden...",
        error_db: "Fehler: Datenbankzugriff fehlgeschlagen oder ID fehlt.",
        error_not_found: "Fehler: Paket nicht gefunden.",
        config_error: "Systemkonfigurationsfehler",
        select: "Wählen",
        add: "Hinzufügen",
        close: "Schließen",
        search_placeholder: "Produkt suchen...",
        systems_intro: "Komplette Sicherheitspakete inklusive Rekorder, Festplatte und Kameras, zusammengestellt von unseren Experten für verschiedene Anforderungen.",
        cameras_intro: "Übernehmen Sie die Kontrolle über Ihre Sicherheit mit fortschrittlichen IP- und Analog-Kamerasystemen.",
        alarms_intro: "Schützen Sie Ihr Eigentum mit intelligenten Alarmsystemen, Bewegungsmeldern und Sensoren.",
        goliath_intro: "Hochwertige IP-Kameras, Türsprechanlagen und Sicherheitslösungen mit deutscher Technologie.",
        goliath_title: "GOLIATH Sicherheitssysteme",
        goliath_sets_title: "GOLIATH IP Kamera Sets",
        goliath_sets_desc: "Hochauflösende IP-Kameras, einfache Installation mit PoE-Technologie",
        goliath_single_title: "GOLIATH Einzelkameras",
        goliath_single_desc: "Hochwertige IP-Kameras für den individuellen Einsatz",
        ajax_intro: "Schützen Sie Ihr Eigentum rund um die Uhr mit professioneller kabelloser Alarmtechnologie.",
        ajax_title: "AJAX Intelligente Alarmsysteme",
        ajax_components_title: "Alle AJAX Komponenten",
        ajax_components_desc: "Hub-Zentralen, Detektoren, Sirenen und Zubehör",
        cart_title: "Warenkorb",
        cart_empty: "Ihr Warenkorb ist leer.",
        checkout: "Zur Kasse",
        total: "Gesamt",
        payment_title: "Zahlung",
        order_summary: "Bestellübersicht",
        back_to_shop: "Zurück zum Shop"
    }
};


class LanguageManager {
    constructor() {
        this.lang = 'de';
        document.documentElement.lang = this.lang;
    }

    getTranslation(key) {
        return translations[this.lang][key] || key;
    }

    getLocalValue(obj, key) {
        if (!obj) return "";
        return obj[`${key}_${this.lang}`] || obj[key] || "";
    }

    updatePage() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (el.tagName === 'INPUT' && el.type === 'placeholder') {
                el.placeholder = this.getTranslation(key);
            } else {
                el.innerHTML = this.getTranslation(key);
            }
        });
        
        // Trigger event for JS files to update their content
        window.dispatchEvent(new Event('languageChanged'));
    }
}

const langManager = new LanguageManager();

document.addEventListener('DOMContentLoaded', () => {
    langManager.updatePage();
});

function t(key) {
    return langManager.getTranslation(key);
}

function formatPrice(price) {
    const locale = 'de-DE';
    return new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(price / 35);
}
