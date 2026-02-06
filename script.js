document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. GOD-TIER 3D PARALLAX ENGINE
    // (Bikin HP-nya gerak ngikutin mouse user)
    // ==========================================
    const tiltContainer = document.getElementById('tilt-container');
    const tiltCard = document.querySelector('.tilt-card');
    const floatBadges = document.querySelectorAll('.float-badge');

    if (tiltContainer && tiltCard) {
        // Config: Seberapa ekstrim gerakannya?
        const ROTATION_RANGE = 15; // Derajat rotasi max
        const PARALLAX_DEPTH = 40; // Pixel pergeseran floating elements

        tiltContainer.addEventListener('mousemove', (e) => {
            const rect = tiltContainer.getBoundingClientRect();
            
            // Hitung posisi mouse relatif terhadap tengah container (range -1 sampai 1)
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xPct = (x / rect.width - 0.5) * 2;
            const yPct = (y / rect.height - 0.5) * 2;

            // Kalkulasi Rotasi (Inverse Y biar natural)
            const rotateX = yPct * -ROTATION_RANGE;
            const rotateY = xPct * ROTATION_RANGE;

            // Apply ke Card Utama
            // requestAnimationFrame biar 60fps smooth di monitor high refresh rate
            requestAnimationFrame(() => {
                tiltCard.style.transform = `
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg)
                    scale3d(1.05, 1.05, 1.05)
                `;
            });

            // Apply Parallax ke Floating Badges (Efek Depth)
            floatBadges.forEach((badge, index) => {
                const depthFactor = (index + 1) * 0.5; // Badge beda layer beda speed
                const moveX = xPct * -PARALLAX_DEPTH * depthFactor;
                const moveY = yPct * -PARALLAX_DEPTH * depthFactor;

                badge.style.transform = `
                    translateZ(60px) 
                    translate(${moveX}px, ${moveY}px)
                `;
            });
        });

        // Reset Posisi saat Mouse Keluar (Snap Back)
        tiltContainer.addEventListener('mouseleave', () => {
            tiltCard.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
            tiltCard.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            
            floatBadges.forEach(badge => {
                badge.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
                badge.style.transform = `translateZ(60px) translate(0,0)`;
            });

            // Hapus transition setelah animasi selesai biar mousemove berikutnya gak delay
            setTimeout(() => {
                tiltCard.style.transition = '';
                floatBadges.forEach(b => b.style.transition = '');
            }, 500);
        });
    }

    // ==========================================
    // 2. CINEMATIC SCROLL REVEAL
    // (Munculin elemen pas discroll kayak film)
    // ==========================================
    const observerOptions = {
        threshold: 0.15, // Muncul pas 15% elemen masuk layar
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Cukup animasi sekali seumur hidup
            }
        });
    }, observerOptions);

    // Target semua elemen yang punya class .reveal, .reveal-text, .reveal-visual
    document.querySelectorAll('.reveal, .reveal-text, .reveal-visual').forEach(el => {
        observer.observe(el);
    });

    // ==========================================
    // 3. AUTO-PILOT IMAGE SLIDER
    // (Ganti screenshot HP otomatis)
    // ==========================================
    const slides = document.querySelectorAll('.app-slide');
    let currentSlide = 0;
    const SLIDE_DURATION = 4000; // 4 Detik

    if (slides.length > 1) {
        setInterval(() => {
            // Hapus class active dari slide sekarang
            slides[currentSlide].classList.remove('active');
            
            // Pindah index (Looping: 0 -> 1 -> 2 -> 0)
            currentSlide = (currentSlide + 1) % slides.length;
            
            // Tambah class active ke slide baru
            slides[currentSlide].classList.add('active');
        }, SLIDE_DURATION);
    }

    // ==========================================
    // 4. SMOOTH SCROLL NAVIGATOR
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetEl = document.querySelector(targetId);
            
            if (targetEl) {
                // Scroll dengan offset dikit biar gak ketutup navbar
                const headerOffset = 80;
                const elementPosition = targetEl.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // ==========================================
    // 5. DEVELOPER SIGNATURE (Easter Egg)
    // ==========================================
    console.log(
        "%c PurrTune Audio Engine %c v1.0.0 Stable ",
        "background:#22D3EE; color:#000; font-weight:bold; padding:4px; border-radius:4px 0 0 4px;",
        "background:#000; color:#22D3EE; border:1px solid #22D3EE; padding:4px; border-radius:0 4px 4px 0;"
    );
    console.log("🚀 DSP Architecture: Online");
    console.log("🛡️ Privacy Shield: Active");
});
