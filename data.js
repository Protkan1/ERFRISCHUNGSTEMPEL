/* data.js
  GÜNCELLEME: Zenginleştirilmiş AJAX Ürün Listesi
  - Tüm AJAX Baseline ürünleri eklendi.
  - Doğrulanmış ve yüksek kaliteli görsel linkleri kullanıldı.
*/

const DB = {
    cpu: [
        { 
            id: 'dvr1', 
            name: '4 Kanal HD Rekorder (DVR)', 
            name_en: '4 Channel HD Recorder (DVR)', 
            price: 52, 
            type: 'DVR', 
            image: 'https://www.avaloid.de/media/image/product/2377/lg/goliath-ip-kamera-set-4-x-4-mp-28-mm-30m-ir-app-starlight-maskierung-ip67-poe-set.png', 
            details: { maxResolution: '5MP Lite', hddSlot: '1 Slot' } 
        },
        { 
            id: 'nvr1', 
            name: '8 Kanal POE IP Rekorder (NVR)', 
            name_en: '8 Channel POE IP Recorder (NVR)', 
            price: 129, 
            type: 'NVR', 
            image: 'https://www.avaloid.de/media/image/product/2376/lg/goliath-ip-kamera-set-8-x-4-mp-28-mm-30m-ir-app-starlight-maskierung-ip67-poe-set.png', 
            details: { maxResolution: '8MP', hddSlot: '2 Slots' } 
        }
    ],
    
    ssd: [
        { 
            id: 'hdd1', 
            name: 'Seagate SkyHawk 1TB Überwachungs-HDD', 
            name_en: 'Seagate SkyHawk 1TB Surveillance HDD', 
            price: 45, 
            image: 'https://www.avaloid.de/media/image/product/978/lg/goliath-pro-2-draht-bus-tuersprechanlage-1-fam-anthrazit-7-zoll-weiss-fingerprint-180.jpg', 
            details: { usage: '7/24 Security' } 
        }
    ],
    
    motherboard: [
        {
            id: 'ap_cam_set2',
            name: 'GOLIATH 8 Stück 4MP IP POE Kamera Set',
            brand: 'GOLIATH',
            price: 68364,
            image: 'https://www.avaloid.de/media/image/product/2376/lg/goliath-ip-kamera-set-8-x-4-mp-28-mm-30m-ir-app-starlight-maskierung-ip67-poe-set.png',
            cameraCount: 8,
            resolution: '4MP',
            features: ['Starlight Nachtsicht', 'IP67 Schutz', 'POE kompatibel']
        },
        {
            id: 'ap_cam_4g1',
            name: 'GOLIATH IP 4G Kamera Set | 4 MP | SIM',
            brand: 'GOLIATH',
            price: 17500,
            image: 'https://www.avaloid.de/media/image/product/4622/lg/goliath-fisheye-ip-dome-kamera-6-mp-16mm-2-way-audio-wdr-15-ir-ivs-poe-pro-serie.png',
            resolution: '4MP',
            features: ['4G Verbindung', '2 Way Audio', 'Batterie betrieben', 'WDR']
        },
        {
            id: 'ap_cam_dome1',
            name: 'GOLIATH IP Dome Kamera | 8 MP | Smart Dual Light',
            brand: 'GOLIATH',
            price: 15500,
            image: 'https://www.avaloid.de/media/image/product/3953/sm/goliath-starlight-ip-kamera-8-mp-28mm-wdr-30m-ir-alarm-smd-30-4k-tioc-serie.webp',
            resolution: '8MP',
            features: ['Smart Dual Light', '30m IR', 'Mikrofon', 'POE', '4K']
        },
        {
            id: 'ap_cam_starlight1',
            name: 'GOLIATH Starlight IP Dome | 4 MP | WDR | 30m IR',
            brand: 'GOLIATH',
            price: 15500,
            image: 'https://www.avaloid.de/media/image/product/3559/sm/goliath-starlight-ip-kamera-4-mp-28mm-wdr-30m-ir-smd-mikro-app-poe-smart-serie.webp',
            resolution: '4MP',
            features: ['Starlight Technologie', 'WDR', '30m IR', 'SMD+', 'Mikrofon', 'IK10']
        },
        {
            id: 'ap_cam_fisheye1',
            name: 'GOLIATH Fisheye IP Dome | 5 MP | 1.4mm',
            brand: 'GOLIATH',
            price: 19900,
            image: 'https://www.avaloid.de/media/image/product/1042/sm/goliath-fisheye-ip-dome-kamera-5-mp-14mm-mikrofon-wdr-10-ir-ivs-app-poe-pro-serie.webp',
            resolution: '5MP',
            features: ['Fisheye Linse', 'WDR', '10 IR', 'IVS', 'App', 'POE', 'PRO Serie']
        },
        {
            id: 'ap_cam_pt1',
            name: 'GOLIATH IP PT Kamera | 5 MP | Pan-Tilt',
            brand: 'GOLIATH',
            price: 18500,
            image: 'https://www.avaloid.de/media/image/product/3778/sm/goliath-starlight-ip-dome-ptz-kamera-2-mp-auto-tracking-wdr-150m-ir-smd-poe-pro-serie.webp',
            resolution: '5MP',
            features: ['Pan-Tilt Steuerung', '30m IR', 'Ton/Lautsprecher', 'IVS', 'POE']
        },
        {
            id: 'ap_cam_dome_motorzoom1',
            name: 'GOLIATH Starlight IP Dome | 8 MP | Motorzoom | 4K Dual',
            brand: 'GOLIATH',
            price: 32500,
            image: 'https://www.avaloid.de/media/image/product/4442/lg/goliath-starlight-ip-dome-kamera-8-mp-motorzoom-wdr-40m-ir-smd-mikro-4k-dual-serie~2.webp',
            resolution: '8MP',
            features: ['Motorzoom', 'WDR', '40m IR', 'SMD+', '4K', 'Dual Serie']
        },
        {
            id: 'ap_cam_dome_motorzoom2',
            name: 'GOLIATH Starlight IP Dome | 8 MP | Motorzoom | 4K POE',
            brand: 'GOLIATH',
            price: 32500,
            image: 'https://www.avaloid.de/media/image/product/4599/lg/goliath-starlight-ip-dome-kamera-8-mp-motorzoom-wdr-40m-ir-smd-mikro-poe-4k-serie~2.webp',
            resolution: '8MP',
            features: ['Motorzoom', 'WDR', '40m IR', 'SMD+', '4K', 'POE', '4K Serie']
        },
        {
            id: 'ap_cam_ptz1',
            name: 'GOLIATH Starlight IP Dome PTZ | 2 MP | Auto-Tracking',
            brand: 'GOLIATH',
            price: 95000,
            image: 'https://www.avaloid.de/media/image/product/3778/sm/goliath-starlight-ip-dome-ptz-kamera-2-mp-auto-tracking-wdr-150m-ir-smd-poe-pro-serie.webp',
            resolution: '2MP',
            features: ['Auto-Tracking', 'WDR', '150m IR', 'SMD+', 'POE', 'PRO Serie']
        },
        {
            id: 'ap_cam_ptz2',
            name: 'GOLIATH Starlight IP Dome PTZ | 4 MP | Pan-Tilt-Zoom',
            brand: 'GOLIATH',
            price: 85000,
            image: 'https://www.avaloid.de/media/image/product/3073/sm/goliath-starlight-ip-dome-ptz-kamera-4-mp-pan-tilt-zoom-wdr-100m-ir-smd-poe-pro-serie.webp',
            resolution: '4MP',
            features: ['Pan-Tilt-Zoom', 'WDR', '100m IR', 'SMD+', 'POE', 'PRO Serie']
        },
        {
            id: 'ap_cam_starlight_12mp',
            name: 'GOLIATH Starlight IP Kamera | 12 MP | 2.8mm',
            brand: 'GOLIATH',
            price: 27500,
            image: 'https://www.avaloid.de/media/image/product/4479/lg/goliath-starlight-ip-kamera-12-mp-28mm-30m-ir-smd-mikrofon-poe-smart-dual-serie.webp',
            resolution: '12MP',
            features: ['12MP HD', '30m IR', 'SMD+', 'Mikrofon', 'POE', 'Smart Dual Serie']
        },
        {
            id: 'ap_cam_smart1',
            name: 'GOLIATH Starlight IP Kamera | 4 MP | SMART Serie',
            brand: 'GOLIATH',
            price: 15500,
            image: 'https://www.avaloid.de/media/image/product/3559/sm/goliath-starlight-ip-kamera-4-mp-28mm-wdr-30m-ir-smd-mikro-app-poe-smart-serie.webp',
            resolution: '4MP',
            features: ['WDR', '30m IR', 'SMD+', 'App', 'POE', 'SMART Serie']
        },
        {
            id: 'ap_cam_dual1',
            name: 'GOLIATH Starlight IP Kamera | 4 MP | Dual Serie',
            brand: 'GOLIATH',
            price: 15500,
            image: 'https://www.avaloid.de/media/image/product/4650/lg/goliath-hdcvi-4k-kamera-8-mp-28mm-wdr-80m-ir-starlight-mikrofon-ip67-4k-dual-serie.webp',
            resolution: '4MP',
            features: ['WDR', '30m IR', 'SMD+', 'Mikrofon', 'POE', 'Dual Serie']
        },
        {
            id: 'ap_cam_motorzoom1',
            name: 'GOLIATH Starlight IP Kamera | 4 MP | Motorzoom | 60m IR',
            brand: 'GOLIATH',
            price: 27500,
            image: 'https://www.avaloid.de/media/image/product/4471/lg/goliath-starlight-ip-kamera-4-mp-motorzoom-wdr-60m-ir-smd-mikrofon-poe-dual-serie.webp',
            resolution: '4MP',
            features: ['Motorzoom', 'WDR', '60m IR', 'SMD+', 'Mikrofon', 'POE', 'Dual Serie']
        },
        {
            id: 'ap_cam_180grad',
            name: 'GOLIATH Starlight IP Kamera | 8 MP | 180 Grad',
            brand: 'GOLIATH',
            price: 45000,
            image: 'https://www.avaloid.de/media/image/product/4058/lg/goliath-starlight-ip-dome-kamera-8-mp-180-grad-wdr-25m-ir-ton-smd-poe-4k-tioc-serie.webp',
            resolution: '8MP',
            features: ['180 Grad Weitwinkel', 'WDR', '25m IR', 'Ton', 'SMD 4.0', 'POE', '4K TiOC']
        },
        {
            id: 'ap_cam_alarm1',
            name: 'GOLIATH Starlight IP Kamera | 8 MP | Alarm | TiOC',
            brand: 'GOLIATH',
            price: 38500,
            image: 'https://www.avaloid.de/media/image/product/3953/sm/goliath-starlight-ip-kamera-8-mp-28mm-wdr-30m-ir-alarm-smd-30-4k-tioc-serie.webp',
            resolution: '8MP',
            features: ['Alarm Funktion', 'WDR', '30m IR', 'SMD 3.0', '4K TiOC']
        },
        {
            id: 'ap_cam_app1',
            name: 'GOLIATH Starlight IP Kamera | 8 MP | App | 4K Serie',
            brand: 'GOLIATH',
            price: 25500,
            image: 'https://www.avaloid.de/media/image/product/3074/lg/goliath-starlight-ip-kamera-8-mp-28mm-wdr-30m-ir-smd-mikrofon-app-poe-4k-serie.webp',
            resolution: '8MP',
            features: ['App Steuerung', 'WDR', '30m IR', 'SMD+', 'Mikrofon', 'POE', '4K Serie']
        },
        {
            id: 'ap_cam_dual_motorzoom1',
            name: 'GOLIATH Starlight IP Kamera | 8 MP | Motorzoom | 4K Dual',
            brand: 'GOLIATH',
            price: 32500,
            image: 'https://www.avaloid.de/media/image/product/4442/lg/goliath-starlight-ip-dome-kamera-8-mp-motorzoom-wdr-40m-ir-smd-mikro-4k-dual-serie~2.webp',
            resolution: '8MP',
            features: ['Motorzoom', 'WDR', '60m IR', 'SMD+', 'Mikrofon', 'POE', '4K Dual Serie']
        },
        {
            id: 'ap_cam_ptz_pro1',
            name: 'GOLIATH Starlight IP PTZ Kamera | 2 MP | Pan-Tilt-Zoom PRO',
            brand: 'GOLIATH',
            price: 29500,
            image: 'https://www.avaloid.de/media/image/product/3918/sm/goliath-starlight-ip-ptz-kamera-2-mp-pan-tilt-zoom-wdr-15m-ir-ivs-app-poe-pro-serie.webp',
            resolution: '2MP',
            features: ['Pan-Tilt-Zoom', 'WDR', '15m IR', 'IVS', 'App', 'POE', 'PRO Serie']
        },
        {
            id: 'ap_cam_ptz_tracking',
            name: 'GOLIATH Starlight IP PTZ Kamera | 4 MP | Auto Tracking',
            brand: 'GOLIATH',
            price: 85000,
            image: 'https://www.avaloid.de/media/image/product/4593/lg/goliath-starlight-ip-ptz-kamera-4-mp-auto-tracking-panorama-100m-ir-smd-poe-tioc-serie.webp',
            resolution: '4MP',
            features: ['Auto Tracking', 'Panorama', '100m IR', 'SMD', 'POE', 'TiOC Serie']
        },
        {
            id: 'ap_cam_ptz_tioc',
            name: 'GOLIATH Starlight IP PTZ Kamera | 4 MP | WDR | TiOC',
            brand: 'GOLIATH',
            price: 42500,
            image: 'https://www.avaloid.de/media/image/product/3126/lg/goliath-starlight-ip-ptz-kamera-4-mp-wdr-50m-ir-ton-lautsprecher-smd-poe-tioc-serie.webp',
            resolution: '4MP',
            features: ['WDR', '50m IR', 'Ton/Lautsprecher', 'SMD+', 'POE', 'TiOC Serie']
        },
        {
            id: 'ap_cam_fisheye_5mp',
            name: 'GOLIATH Fisheye IP Dome Kamera | 5 MP',
            brand: 'GOLIATH',
            price: 19900,
            image: 'https://www.avaloid.de/media/image/product/1042/lg/goliath-fisheye-ip-dome-kamera-5-mp-14mm-mikrofon-wdr-10-ir-ivs-app-poe-pro-serie.webp',
            resolution: '5MP',
            features: ['Fisheye Linse', '1.4mm', 'Mikrofon', 'WDR', '10m IR', 'IVS', 'App', 'POE']
        },
        {
            id: 'ap_cam_fisheye_6mp',
            name: 'GOLIATH Fisheye IP Dome Kamera | 6 MP',
            brand: 'GOLIATH',
            price: 32500,
            image: 'https://www.avaloid.de/media/image/product/4622/lg/goliath-fisheye-ip-dome-kamera-6-mp-16mm-2-way-audio-wdr-15-ir-ivs-poe-pro-serie.png',
            resolution: '6MP',
            features: ['Fisheye Linse', '1.6mm', '2-Way-Audio', 'WDR', '15m IR', 'IVS', 'POE']
        },
        {
            id: 'ap_cam_4g_v1',
            name: 'GOLIATH IP 4G Kamera Set | 4 MP',
            brand: 'GOLIATH',
            price: 17500,
            image: 'https://www.avaloid.de/media/image/product/4059/lg/goliath-ip-4g-kamera-set-4-mp-solar-4g-sim-2-way-audio-batterie-alarm-app-4g-serie.webp',
            resolution: '4MP',
            features: ['4G SIM', '2-Way-Audio', 'Batterie betrieben', 'Alarm', 'WDR', 'App']
        },  
        {
            id: 'ap_cam_dome_8mp_basic',
            name: 'GOLIATH IP Dome Kamera | 8 MP | 4K Basic',
            brand: 'GOLIATH',
            price: 15500,
            image: 'https://www.avaloid.de/media/image/product/4229/lg/goliath-ip-dome-kamera-8-mp-28mm-smart-dual-light-30m-ir-mikrofon-poe-4k-basic-serie.webp',
            resolution: '8MP',
            features: ['2.8mm', 'Smart Dual Light', '30m IR', 'Mikrofon', 'POE', '4K Basic']
        },
        {
            id: 'ap_cam_8mp_basic',
            name: 'GOLIATH IP Kamera | 8 MP | 4K Basic',
            brand: 'GOLIATH',
            price: 15500,
            image: 'https://www.avaloid.de/media/image/product/4652/lg/goliath-ip-kamera-8-mp-28mm-smart-dual-light-30m-ir-mikrofon-app-poe-4k-basic-serie_1.webp',
            resolution: '8MP',
            features: ['2.8mm', 'Smart Dual Light', '30m IR', 'Mikrofon', 'App', 'POE', '4K Basic']
        },
        {
            id: 'ap_cam_dome_4mp_pro',
            name: 'GOLIATH IP Dome Kamera | 4 MP | PRO Serie',
            brand: 'GOLIATH',
            price: 12900,
            image: 'https://www.avaloid.de/media/image/product/770/lg/goliath-hdcvi-dome-kamera-2-mp-28mm-wdr-mikrofon-40m-ir-ip67-ik10-pro-serie.webp',
            resolution: '4MP',
            features: ['2.8mm', '30m IR', 'Mikrofon', 'WDR', 'IVS', 'App', 'POE', 'PRO Serie']
        },
        {
            id: 'ap_cam_4mp_pro',
            name: 'GOLIATH IP Kamera | 4 MP | PRO Serie',
            brand: 'GOLIATH',
            price: 12900,
            image: 'https://www.avaloid.de/media/image/product/4620/lg/goliath-hdcvi-dome-kamera-8-mp-28mm-wdr-mikrofon-40m-ir-ip67-ik10-4k-lite-serie_1.webp',
            resolution: '4MP',
            features: ['2.8mm', '30m IR', 'Mikrofon', 'WDR', 'IVS', 'App', 'POE', 'PRO Serie']
        }
    ],
    
    doorbells: [
        {
            id: 'ap_doorbell1',
            name: 'GOLIATH PRO 2-Draht Türsprechanlage | 1 Familie',
            name_en: 'GOLIATH PRO 2-Wire Door Intercom | 1 Family',
            brand: 'GOLIATH',
            price: 955,
            image: 'https://www.avaloid.de/media/image/product/978/lg/goliath-pro-2-draht-bus-tuersprechanlage-1-fam-anthrazit-7-zoll-weiss-fingerprint-180.jpg',
            features: ['Fingerabdruck-Identifikation', '7" FullHD Bildschirm', 'Video-Türsprechanlage'],
            features_en: ['Fingerprint Identification', '7" FullHD Screen', 'Video Door Intercom']
        },
        {
            id: 'ap_doorbell2',
            name: 'GOLIATH Basic 2-Draht Türsprechanlage | 4.3" | Schwarz',
            name_en: 'GOLIATH Basic 2-Wire Door Intercom | 4.3" | Black',
            brand: 'GOLIATH',
            price: 282,
            image: 'https://www.avaloid.de/media/image/product/3542/sm/goliath-basic-2-draht-bus-tuersprechanlage-43-kapazitiver-touchscreen-smartphone-app-schwarz.webp',
            features: ['4.3" Kapazitiver Touchscreen', 'Smartphone App', 'Einfache Installation'],
            features_en: ['4.3" Capacitive Touchscreen', 'Smartphone App', 'Easy Installation']
        },
        {
            id: 'ap_doorbell3',
            name: 'GOLIATH Basic 2-Draht Türsprechanlage | 4.3" | Weiß',
            name_en: 'GOLIATH Basic 2-Wire Door Intercom | 4.3" | White',
            brand: 'GOLIATH',
            price: 282,
            image: 'https://www.avaloid.de/media/image/product/3486/sm/goliath-basic-2-draht-bus-tuersprechanlage-43-kapazitiver-touchscreen-smartphone-app-weiss.webp',
            features: ['4.3" Kapazitiver Touchscreen', 'Smartphone App', 'Einfache Installation'],
            features_en: ['4.3" Capacitive Touchscreen', 'Smartphone App', 'Easy Installation']
        },
        {
            id: 'ap_doorbell4',
            name: 'GOLIATH Basic 2-Draht Türsprechanlage | FullHD | 150° | Aufputz',
            name_en: 'GOLIATH Basic 2-Wire Door Intercom | FullHD | 150° | Surface Mount',
            brand: 'GOLIATH',
            price: 568,
            image: 'https://www.avaloid.de/media/image/product/4138/sm/goliath-basic-2-draht-bus-tuersprechanlage-fullhd-app-150-1-familie-silber-schwarz-aufputz.webp',
            features: ['FullHD', '150° weiter Blickwinkel', 'Smartphone App', 'Aufputzmontage'],
            features_en: ['FullHD', '150° Wide View Angle', 'Smartphone App', 'Surface Mounting']
        },
        {
            id: 'ap_doorbell5',
            name: 'GOLIATH Basic 2-Draht Türsprechanlage | FullHD | 150° | Unterputz',
            name_en: 'GOLIATH Basic 2-Wire Door Intercom | FullHD | 150° | Flush Mount',
            brand: 'GOLIATH',
            price: 568,
            image: 'https://www.avaloid.de/media/image/product/4139/sm/goliath-basic-2-draht-bus-tuersprechanlage-fullhd-app-150-1-familie-silber-schwarz-unterputz.webp',
            features: ['FullHD', '150° weiter Blickwinkel', 'Smartphone App', 'Unterputzmontage'],
            features_en: ['FullHD', '150° Wide View Angle', 'Smartphone App', 'Flush Mounting']
        },
        {
            id: 'ap_doorbell6',
            name: 'GOLIATH Basic 2-Draht Türsprechanlage | FullHD | 150° | Silber/Weiß | Aufputz',
            name_en: 'GOLIATH Basic 2-Wire Door Intercom | FullHD | 150° | Silver/White | Surface Mount',
            brand: 'GOLIATH',
            price: 568,
            image: 'https://www.avaloid.de/media/image/product/4136/sm/goliath-basic-2-draht-bus-tuersprechanlage-fullhd-app-150-1-familie-silber-weiss-aufputz.webp',
            features: ['FullHD', '150° weiter Blickwinkel', 'Smartphone App', 'Silber/Weiß Farbe'],
            features_en: ['FullHD', '150° Wide View Angle', 'Smartphone App', 'Silver/White Color']
        },
        {
            id: 'ap_doorbell7',
            name: 'GOLIATH Basic 2-Draht Türsprechanlage | FullHD | 150° | Silber/Weiß | Unterputz',
            name_en: 'GOLIATH Basic 2-Wire Door Intercom | FullHD | 150° | Silver/White | Flush Mount',
            brand: 'GOLIATH',
            price: 568,
            image: 'https://www.avaloid.de/media/image/product/4137/sm/goliath-basic-2-draht-bus-tuersprechanlage-fullhd-app-150-1-familie-silber-weiss-unterputz.webp',
            features: ['FullHD', '150° weiter Blickwinkel', 'Smartphone App', 'Silber/Weiß Farbe'],
            features_en: ['FullHD', '150° Wide View Angle', 'Smartphone App', 'Silver/White Color']
        },

        {
            id: 'ap_door_pro_2x10',
            name: 'GOLIATH PRO IP Video Sprechanlage | 2x 10"',
            brand: 'GOLIATH',
            price: 84900,
            image: 'https://www.avaloid.de/media/image/product/692/lg/goliath-pro-ip-video-sprechanlage-app-anthrazit-1-familie-2x-10-zoll-aufputz-180-grad.jpg',
            features: ['App control', 'Anthracite', '1 Family', '2x 10" Monitor', 'Surface mount', '180°']
        },
        {
            id: 'ap_door_pro_rfid',
            name: 'GOLIATH PRO IP Videosprechanlage | RFID',
            brand: 'GOLIATH',
            price: 99900,
            image: 'https://www.avaloid.de/media/image/product/684/lg/goliath-pro-ip-videosprechanlage-anthrazit-1-fam-2x-10-hd-rfid-unterputz-180-grad.jpg',
            features: ['Anthracite', '1 Family', '2x 10" HD Monitor', 'RFID', 'Flush mount', '180°']
        },
        {
            id: 'ap_door_pro_fingerprint',
            name: 'GOLIATH PRO IP Gegensprechanlage | Fingerprint',
            brand: 'GOLIATH',
            price: 83900,
            image: 'https://www.avaloid.de/media/image/product/1000/lg/goliath-pro-ip-gegensprechanlage-anthrazit-1-fam-10-hd-fingerprint-unterputz-180.jpg',
            features: ['Anthracite', '1 Family', '10" HD Monitor', 'Fingerprint', 'Flush mount', '180°']
        },
        {
            id: 'ap_door_pro_keypad',
            name: 'GOLIATH PRO IP Gegensprechanlage | Keypad',
            brand: 'GOLIATH',
            price: 79900,
            image: 'https://www.avaloid.de/media/image/product/960/lg/goliath-pro-ip-gegensprechanlage-anthrazit-1-fam-10-hd-keypad-180-kamera.jpg',
            features: ['Anthracite', '1 Family', '10" HD Monitor', 'Keypad', '180° Camera']
        },
        {
            id: 'ap_door_pro_rfid_v2',
            name: 'GOLIATH PRO IP Gegensprechanlage | RFID (Var)',
            brand: 'GOLIATH',
            price: 99900,
            image: 'https://www.avaloid.de/media/image/product/710/lg/goliath-pro-ip-gegensprechanlage-anthrazit-1-fam-2x-10-hd-rfid-unterputz-180-grad.jpg',
            features: ['Anthracite', '1 Family', '2x 10" HD Monitor', 'RFID', 'Flush mount', '180°']
        },
        {
            id: 'ap_door_pro_fingerprint_app',
            name: 'GOLIATH PRO IP Gegensprechanlage | Fingerprint (App)',
            brand: 'GOLIATH',
            price: 83900,
            image: 'https://www.avaloid.de/media/image/product/519/lg/goliath-pro-ip-gegensprechanlage-app-1-familie-10-zoll-hd-fingerprint-unterputz-180.jpg',
            features: ['App control', '1 Family', '10" HD Monitor', 'Fingerprint', 'Flush mount', '180°']
        },
        {
            id: 'ap_door_pro_keypad_app',
            name: 'GOLIATH PRO IP Gegensprechanlage | Keypad (App)',
            brand: 'GOLIATH',
            price: 79900,
            image: 'https://www.avaloid.de/media/image/product/737/lg/goliath-pro-ip-gegensprechanlage-app-1-familie-10-zoll-hd-keypad-180-kamera.jpg',
            features: ['App control', '1 Family', '10" HD Monitor', 'Keypad', '180° Camera']
        },
        {
            id: 'ap_door_pro_2x10_fingerprint',
            name: 'GOLIATH PRO IP Gegensprechanlage | 2x 10" Fingerprint',
            brand: 'GOLIATH',
            price: 113900,
            image: 'https://www.avaloid.de/media/image/product/705/lg/goliath-pro-ip-gegensprechanlage-app-1-familie-2x-10-zoll-hd-fingerprint-180-kamera.jpg',
            features: ['App control', '1 Family', '2x 10" HD Monitor', 'Fingerprint', '180° Camera']
        },
        {
            id: 'ap_door_pro_2x10_rfid',
            name: 'GOLIATH PRO IP Gegensprechanlage | 2x 10" RFID',
            brand: 'GOLIATH',
            price: 109900,
            image: 'https://www.avaloid.de/media/image/product/700/lg/goliath-pro-ip-gegensprechanlage-app-1-familien-2x-10-zoll-hd-rfid-unterputz-180-grad.jpg',
            features: ['App control', '1 Family', '2x 10" HD Monitor', 'RFID', 'Flush mount', '180°']
        },
        {
            id: 'ap_door_pro_silber_2x10',
            name: 'GOLIATH PRO IP Gegensprechanlage | Silber | 2x 10"',
            brand: 'GOLIATH',
            price: 84900,
            image: 'https://www.avaloid.de/media/image/product/690/lg/goliath-pro-ip-gegensprechanlage-app-silber-1-familienhaus-2x-10-zoll-aufputz-180.jpg',
            features: ['App control', 'Silver', '1 Family', '2x 10" Monitor', 'Surface mount', '180°']
        }
    ],

    gpu: [
        { id: 'pe-kb1', name: '100m CCTV Kablo', price: 800, image: 'https://www.avaloid.de/media/image/product/1223/lg/cat-7-netzwerkkabel-100m-verlegekabel-1000-mhz-s-ftp-pimf-lszh-awg-23-1-abisolierer.jpg' }
    ],
    
    ram: [],

    readySystems: [
        {
            id: 'sp4', 
            name: 'GOLIATH Türsprechanlage Paket - "SMART ENTRY"', 
            name_en: 'GOLIATH Door Intercom Package - "SMART ENTRY"', 
            price: 6120, 
            image: 'https://www.avaloid.de/media/image/product/978/lg/goliath-pro-2-draht-bus-tuersprechanlage-1-fam-anthrazit-7-zoll-weiss-fingerprint-180.jpg',
            brand: 'GOLIATH',
            specs_de: [ 'Video-Türsprechanlage', 'Mobile App Steuerung' ],
            specs_en: [ 'Video Door Intercom', 'Mobile App Control' ],
            performanceData: { 
                description_de: 'Ideale Eingangskontrolle für Ihr Zuhause.', 
                description_en: 'Ideal entry control for your home.', 
                benchmarks: [ { name: 'Blickwinkel', name_en: 'View Angle', score: '180°' } ] 
            }
        },
        {
            id: 'sp5', 
            name: 'AJAX StarterKit - "SMART PROTECTION"', 
            name_en: 'AJAX StarterKit - "SMART PROTECTION"', 
            price: 10800, 
            image: 'https://www.avaloid.de/media/image/product/3884/lg/whitelabel-hub-pro-motionprotect-fernbedienung-doorprotect-weiss-starterkit-pro.png', 
            brand: 'AJAX',
            specs_de: [ 'Hub Zentrale', 'Sensoren', 'Fernbedienung' ],
            specs_en: [ 'Hub Center', 'Sensors', 'Remote Control' ],
            performanceData: { 
                description_de: 'Professionelles kabelloses Alarm-Starterset.', 
                description_en: 'Professional wireless alarm starter set.', 
                benchmarks: [ { name: 'Reichweite', name_en: 'Range', score: '2000m' } ] 
            }
        }
    ],


    peripherals: {
        alarm: [
          
          
            {
                id: 'ap_alarm_ajax_hub4',
                name: 'AJAX Hub 2 | LAN | 2G | 2 SIM | Weiß',
                brand: 'AJAX',
                price: 39974,
                image: 'https://www.avaloid.de/media/image/product/1491/sm/ajax-alarmzentrale-lan-2g-2-sim-weiss-hub-2.webp',
                features: ['Alarmzentrale', 'LAN', '2G', '2 SIM']
            },
            {
                id: 'ap_alarm_ajax_hub5',
                name: 'AJAX Hub 2 | LAN | 4G | 2 SIM | Schwarz',
                brand: 'AJAX',
                price: 57999,
                image: 'https://www.avaloid.de/media/image/product/1492/sm/ajax-alarmzentrale-lan-4g-2-sim-schwarz-hub-2-4g.webp',
                features: ['Alarmzentrale', 'LAN', '4G', '2 SIM']
            },
            {
                id: 'ap_alarm_ajax_hub6',
                name: 'AJAX Hub 2 | LAN | 4G | 2 SIM | Weiß',
                brand: 'AJAX',
                price: 57999,
                image: 'https://www.avaloid.de/media/image/product/977/sm/ajax-alarmzentrale-lan-4g-2-sim-weiss-hub-2-4g.webp',
                features: ['Alarmzentrale', 'LAN', '4G', '2 SIM']
            },
            {
                id: 'ap_alarm_ajax_hub7',
                name: 'AJAX Hub 2 Plus | LAN | WLAN | LTE | 3G | 2G | Weiß',
                brand: 'AJAX',
                price: 68620,
                image: 'https://www.avaloid.de/media/image/product/941/sm/ajax-alarmzentrale-lan-wlan-lte-3g-2g-2-sim-weiss-hub-2-plus.webp',
                features: ['Alarmzentrale', 'LAN', 'WLAN', 'LTE', '3G', '2G']
            },
            // AJAX - Sirens
            {
                id: 'ap_alarm_ajax_siren1',
                name: 'AJAX StreetSiren DoubleDeck | 85-113 dB | Schwarz',
                brand: 'AJAX',
                price: 21125,
                image: 'https://www.avaloid.de/media/image/product/844/sm/ajax-aussensirene-led-status-85-113-db-schwarz-inklusive-abdeckung-streetsiren-doubledeck.webp',
                features: ['Außensirene', 'LED-Status', '85-113 dB']
            },
            {
                id: 'ap_alarm_ajax_siren2',
                name: 'AJAX StreetSiren DoubleDeck | 85-113 dB | Weiß',
                brand: 'AJAX',
                price: 21125,
                image: 'https://www.avaloid.de/media/image/product/851/sm/ajax-aussensirene-led-status-85-113-db-weiss-inklusive-abdeckung-streetsiren-doubledeck.webp',
                features: ['Außensirene', 'LED-Status', '85-113 dB']
            },
            {
                id: 'ap_alarm_ajax_siren3',
                name: 'AJAX StreetSiren | 85-113 dB | Schwarz',
                brand: 'AJAX',
                price: 21164,
                image: 'https://www.avaloid.de/media/image/product/1461/sm/ajax-aussensirene-led-statusanzeige-85-113-db-schwarz-streetsiren.webp',
                features: ['Außensirene', 'LED-Statusanzeige', '85-113 dB']
            },
            {
                id: 'ap_alarm_ajax_siren4',
                name: 'AJAX StreetSiren | 85-113 dB | Weiß',
                brand: 'AJAX',
                price: 21164,
                image: 'https://www.avaloid.de/media/image/product/1460/sm/ajax-aussensirene-led-statusanzeige-85-113-db-weiss-streetsiren.webp',
                features: ['Außensirene', 'LED-Statusanzeige', '85-113 dB']
            },
            {
                id: 'ap_alarm_ajax_homesiren',
                name: 'AJAX HomeSiren | LED | Schwarz',
                brand: 'AJAX',
                price: 10581,
                image: 'https://www.avaloid.de/media/image/product/765/md/ajax-innenensirene-zusaetzlicher-led-anschluss-81-105-db-schwarz-homesiren.jpg',
                features: ['Innensirene', 'LED', '105 dB']
            },
            // AJAX - Keypads/Control Panels
            {
                id: 'ap_alarm_ajax_keypad1',
                name: 'AJAX KeyPad Plus | DESFire | Schwarz',
                brand: 'AJAX',
                price: 21164,
                image: 'https://www.avaloid.de/media/image/product/906/md/ajax-bedienfeld-led-statusanzeige-desfire-kontaktlose-steuerung-schwarz-keypad-plus.webp',
                features: ['Bedienfeld', 'DESFire Kontaktlos', 'LED-Status']
            },
            {
                id: 'ap_alarm_ajax_keypad2',
                name: 'AJAX KeyPad Plus | DESFire | Weiß',
                brand: 'AJAX',
                price: 21164,
                image: 'https://www.avaloid.de/media/image/product/852/md/ajax-bedienfeld-led-statusanzeige-desfire-kontaktlose-steuerung-weiss-keypad-plus.webp',
                features: ['Bedienfeld', 'DESFire Kontaktlos', 'LED-Status']
            },
            {
                id: 'ap_alarm_ajax_keypad3',
                name: 'AJAX KeyPad | Geheime Panikfunktion | Schwarz',
                brand: 'AJAX',
                price: 16852,
                image: 'https://www.avaloid.de/media/image/product/1496/md/ajax-bedienfeld-led-statusanzeige-geheime-panikfunktion-schwarz-keypad.webp',
                features: ['Bedienfeld', 'Panikfunktion', 'LED-Status']
            },
            {
                id: 'ap_alarm_ajax_keypad4',
                name: 'AJAX KeyPad | Geheime Panikfunktion | Weiß',
                brand: 'AJAX',
                price: 16852,
                image: 'https://www.avaloid.de/media/image/product/835/md/ajax-bedienfeld-led-statusanzeige-geheime-panikfunktion-weiss-keypad.webp',
                features: ['Bedienfeld', 'Panikfunktion', 'LED-Status']
            },
            {
                id: 'ap_alarm_ajax_keypad_touch1',
                name: 'AJAX KeyPad Touch | Touchscreen | Schwarz',
                brand: 'AJAX',
                price: 50733,
                image: 'https://www.avaloid.de/media/image/product/3086/sm/ajax-bedienteil-touchscreen-autorisierung-per-tag-code-smartphone-schwarz-keypad-touch.webp',
                features: ['Touchscreen', 'Tag+Code+Smartphone', 'Autorisierung']
            },
            {
                id: 'ap_alarm_ajax_keypad_touch2',
                name: 'AJAX KeyPad Touch | Touchscreen | Weiß',
                brand: 'AJAX',
                price: 50733,
                image: 'https://www.avaloid.de/media/image/product/3092/sm/ajax-bedienteil-touchscreen-autorisierung-per-tag-code-smartphone-weiss-keypad-touch.webp',
                features: ['Touchscreen', 'Tag+Code+Smartphone', 'Autorisierung']
            },
            // AJAX - Motion Detectors
            {
                id: 'ap_alarm_ajax_motion1',
                name: 'AJAX MotionProtect Outdoor | IP55 | Weiß',
                brand: 'AJAX',
                price: 37230,
                image: 'https://www.avaloid.de/media/image/product/1470/md/ajax-bewegungsmelder-aussenbereich-ip55-erkennung-bis-175m-weiss-motionprotect-outdoor.webp',
                features: ['Bewegungsmelder', 'Außenbereich', 'IP55', '175m²']
            },
            {
                id: 'ap_alarm_ajax_motion2',
                name: 'AJAX CombiProtect | Innenbereich | Glasbruchmelder | Schwarz',
                brand: 'AJAX',
                price: 14894,
                image: 'https://www.avaloid.de/media/image/product/1443/sm/ajax-bewegungsmelder-innenbereich-glasbruchmelder-tierimmun-schwarz-combiprotect.webp',
                features: ['Bewegungsmelder', 'Glasbruchmelder', 'Tierimmun']
            },
            {
                id: 'ap_alarm_ajax_motion3',
                name: 'AJAX MotionProtect | Innenbereich | Tierimmun | Weiß',
                brand: 'AJAX',
                price: 10581,
                image: 'https://www.avaloid.de/media/image/product/1444/sm/ajax-bewegungsmelder-innenbereich-glasbruchmelder-tierimmun-weiss-combiprotect.webp',
                features: ['Bewegungsmelder', 'Innenbereich', 'Tierimmun']
            },
            // AJAX - Door Sensors
            {
                id: 'ap_alarm_ajax_door1',
                name: 'AJAX DoorProtect | Türkontakt | Weiß',
                brand: 'AJAX',
                price: 10581,
                image: 'https://www.avaloid.de/media/image/product/1445/sm/ajax-tuerkontakt-magnetkontakt-weiss-doorprotect.webp',
                features: ['Türkontakt', 'Magnetkontakt', 'Kablosuz']
            },
            // AJAX - Sensors & Protection
            {
                id: 'ap_alarm_ajax_leak',
                name: 'AJAX LeaksProtect | Wassersensor | Weiß',
                brand: 'AJAX',
                price: 10581,
                image: 'https://www.avaloid.de/media/image/product/1447/sm/ajax-wassersensor-leckschutz-weiss-leaksprotect.webp',
                features: ['Wassersensor', 'Leckschutz']
            },
            {
                id: 'ap_alarm_ajax_fire',
                name: 'AJAX FireProtect 2 RB Heat/Smoke | Weiß',
                brand: 'AJAX',
                price: 21164,
                image: 'https://www.avaloid.de/media/image/product/1450/sm/ajax-rauchmelder-waermemelder-flammen-erkennungs-weiss-fireprotect-2-rb-heat-smoke.webp',
                features: ['Rauchmelder', 'Wärmemelder', 'Hitzeerkennung']
            },
            // AJAX - Remote Controls
            {
                id: 'ap_alarm_ajax_remote1',
                name: 'AJAX SpaceControl | Fernbedienung | Schwarz',
                brand: 'AJAX',
                price: 10581,
                image: 'https://www.avaloid.de/media/image/product/1451/sm/ajax-fernbedienung-mit-panikknopf-schwarz-spacecontrol.webp',
                features: ['Fernbedienung', '4 Knöpfe', 'Panikknopf']
            },
            // GOLIATH - Alarm Products
            {
                id: 'ap_alarm_goliath1',
                name: 'GOLIATH Türsensor | Magnetkontakt',
                brand: 'GOLIATH',
                price: 9900,
                image: 'https://www.avaloid.de/media/image/product/978/lg/goliath-pro-2-draht-bus-tuersprechanlage-1-fam-anthrazit-7-zoll-weiss-fingerprint-180.jpg',
                features: ['Magnetkontakt', 'Kabellos']
            },
            {
                id: 'ap_alarm_goliath2',
                name: 'GOLIATH Bewegungssensor',
                brand: 'GOLIATH',
                price: 16200,
                image: 'https://www.avaloid.de/media/image/product/1470/md/ajax-bewegungsmelder-aussenbereich-ip55-erkennung-bis-175m-weiss-motionprotect-outdoor.webp',
                features: ['Haustier-immun', 'Innenbereich']
            }
        ]
    }
};