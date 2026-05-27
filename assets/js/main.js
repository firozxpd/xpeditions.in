// Xpeditions site — minimal JS
document.addEventListener('DOMContentLoaded', function() {
    // Mobile nav toggle
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    if (toggle && links) {
        toggle.addEventListener('click', function() {
            links.classList.toggle('open');
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(function(a) {
        a.addEventListener('click', function() {
            if (links) links.classList.remove('open');
        });
    });

    // Simple contact form handler (since this is a static site,
    // wire this up to your backend / mail script when deploying)
    const forms = document.querySelectorAll('form.contact-form');
    forms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const fd = new FormData(form);
            const name = (fd.get('name') || '').toString().trim();
            const email = (fd.get('email') || '').toString().trim();
            if (!name || !email) {
                alert('Please enter your name and email.');
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email.');
                return;
            }
            // Replace with your real submit endpoint (e.g. /mail.php or a serverless function).
            alert('Thank you, ' + name + '! Your message has been received. We will get back to you soon.');
            form.reset();
        });
    });

    // Reveal-on-scroll for cards
    if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver(function(entries) {
            entries.forEach(function(en) {
                if (en.isIntersecting) {
                    en.target.style.opacity = '1';
                    en.target.style.transform = 'translateY(0)';
                    obs.unobserve(en.target);
                }
            });
        }, { threshold: 0.12 });

        document.querySelectorAll('.cap-card, .product-card, .model-card, .testi-card, .service-item')
            .forEach(function(el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                obs.observe(el);
            });
    }
});
