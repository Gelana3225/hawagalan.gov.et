// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and functionality
    initAnimations();
    initMobileMenu();
    initSmoothScrolling();
    initNavbarScroll();
    initParallaxEffects();
    initInteractiveElements();
    initFormHandling();
    initParticleEffects();
    initAttractionReadMore();
});

// Animation System
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons, .section-title, .about-text, .about-image, .attraction-card, .event-card, .contact-item, .stat');
    
    animatedElements.forEach((element, index) => {
        // Add appropriate animation classes
        if (element.classList.contains('hero-title')) {
            element.classList.add('fade-in');
        } else if (element.classList.contains('hero-subtitle')) {
            element.classList.add('fade-in', 'stagger-1');
        } else if (element.classList.contains('hero-buttons')) {
            element.classList.add('fade-in', 'stagger-2');
        } else if (element.classList.contains('section-title')) {
            element.classList.add('scale-in');
        } else if (element.classList.contains('about-text')) {
            element.classList.add('slide-in-left');
        } else if (element.classList.contains('about-image')) {
            element.classList.add('slide-in-right');
        } else if (element.classList.contains('attraction-card')) {
            element.classList.add('bounce-in', `stagger-${(index % 4) + 1}`);
        } else if (element.classList.contains('event-card')) {
            element.classList.add('slide-in-left', `stagger-${(index % 3) + 1}`);
        } else if (element.classList.contains('contact-item')) {
            element.classList.add('fade-in', `stagger-${(index % 4) + 1}`);
        } else if (element.classList.contains('stat')) {
            element.classList.add('rotate-in', `stagger-${(index % 3) + 1}`);
        }
        
        observer.observe(element);
    });

    // Hero section entrance animation
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate');
            }, index * 300);
        });
    }, 500);
}

// Mobile Menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Special handling for external links
            if (link.getAttribute('href') && link.getAttribute('href').includes('.html')) {
                // Allow normal navigation for external links
                console.log('Navigating to:', link.getAttribute('href'));
            }
            
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove background on scroll
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }

        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Parallax Effects
function initParallaxEffects() {
    const heroSection = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Interactive Elements
function initInteractiveElements() {
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Card hover effects
    const cards = document.querySelectorAll('.attraction-card, .event-card, .contact-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Stats counter animation
    const stats = document.querySelectorAll('.stat h3');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statsObserver.observe(stat));
}

// Counter Animation
function animateCounter(element) {
    const target = parseInt(element.textContent);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
    }, 16);
}

// Form Handling
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form form');
    const newsletterForm = document.querySelector('.newsletter-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = '#10b981';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const input = this.querySelector('input');
            const button = this.querySelector('button');
            const originalText = button.textContent;
            
            button.textContent = 'Subscribing...';
            button.disabled = true;

            setTimeout(() => {
                button.textContent = 'Subscribed!';
                button.style.background = '#10b981';
                input.value = '';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.background = '';
                }, 2000);
            }, 1000);
        });
    }
}

// Particle Effects
function initParticleEffects() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Create particle container
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 1;
    `;
    hero.appendChild(particleContainer);

    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        pointer-events: none;
        animation: float 6s ease-in-out infinite;
    `;

    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';

    container.appendChild(particle);
}

// Add floating animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
        }
        50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.8;
        }
    }

    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }

    @keyframes shimmer {
        0% {
            background-position: -200% 0;
        }
        100% {
            background-position: 200% 0;
        }
    }

    .hero-title {
        background: linear-gradient(90deg, #ffffff, #f0f9ff, #ffffff);
        background-size: 200% 100%;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: shimmer 3s ease-in-out infinite;
    }

    .attraction-card:hover .attraction-image {
        animation: pulse 1s ease-in-out;
    }

    .stat:hover {
        animation: pulse 0.6s ease-in-out;
    }
`;
document.head.appendChild(style);

// Additional Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Typing effect for hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing after hero elements animate
        setTimeout(typeWriter, 1500);
    }

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #2563eb, #667eea);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
}); 

// Farming Section Animations
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all photo boxes for animation
    const photoBoxes = document.querySelectorAll('.photo-box');
    photoBoxes.forEach(box => {
        observer.observe(box);
    });

    // Add hover sound effect simulation (visual feedback)
    photoBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02) translateY(-5px)';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Parallax effect for farming welcome section
    const farmingWelcome = document.querySelector('.farming-welcome');
    if (farmingWelcome) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            farmingWelcome.style.transform = `translateY(${rate}px)`;
        });
    }

    // Add loading animation for images
    const images = document.querySelectorAll('.photo-box img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });
        
        img.addEventListener('error', function() {
            this.style.opacity = '0.5';
            this.style.filter = 'grayscale(100%)';
        });
    });
});



// Add smooth reveal animation for sections
const revealSections = () => {
    const sections = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionVisible = 150;
        
        if (sectionTop < windowHeight - sectionVisible) {
            section.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections); 

// Scroll to section function
function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Read More toggle for Attractions
function initAttractionReadMore() {
    const attractionCards = document.querySelectorAll('.attraction-card');
    attractionCards.forEach(card => {
        const readMoreLink = card.querySelector('.attraction-link');
        const hiddenText = card.querySelector('.hidden-text');
        if (!readMoreLink || !hiddenText) return;

        readMoreLink.addEventListener('click', function(e) {
            e.preventDefault();
            const isVisible = hiddenText.style.display !== 'none';
            hiddenText.style.display = isVisible ? 'none' : 'block';
            this.textContent = isVisible ? 'Read More' : 'Read Less';
            this.setAttribute('aria-expanded', (!isVisible).toString());
        });
    });

    // Read More toggle for Charity Cards
    const charityCards = document.querySelectorAll('.charity-card');
    charityCards.forEach(card => {
        const readMoreLink = card.querySelector('.charity-link');
        const hiddenText = card.querySelector('.hidden-text');
        if (!readMoreLink || !hiddenText) return;

        readMoreLink.addEventListener('click', function(e) {
            e.preventDefault();
            const isVisible = hiddenText.style.display !== 'none';
            hiddenText.style.display = isVisible ? 'none' : 'block';
            this.textContent = isVisible ? 'Read More' : 'Read Less';
            this.setAttribute('aria-expanded', (!isVisible).toString());
        });
    });

    // Read More toggle for Hospital Cards
    const hospitalCards = document.querySelectorAll('.hospital-card');
    hospitalCards.forEach(card => {
        const readMoreLink = card.querySelector('.hospital-link');
        const hiddenText = card.querySelector('.hidden-text');
        if (!readMoreLink || !hiddenText) return;

        readMoreLink.addEventListener('click', function(e) {
            e.preventDefault();
            const isVisible = hiddenText.style.display !== 'none';
            hiddenText.style.display = isVisible ? 'none' : 'block';
            this.textContent = isVisible ? 'Read More' : 'Read Less';
            this.setAttribute('aria-expanded', (!isVisible).toString());
        });
    });
}