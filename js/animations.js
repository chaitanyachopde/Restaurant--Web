// Advanced Animation Controller for Restaurant Website
class AnimationController {
    constructor() {
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.animations = new Map();
        this.intersectionObserver = null;
        this.init();
    }

    init() {
        this.setupAdvancedAnimations();
        this.setupScrollTriggers();
        this.setupHoverAnimations();
        this.setupMenuAnimations();
        this.setupGalleryAnimations();
        this.setupFormAnimations();
        this.setupParticleSystem();
        this.setupAdvancedParallax();
        this.handleReducedMotion();
    }

    // Advanced Animation Setups
    setupAdvancedAnimations() {
        // Custom animation timeline for hero section
        this.createHeroTimeline();
        
        // Morphing hamburger menu animations
        this.setupHamburgerMorph();
        
        // Advanced scroll indicators
        this.setupScrollIndicators();
        
        // Loading screen enhancements
        this.enhanceLoadingScreen();
    }

    createHeroTimeline() {
        const heroElements = {
            background: document.querySelector('.hero-background'),
            title: document.querySelectorAll('.hero-title .title-line'),
            subtitle: document.querySelector('.hero-subtitle'),
            buttons: document.querySelectorAll('.hero-buttons .btn'),
            floatingElements: document.querySelectorAll('.floating-element')
        };

        if (!heroElements.background) return;

        // Enhanced hero animation sequence
        setTimeout(() => {
            // Animate background layers
            const parallaxLayers = document.querySelectorAll('.parallax-layer');
            parallaxLayers.forEach((layer, index) => {
                layer.style.animation = `parallaxReveal ${2 + index * 0.5}s ease-out forwards`;
            });

            // Staggered title animation
            heroElements.title.forEach((line, index) => {
                line.style.animationDelay = `${0.5 + index * 0.3}s`;
                line.classList.add('animate-title-reveal');
            });

            // Floating elements with physics
            heroElements.floatingElements.forEach((element, index) => {
                this.animateFloatingElement(element, index);
            });
        }, 100);
    }

    setupHamburgerMorph() {
        const hamburger = document.getElementById('hamburger');
        const bars = hamburger?.querySelectorAll('.bar');
        
        if (!hamburger || !bars.length) return;

        hamburger.addEventListener('click', () => {
            const isActive = hamburger.classList.contains('active');
            
            if (!this.isReducedMotion) {
                bars.forEach((bar, index) => {
                    bar.style.transformOrigin = 'center';
                    bar.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                    
                    if (isActive) {
                        // Reset to hamburger
                        setTimeout(() => {
                            bar.style.transform = '';
                        }, 50 * index);
                    } else {
                        // Morph to X
                        setTimeout(() => {
                            if (index === 0) {
                                bar.style.transform = 'translateY(7px) rotate(45deg)';
                            } else if (index === 1) {
                                bar.style.transform = 'scaleX(0)';
                            } else if (index === 2) {
                                bar.style.transform = 'translateY(-7px) rotate(-45deg)';
                            }
                        }, 50 * index);
                    }
                });
            }
        });
    }

    setupScrollIndicators() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (!scrollIndicator) return;

        // Enhanced scroll indicator with progress
        const scrollLine = scrollIndicator.querySelector('.scroll-line');
        if (scrollLine) {
            window.addEventListener('scroll', () => {
                const scrollProgress = Math.min(window.scrollY / window.innerHeight, 1);
                scrollLine.style.height = `${30 + scrollProgress * 20}px`;
                scrollLine.style.opacity = 1 - scrollProgress;
            });
        }

