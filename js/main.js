document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.9)'; // Darker bg on scroll
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(30, 41, 59, 0.7)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for scroll animations (fade in)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation start state to elements
    const animateElements = document.querySelectorAll('.service-card, .benefit-item, .contact-box');
    animateElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        observer.observe(el);
    });

    // WhatsApp Form Submit
    const wpForm = document.getElementById('wp-form');
    if(wpForm) {
        wpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('user-name').value;
            const phone = document.getElementById('user-phone').value;
            const query = document.getElementById('user-query').value;
            
            const wpButton = wpForm.querySelector('.wp-contact');
            const targetPhone = wpButton.getAttribute('data-phone'); // Pablo (Prueba)

            const message = `*Nueva Consulta desde la Web (CCTV & Elec)*\n\n*Nombre:* ${name}\n*Teléfono:* ${phone}\n*Consulta:* ${query}`;
            const wpUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
            window.open(wpUrl, '_blank');
        });
    }

});
