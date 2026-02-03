// ==========================================
// DAFTAR UPDATE APLIKASI
// Tambahkan update baru di paling ATAS (urutan 0)
// ==========================================

const appUpdates = [
    {
        version: "v1.1.0",
        date: "Feb 4, 2026",
        title: "The Paw Update 🐾",
        changes: [
            "New: Dekorasi tapak kaki kucing transparan (Watermark).",
            "Fixed: Algoritma anti-loncat oktaf untuk senar D3.",
            "Improved: Animasi jarum physics-based yang lebih smooth."
        ]
    },
    {
        version: "v1.0.0",
        date: "Jan 25, 2026",
        title: "Initial Release",
        changes: [
            "Rilis perdana PurrTune.",
            "Fitur: Auto Mode & Manual String Selection.",
            "Engine: Native C++ YIN Algorithm."
        ]
    }
];

// ==========================================
// JANGAN UBAH KODE DI BAWAH INI
// (Ini mesin buat nampilin data ke HTML)
// ==========================================

const updateContainer = document.getElementById('updates-container');

if (updateContainer) {
    appUpdates.forEach(update => {
        // Bikin HTML per item
        const itemHtml = `
            <div class="update-item">
                <div class="update-dot"></div>
                <div>
                    <span class="version-tag">${update.version}</span>
                    <span class="update-date">${update.date}</span>
                </div>
                <h3 style="margin: 10px 0; color: #fff;">${update.title}</h3>
                <ul class="changes-list">
                    ${update.changes.map(change => `<li>${change}</li>`).join('')}
                </ul>
            </div>
        `;
        updateContainer.innerHTML += itemHtml;
    });
}