        // Hide scroll indicator after first scroll
        let hasScrolled = false;
        window.addEventListener('scroll', () => {
            if (!hasScrolled && window.scrollY > 100) {
                hasScrolled = true;
                scrollIndicator.style.animation = 'fadeOut 0.5s ease forwards';
            }
        });
    }

    enhanceLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (!loadingScreen) return;

        const logo = loadingScreen.querySelector('.loading-logo');
        const textSpans = loadingScreen.querySelectorAll('.loading-text span');
        const progressBar = loadingScreen.querySelector('.loading-progress');

        // Enhanced logo animation
        if (logo && !this.isReducedMotion) {
            logo.style.animation = 'logoRotate 2s ease-out forwards, pulse 2s ease-in-out infinite 2s';
        }

        // Letter-by-letter text reveal with physics
        if (textSpans.length && !this.isReducedMotion) {
            textSpans.forEach((span, index) => {
                span.style.animation = `letterDrop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards`;
                span.style.animationDelay = `${0.1 + index * 0.08}s`;
            });
        }

        // Progress bar with easing
        if (progressBar) {
            progressBar.style.animation = 'progressFill 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
        }
    }

    // Scroll-triggered Animations
    setupScrollTriggers() {
        if ('IntersectionObserver' in window) {
            this.intersectionObserver = new IntersectionObserver(
                (entries) => this.handleIntersection(entries),
                {
                    threshold: [0.1, 0.3, 0.6],
                    rootMargin: '0px 0px -10% 0px'
                }
            );

            // Elements to observe for scroll animations
            const elementsToObserve = document.querySelectorAll(`
                .section-header,
                .feature-item,
                .stat-item,
                .menu-item,
                .gallery-item,
                .contact-item,
                .about-text,
                .contact-form-container
            `);

            elementsToObserve.forEach(element => {
                element.classList.add('scroll-reveal');
                this.intersectionObserver.observe(element);
            });
        }
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = this.getAnimationType(element);
                
                this.triggerScrollAnimation(element, animationType);
                this.intersectionObserver.unobserve(element);
            }
        });
    }

    getAnimationType(element) {
        if (element.classList.contains('section-header')) return 'fadeInUp';
        if (element.classList.contains('feature-item')) return 'slideInLeft';
        if (element.classList.contains('stat-item')) return 'zoomIn';
        if (element.classList.contains('menu-item')) return 'flipIn';
        if (element.classList.contains('gallery-item')) return 'scaleIn';
        if (element.classList.contains('contact-item')) return 'slideInRight';
        return 'fadeIn';
    }

    triggerScrollAnimation(element, animationType) {
        if (this.isReducedMotion) {
            element.style.opacity = '1';
            element.style.transform = 'none';
            return;
        }

        element.classList.remove('scroll-reveal');
        element.classList.add(`animate-${animationType}`);

        // Add staggered delay for grouped elements
        const siblings = Array.from(element.parentNode.children).filter(child => 
            child.classList.contains(element.classList[0])
        );
        const index = siblings.indexOf(element);
        element.style.animationDelay = `${index * 0.1}s`;
    }

    // Enhanced Hover Animations
    setupHoverAnimations() {
        this.setupButtonHovers();
        this.setupCardHovers();
        this.setupImageHovers();
        this.setupNavigationHovers();
    }

    setupButtonHovers() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            if (this.isReducedMotion) return;

            button.addEventListener('mouseenter', () => {
                this.createRippleEffect(button);
                button.style.animation = 'buttonHover 0.3s ease forwards';
            });

            button.addEventListener('mouseleave', () => {
                button.style.animation = 'buttonHoverOut 0.3s ease forwards';
            });

            button.addEventListener('click', (e) => {
                this.createClickWave(button, e);
            });
        });
    }

    setupCardHovers() {
        const cards = document.querySelectorAll('.menu-item, .gallery-item, .stat-item');
        
        cards.forEach(card => {
            if (this.isReducedMotion) return;

            card.addEventListener('mouseenter', () => {
                card.style.animation = 'cardLift 0.3s ease forwards';
                this.animateCardChildren(card, 'in');
            });

            card.addEventListener('mouseleave', () => {
                card.style.animation = 'cardDrop 0.3s ease forwards';
                this.animateCardChildren(card, 'out');
            });
        });
    }

    setupImageHovers() {
        const images = document.querySelectorAll('.menu-item-image, .gallery-image');
        
        images.forEach(image => {
            if (this.isReducedMotion) return;

            image.addEventListener('mouseenter', () => {
                image.style.animation = 'imageZoom 0.5s ease forwards';
            });

            image.addEventListener('mouseleave', () => {
                image.style.animation = 'imageZoomOut 0.5s ease forwards';
            });
        });
    }

    setupNavigationHovers() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            if (this.isReducedMotion) return;

            link.addEventListener('mouseenter', () => {
                const indicator = link.querySelector('.nav-indicator');
                if (indicator) {
                    indicator.style.animation = 'indicatorGrow 0.3s ease forwards';
                }
            });

            link.addEventListener('mouseleave', () => {
                const indicator = link.querySelector('.nav-indicator');
                if (indicator && !link.classList.contains('active')) {
                    indicator.style.animation = 'indicatorShrink 0.3s ease forwards';
                }
            });
        });
    }

    // Menu-specific Animations
    setupMenuAnimations() {
        const categoryBtns = document.querySelectorAll('.category-btn');
        const menuItems = document.querySelectorAll('.menu-item');

        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (this.isReducedMotion) return;

                // Animate category button
                btn.style.animation = 'categorySelect 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards';

                // Animate menu items with staggered exit/enter
                this.animateMenuTransition(menuItems, btn.dataset.category);
            });
        });

        // Price reveal animations
        this.setupPriceAnimations();
    }

    animateMenuTransition(menuItems, category) {
        const itemsToHide = [];
        const itemsToShow = [];

        menuItems.forEach(item => {
            const itemCategory = item.dataset.category;
            const shouldShow = category === 'all' || category === itemCategory;
            
            if (shouldShow) {
                itemsToShow.push(item);
            } else {
                itemsToHide.push(item);
            }
        });

        // Animate out hidden items
        itemsToHide.forEach((item, index) => {
            setTimeout(() => {
                item.style.animation = 'menuItemExit 0.3s ease forwards';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }, index * 50);
        });

        // Animate in visible items
        setTimeout(() => {
            itemsToShow.forEach((item, index) => {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.animation = 'menuItemEnter 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards';
                }, index * 100);
            });
        }, itemsToHide.length * 50 + 200);
    }

    setupPriceAnimations() {
        const menuItems = document.querySelectorAll('.menu-item');
        
        menuItems.forEach(item => {
            const price = item.querySelector('.price');
            if (!price || this.isReducedMotion) return;

            item.addEventListener('mouseenter', () => {
                price.style.animation = 'priceHighlight 0.4s ease forwards';
            });

            item.addEventListener('mouseleave', () => {
                price.style.animation = 'priceNormal 0.4s ease forwards';
            });
        });
    }

    // Gallery-specific Animations
    setupGalleryAnimations() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach((item, index) => {
            if (this.isReducedMotion) return;

            // Staggered reveal animation
            item.style.animationDelay = `${index * 0.1}s`;
            
            // Enhanced hover effects
            item.addEventListener('mouseenter', () => {
                this.animateGalleryItem(item, 'enter');
            });

            item.addEventListener('mouseleave', () => {
                this.animateGalleryItem(item, 'leave');
            });
        });

        this.setupLightboxAnimations();
    }

    animateGalleryItem(item, state) {
        const image = item.querySelector('.gallery-image');
        const overlay = item.querySelector('.gallery-overlay');
        const content = item.querySelector('.gallery-content');

        if (state === 'enter') {
            image.style.animation = 'galleryImageZoom 0.5s ease forwards';
            overlay.style.animation = 'overlayFadeIn 0.3s ease forwards';
            if (content) {
                content.style.animation = 'contentSlideUp 0.4s ease 0.1s forwards';
            }
        } else {
            image.style.animation = 'galleryImageZoomOut 0.5s ease forwards';
            overlay.style.animation = 'overlayFadeOut 0.3s ease forwards';
            if (content) {
                content.style.animation = 'contentSlideDown 0.4s ease forwards';
            }
        }
    }

    setupLightboxAnimations() {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox || this.isReducedMotion) return;

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const isActive = lightbox.classList.contains('active');
                    if (isActive) {
                        this.animateLightboxOpen();
                    }
                }
            });
        });

        observer.observe(lightbox, { attributes: true });
    }

    animateLightboxOpen() {
        const lightboxContent = document.querySelector('.lightbox-content');
        const lightboxImage = document.querySelector('.lightbox-image');
        
        if (lightboxContent && lightboxImage) {
            lightboxContent.style.animation = 'lightboxContentScale 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards';
            lightboxImage.style.animation = 'lightboxImageFade 0.3s ease 0.2s forwards';
        }
    }

    // Form Animations
    setupFormAnimations() {
        this.setupInputAnimations();
        this.setupValidationAnimations();
        this.setupSubmissionAnimations();
    }

    setupInputAnimations() {
        const inputs = document.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            if (this.isReducedMotion) return;

            input.addEventListener('focus', () => {
                const formGroup = input.closest('.form-group');
                if (formGroup) {
                    formGroup.style.animation = 'inputFocus 0.3s ease forwards';
                }
            });

            input.addEventListener('blur', () => {
                const formGroup = input.closest('.form-group');
                if (formGroup) {
                    formGroup.style.animation = 'inputBlur 0.3s ease forwards';
                }
            });
        });
    }

    setupValidationAnimations() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            if (this.isReducedMotion) return;

            const invalidInputs = form.querySelectorAll(':invalid');
            invalidInputs.forEach((input, index) => {
                setTimeout(() => {
                    input.style.animation = 'inputError 0.5s ease forwards';
                }, index * 100);
            });
        });
    }

    setupSubmissionAnimations() {
        const submitBtn = document.querySelector('.form-submit');
        if (!submitBtn || this.isReducedMotion) return;

        submitBtn.addEventListener('click', () => {
            submitBtn.style.animation = 'buttonPress 0.2s ease forwards';
        });
    }

    // Particle System
    setupParticleSystem() {
        if (this.isReducedMotion) return;

        this.createFloatingParticles();
        this.setupInteractiveParticles();
    }

    createFloatingParticles() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;

        const particleCount = window.innerWidth < 768 ? 10 : 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(212, 175, 55, ${Math.random() * 0.5 + 0.3});
                border-radius: 50%;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat ${Math.random() * 10 + 15}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            
            heroSection.appendChild(particle);
        }
    }

    setupInteractiveParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        hero.addEventListener('mousemove', (e) => {
            if (Math.random() > 0.9) { // Only create particles occasionally
                this.createInteractiveParticle(e.clientX, e.clientY);
            }
        });
    }

    createInteractiveParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: particleBurst 0.8s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 800);
    }

    // Advanced Parallax
    setupAdvancedParallax() {
        if (this.isReducedMotion) return;

        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallax) || 0.5;
                const yPos = scrolled * speed;
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        });
    }

    // Utility Functions
    createRippleEffect(element) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            left: 50%;
            top: 50%;
            width: 20px;
            height: 20px;
            margin-left: -10px;
            margin-top: -10px;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    createClickWave(element, event) {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const wave = document.createElement('span');
        wave.className = 'click-wave';
        wave.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: translate(-50%, -50%);
            animation: clickWave 0.5s ease-out;
            pointer-events: none;
        `;
        
        element.appendChild(wave);
        setTimeout(() => wave.remove(), 500);
    }

    animateCardChildren(card, direction) {
        const children = card.querySelectorAll('h3, p, .price, .gallery-content');
        
        children.forEach((child, index) => {
            const delay = index * 50;
            const animation = direction === 'in' ? 'childSlideIn' : 'childSlideOut';
            
            setTimeout(() => {
                child.style.animation = `${animation} 0.3s ease forwards`;
            }, delay);
        });
    }

    animateFloatingElement(element, index) {
        const baseDelay = index * 0.5;
        const duration = 3 + Math.random() * 2;
        
        element.style.animation = `
            floatingElement ${duration}s ease-in-out infinite ${baseDelay}s,
            floatingRotate ${duration * 2}s linear infinite ${baseDelay}s
        `;
    }

    handleReducedMotion() {
        if (this.isReducedMotion) {
            // Remove all animations and replace with simple opacity changes
            const style = document.createElement('style');
            style.textContent = `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
                .scroll-reveal {
                    opacity: 1 !important;
                    transform: none !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Cleanup
    destroy() {
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
        
        this.animations.clear();
        
        // Remove particle elements
        document.querySelectorAll('.floating-particle').forEach(particle => {
            particle.remove();
        });
    }
}

// Additional CSS animations to be injected
const additionalAnimations = `
    @keyframes letterDrop {
        0% {
            opacity: 0;
            transform: translateY(-20px) rotate(-5deg);
        }
        100% {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
        }
    }
    
    @keyframes progressFill {
        0% { width: 0%; }
        100% { width: 100%; }
    }
    
    @keyframes buttonHover {
        0% { transform: translateY(0) scale(1); }
        100% { transform: translateY(-2px) scale(1.05); }
    }
    
    @keyframes buttonHoverOut {
        0% { transform: translateY(-2px) scale(1.05); }
        100% { transform: translateY(0) scale(1); }
    }
    
    @keyframes cardLift {
        0% { transform: translateY(0) scale(1); }
        100% { transform: translateY(-10px) scale(1.02); }
    }
    
    @keyframes cardDrop {
        0% { transform: translateY(-10px) scale(1.02); }
        100% { transform: translateY(0) scale(1); }
    }
    
    @keyframes imageZoom {
        0% { transform: scale(1); }
        100% { transform: scale(1.1); }
    }
    
    @keyframes imageZoomOut {
        0% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    @keyframes menuItemExit {
        0% { opacity: 1; transform: scale(1) rotateY(0deg); }
        100% { opacity: 0; transform: scale(0.8) rotateY(-90deg); }
    }
    
    @keyframes menuItemEnter {
        0% { opacity: 0; transform: scale(0.8) rotateY(90deg); }
        100% { opacity: 1; transform: scale(1) rotateY(0deg); }
    }
    
    @keyframes priceHighlight {
        0% { transform: scale(1); color: var(--primary-color); }
        100% { transform: scale(1.2); color: var(--accent-color); }
    }
    
    @keyframes priceNormal {
        0% { transform: scale(1.2); color: var(--accent-color); }
        100% { transform: scale(1); color: var(--primary-color); }
    }
    
    @keyframes galleryImageZoom {
        0% { transform: scale(1) rotate(0deg); }
        100% { transform: scale(1.15) rotate(2deg); }
    }
    
    @keyframes galleryImageZoomOut {
        0% { transform: scale(1.15) rotate(2deg); }
        100% { transform: scale(1) rotate(0deg); }
    }
    
    @keyframes overlayFadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
    
    @keyframes overlayFadeOut {
        0% { opacity: 1; }
        100% { opacity: 0; }
    }
    
    @keyframes contentSlideUp {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes contentSlideDown {
        0% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(20px); }
    }
    
    @keyframes lightboxContentScale {
        0% { opacity: 0; transform: scale(0.8); }
        100% { opacity: 1; transform: scale(1); }
    }
    
    @keyframes lightboxImageFade {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
    
    @keyframes inputFocus {
        0% { transform: scale(1); }
        100% { transform: scale(1.02); }
    }
    
    @keyframes inputBlur {
        0% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
    
    @keyframes inputError {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
        20%, 40%, 60%, 80% { transform: translateX(3px); }
    }
    
    @keyframes buttonPress {
        0% { transform: scale(1); }
        50% { transform: scale(0.95); }
        100% { transform: scale(1); }
    }
    
    @keyframes particleFloat {
        0% { 
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
        }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { 
            transform: translateY(-100vh) translateX(50px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes particleBurst {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(3) rotate(180deg);
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes clickWave {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
    
    @keyframes childSlideIn {
        0% { opacity: 0; transform: translateY(10px); }
        100% { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes childSlideOut {
        0% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0.7; transform: translateY(-5px); }
    }
    
    @keyframes floatingRotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes categorySelect {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    @keyframes indicatorGrow {
        0% { width: 0; }
        100% { width: 100%; }
    }
    
    @keyframes indicatorShrink {
        0% { width: 100%; }
        100% { width: 0; }
    }
    
    @keyframes parallaxReveal {
        0% { opacity: 0; transform: scale(1.2); }
        100% { opacity: 0.1; transform: scale(1); }
    }
    
    @keyframes animate-fadeInUp {
        0% { opacity: 0; transform: translateY(30px); }
        100% { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes animate-slideInLeft {
        0% { opacity: 0; transform: translateX(-50px); }
        100% { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes animate-slideInRight {
        0% { opacity: 0; transform: translateX(50px); }
        100% { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes animate-zoomIn {
        0% { opacity: 0; transform: scale(0.8); }
        100% { opacity: 1; transform: scale(1); }
    }
    
    @keyframes animate-flipIn {
        0% { opacity: 0; transform: rotateY(-90deg); }
        100% { opacity: 1; transform: rotateY(0); }
    }
    
    @keyframes animate-scaleIn {
        0% { opacity: 0; transform: scale(0.5); }
        100% { opacity: 1; transform: scale(1); }
    }
`;

// Inject additional animations into the page
if (document.head) {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalAnimations;
    document.head.appendChild(styleSheet);
}

// Initialize animation controller when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.animationController = new AnimationController();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationController;
}
