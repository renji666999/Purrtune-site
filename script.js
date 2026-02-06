document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. SCROLL REVEAL ANIMATION
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Animasi sekali jalan
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // ==========================================
    // 2. SMOOTH SCROLL FOR ANCHORS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==========================================
    // 3. HERO IMAGE SLIDER (AUTO FADE)
    // ==========================================
    const slides = document.querySelectorAll('.app-slide');
    let currentSlideIndex = 0;
    const slideIntervalTime = 4000; // 4 Detik per slide

    function nextSlide() {
        if (slides.length === 0) return;

        // Hapus class active dari slide sekarang
        slides[currentSlideIndex].classList.remove('active');
        
        // Pindah ke index berikutnya (Looping)
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        
        // Tambah class active ke slide berikutnya
        slides[currentSlideIndex].classList.add('active');
    }

    // Jalankan slider hanya jika gambar lebih dari 1
    if (slides.length > 1) {
        setInterval(nextSlide, slideIntervalTime);
    }

    // ==========================================
    // 4. CONSOLE EASTER EGG
    // ==========================================
    console.log(
        "%c PurrTune v1.0 %c by Query Cat ",
        "background:#22D3EE; color:#000; font-weight:bold; padding:4px; border-radius:4px 0 0 4px",
        "background:#05050A; color:#22D3EE; padding:4px; border-radius:0 4px 4px 0; border: 1px solid #22D3EE"
    );
    console.log("Meow! Looking for bugs? We ate them. 🐱");
});
