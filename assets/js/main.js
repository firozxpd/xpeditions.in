// Xpeditions site — minimal JS
document.addEventListener('DOMContentLoaded', function() {
    // Mobile nav toggle
    var toggle = document.querySelector('.nav-toggle');
    var links = document.querySelector('.nav-links');
    if (toggle && links) {
        toggle.addEventListener('click', function() {
            links.classList.toggle('open');
        });
    }
    document.querySelectorAll('.nav-links a').forEach(function(a) {
        a.addEventListener('click', function() {
            if (links) links.classList.remove('open');
        });
    });

    // ============ Contact form (Web3Forms) ============
    document.querySelectorAll('form.contact-form').forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            var status = form.querySelector('.form-status');
            var submitBtn = form.querySelector('button[type="submit"]');

            // Basic validation
            var name  = (form.elements['name'] && form.elements['name'].value || '').trim();
            var email = (form.elements['email'] && form.elements['email'].value || '').trim();
            if (!name || !email) {
                showStatus(status, 'Please enter your name and email.', 'error');
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showStatus(status, 'Please enter a valid email address.', 'error');
                return;
            }

            // Honeypot — if a bot filled the hidden checkbox, silently drop
            if (form.elements['botcheck'] && form.elements['botcheck'].checked) {
                return;
            }

            // Disable button + show "sending"
            var originalText = submitBtn ? submitBtn.innerHTML : '';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Sending…';
            }
            showStatus(status, '', '');

            // POST as JSON to Web3Forms
            var data = {};
            new FormData(form).forEach(function(v, k) { data[k] = v; });

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(function(res) { return res.json().then(function(json) { return { ok: res.ok, json: json }; }); })
            .then(function(result) {
                if (result.ok && result.json && result.json.success) {
                    showStatus(status, 'Thanks ' + name + ' — your message has been sent. We will reply within one working day.', 'success');
                    form.reset();
                } else {
                    var msg = (result.json && result.json.message) || 'Something went wrong. Please email mail@xpeditions.in directly.';
                    showStatus(status, msg, 'error');
                }
            })
            .catch(function() {
                showStatus(status, 'Could not send right now. Please email mail@xpeditions.in directly.', 'error');
            })
            .finally(function() {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
            });
        });
    });

    function showStatus(el, text, kind) {
        if (!el) return;
        el.textContent = text;
        el.className = 'form-status' + (kind ? ' is-' + kind : '');
    }

    // Reveal-on-scroll for cards
    if ('IntersectionObserver' in window) {
        var obs = new IntersectionObserver(function(entries) {
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
