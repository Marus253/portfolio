// ===== VARIABLES GLOBALES =====
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const contactForm = document.getElementById('contactForm');
const currentYearSpan = document.getElementById('currentYear');

// ===== THEME MODE =====
function initTheme() {
    // Vérifie le thème sauvegardé ou la préférence système
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        // Utilise le thème sauvegardé
        setTheme(savedTheme);
    } else if (systemPrefersDark) {
        // Utilise la préférence système
        setTheme('dark');
    } else {
        // Utilise le thème clair par défaut
        setTheme('light');
    }
}

function setTheme(theme) {
    document.body.className = theme + '-mode';
    
    // Met à jour l'icône
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
    
    // Sauvegarde le thème
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// ===== MOBILE MENU =====
function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    // Change l'icône du bouton
    const icon = mobileMenuButton.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    const icon = mobileMenuButton.querySelector('i');
    icon.className = 'fas fa-bars';
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Ferme le menu mobile si ouvert
                closeMobileMenu();
                
                // Scroll vers l'élément
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== FORMULAIRE DE CONTACT =====
function initContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupère les valeurs du formulaire
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation simple
        if (!name || !email || !message) {
            showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Veuillez entrer une adresse email valide.', 'error');
            return;
        }
        
        // Simulation d'envoi (à remplacer par un vrai backend)
        showNotification(`Merci ${name} ! Votre message a été envoyé. Je vous répondrai à ${email} dès que possible.`, 'success');
        
        // Réinitialise le formulaire
        contactForm.reset();
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Crée la notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style de la notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)';
    }
    
    // Ajoute la notification au body
    document.body.appendChild(notification);
    
    // Supprime la notification après 5 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// ===== ANIMATIONS AU SCROLL =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe les éléments à animer
    const elementsToAnimate = document.querySelectorAll('.skill-category, .project-card');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// ===== MISE À JOUR DE L'ANNÉE =====
function updateCurrentYear() {
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
}

// ===== INITIALISATION =====
function init() {
    // Initialise le thème
    initTheme();
    
    // Initialise le menu mobile
    mobileMenuButton.addEventListener('click', toggleMobileMenu);
    
    // Ferme le menu mobile quand on clique sur un lien
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Initialise le toggle de thème
    themeToggle.addEventListener('click', toggleTheme);
    
    // Initialise le scroll fluide
    initSmoothScroll();
    
    // Initialise le formulaire de contact
    initContactForm();
    
    // Initialise les animations au scroll
    initScrollAnimations();
    
    // Met à jour l'année dans le footer
    updateCurrentYear();
    
    // Ajoute les styles d'animation pour les notifications
    addNotificationStyles();
}

// ===== AJOUTE LES STYLES POUR LES NOTIFICATIONS =====
function addNotificationStyles() {
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== EXÉCUTE L'INITIALISATION QUAND LE DOM EST CHARGÉ =====
document.addEventListener('DOMContentLoaded', init);

// ===== GESTION DU REDIMENSIONNEMENT =====
window.addEventListener('resize', function() {
    // Ferme le menu mobile si on passe en desktop
    if (window.innerWidth >= 768) {
        closeMobileMenu();
    }
});

// ===== GESTION DU SCROLL POUR LE HEADER =====
let lastScroll = 0;
window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    const header = document.querySelector('.header');
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scroll vers le bas
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scroll vers le haut
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});