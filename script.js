document.addEventListener('DOMContentLoaded', () => {
    // Animation au défilement (Intersection Observer)
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    // Appliquer l'animation aux cartes "glass"
    document.querySelectorAll('.glass').forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "all 0.7s ease-out";
        observer.observe(card);
    });

    // Gestion du formulaire de contact
    const contactForm = document.getElementById('portfolioContact');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button');
            submitBtn.innerText = "Envoi en cours...";
            
            setTimeout(() => {
                alert("Merci Warren ! Message simulé envoyé. (Intégrez un service comme Formspree pour la réception réelle)");
                submitBtn.innerText = "Envoyer";
                contactForm.reset();
            }, 1500);
        });
    }
});
