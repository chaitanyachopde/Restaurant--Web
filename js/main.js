// Main JavaScript functionality
class RestaurantWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.handleLoading();
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupMenuFiltering();
        this.setupGallery();
        this.setupContactForm();
        this.setupFloatingElements();
        this.setupIntersectionObserver();
        this.setupCounters();
        this.setupParallax();
    }

    setupEventListeners() {
        // DOM Content Loaded
        document.addEventListener('DOMContentLoaded', () => {
            console.log('Restaurant website loaded');
        });

        // Window Load
        window.addEventListener('load', () => {
            this.handleLoadingComplete();
        });

        // Window Resize
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));

        // Window Scroll
        window.addEventListener('scroll', this.throttle(() => {
            this.handleScroll();
        }, 16));
    }

    // Loading Screen Management
    handleLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        const loadingProgress = document.querySelector('.loading-progress');
        
        if (!loadingScreen || !loadingProgress) return;

        // Simulate loading progress
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(progressInterval);
            }
            loadingProgress.style.width = `${progress}%`;
        }, 100);
    }

    handleLoadingComplete() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                document.body.style.overflow = 'visible';
            }, 800);
        }
    }

    // Navigation Management
    setupNavigation() {
        const navbar = document.getElementById('navbar');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Hamburger menu toggle
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'visible';
            });
        }

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }

                // Close mobile menu
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = 'visible';
                }

                // Update active link
                this.updateActiveNavLink(link);
            });
        });

        // Update navbar on scroll
        this.updateNavbarOnScroll();
    }

    updateActiveNavLink(activeLink) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    updateNavbarOnScroll() {
        const navbar = document.getElementById('navbar');
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            // Add scrolled class to navbar
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Update active navigation based on scroll position
            const scrollY = window.pageYOffset;
            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop - 100;
                const sectionBottom = sectionTop + section.offsetHeight;
                const sectionId = section.getAttribute('id');
                const correspondingNavLink = document.querySelector(`[href="#${sectionId}"]`);

                if (scrollY >= sectionTop && scrollY < sectionBottom) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    if (correspondingNavLink) {
                        correspondingNavLink.classList.add('active');
                    }
                }
            });
        });
    }

    // Scroll Effects
    setupScrollEffects() {
        this.setupScrollToTop();
        this.setupHeroParallax();
    }

    setupScrollToTop() {
        const scrollToTopBtn = document.getElementById('scroll-to-top');
        
        if (scrollToTopBtn) {
            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    setupHeroParallax() {
        const heroSection = document.querySelector('.hero');
        const parallaxLayers = document.querySelectorAll('.parallax-layer');
        
        if (heroSection && parallaxLayers.length > 0) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const heroHeight = heroSection.offsetHeight;
                const scrollPercent = scrolled / heroHeight;

                if (scrollPercent <= 1) {
                    parallaxLayers.forEach((layer, index) => {
                        const speed = layer.dataset.speed || 0.5;
                        const yPos = scrolled * speed;
                        layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
                    });
                }
            });
        }
    }

    handleScroll() {
        const scrollToTopBtn = document.getElementById('scroll-to-top');
        
        // Show/hide scroll to top button
        if (scrollToTopBtn) {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }
    }

    // Menu Filtering
    setupMenuFiltering() {
        const categoryBtns = document.querySelectorAll('.category-btn');
        const menuItems = document.querySelectorAll('.menu-item');

        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                
                // Update active button
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter menu items
                menuItems.forEach((item, index) => {
                    const itemCategory = item.dataset.category;
                    const shouldShow = category === 'all' || category === itemCategory;
                    
                    if (shouldShow) {
                        item.style.display = 'block';
                        // Add staggered animation
                        setTimeout(() => {
                            item.classList.add('animate');
                        }, index * 100);
                    } else {
                        item.style.display = 'none';
                        item.classList.remove('animate');
                    }
                });
            });
        });
    }

    // Gallery Management
    setupGallery() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.querySelector('.lightbox-image');
        const lightboxClose = document.getElementById('lightbox-close');
        const lightboxPrev = document.querySelector('.lightbox-prev');
        const lightboxNext = document.querySelector('.lightbox-next');
        
        let currentImageIndex = 0;
        const images = Array.from(galleryItems).map(item => {
            const img = item.querySelector('.gallery-image');
            const content = item.querySelector('.gallery-content');
            return {
                src: this.generatePlaceholderImage(600, 400),
                alt: content ? content.querySelector('h3').textContent : 'Gallery Image'
            };
        });

        // Open lightbox
        galleryItems.forEach((item, index) => {
            const galleryBtn = item.querySelector('.gallery-btn');
            if (galleryBtn) {
                galleryBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.openLightbox(index, images, lightbox, lightboxImage);
                    currentImageIndex = index;
                });
            }
        });

        // Close lightbox
        if (lightboxClose) {
            lightboxClose.addEventListener('click', () => {
                this.closeLightbox(lightbox);
            });
        }

        // Close on backdrop click
        if (lightbox) {
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    this.closeLightbox(lightbox);
                }
            });
        }

        // Navigation
        if (lightboxPrev) {
            lightboxPrev.addEventListener('click', () => {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                this.updateLightboxImage(currentImageIndex, images, lightboxImage);
            });
        }

        if (lightboxNext) {
            lightboxNext.addEventListener('click', () => {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                this.updateLightboxImage(currentImageIndex, images, lightboxImage);
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (lightbox.classList.contains('active')) {
                switch (e.key) {
                    case 'Escape':
                        this.closeLightbox(lightbox);
                        break;
                    case 'ArrowLeft':
                        lightboxPrev.click();
                        break;
                    case 'ArrowRight':
                        lightboxNext.click();
                        break;
                }
            }
        });
    }

    openLightbox(index, images, lightbox, lightboxImage) {
        this.updateLightboxImage(index, images, lightboxImage);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox(lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'visible';
    }

    updateLightboxImage(index, images, lightboxImage) {
        const image = images[index];
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
    }

    // Contact Form Management
    setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(contactForm);
            });

            // Real-time validation
            const inputs = contactForm.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });

                input.addEventListener('input', () => {
                    this.clearFieldError(input);
                });
            });
        }
    }

    handleFormSubmission(form) {
        const submitBtn = form.querySelector('.form-submit');
        const inputs = form.querySelectorAll('input, textarea, select');
        let isValid = true;

        // Validate all fields
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            // Show loading state
            submitBtn.classList.add('loading');
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.classList.add('success');
                
                // Reset form after success
                setTimeout(() => {
                    form.reset();
                    submitBtn.classList.remove('success');
                    this.showNotification('Message sent successfully!', 'success');
                }, 2000);
            }, 2000);
        }
    }

    validateField(field) {
        const formGroup = field.closest('.form-group');
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error
        this.clearFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }

        if (!isValid) {
            formGroup.classList.add('error');
            field.style.borderBottomColor = 'var(--accent-color)';
            
            // Add error message if not exists
            if (!formGroup.querySelector('.error-message')) {
                const errorElement = document.createElement('span');
                errorElement.className = 'error-message';
                errorElement.textContent = errorMessage;
                errorElement.style.cssText = `
                    color: var(--accent-color);
                    font-size: 0.8rem;
                    position: absolute;
                    bottom: -20px;
                    left: 0;
                `;
                formGroup.style.position = 'relative';
                formGroup.appendChild(errorElement);
            }
        }

        return isValid;
    }

    clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        
        formGroup.classList.remove('error');
        field.style.borderBottomColor = 'var(--border-color)';
        
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    // Floating Action Buttons
    setupFloatingElements() {
        const reservationFab = document.getElementById('reservation-fab');
        const callFab = document.getElementById('call-fab');
        const viewMenuBtn = document.getElementById('view-menu-btn');
        const bookTableBtn = document.getElementById('book-table-btn');

        // Reservation FAB
        if (reservationFab) {
            reservationFab.addEventListener('click', () => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        // Call FAB
        if (callFab) {
            callFab.addEventListener('click', () => {
                window.location.href = 'tel:+15551234567';
            });
        }

        // Hero buttons
        if (viewMenuBtn) {
            viewMenuBtn.addEventListener('click', () => {
                const menuSection = document.getElementById('menu');
                if (menuSection) {
                    menuSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        if (bookTableBtn) {
            bookTableBtn.addEventListener('click', () => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        // Map interaction
        const mapPlaceholder = document.querySelector('.map-placeholder');
        if (mapPlaceholder) {
            mapPlaceholder.addEventListener('click', () => {
                // In a real implementation, this would open Google Maps
                this.showNotification('Map functionality would open here', 'info');
            });
        }
    }

    // Intersection Observer for animations
    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    this.animateElement(element);
                    observer.unobserve(element);
                }
            });
        }, options);

        // Observe elements for animation
        const elementsToAnimate = document.querySelectorAll(`
            .section-header,
            .about-text,
            .about-stats,
            .feature-item,
            .menu-item,
            .gallery-item,
            .contact-item,
            .contact-form-container
        `);

        elementsToAnimate.forEach(element => {
            element.classList.add('animate-hidden');
            observer.observe(element);
        });
    }

    animateElement(element) {
        element.classList.remove('animate-hidden');
        element.classList.add('animate-visible');

        // Add specific animations based on element type
        if (element.classList.contains('section-header')) {
            element.style.animationDelay = '0s';
        } else if (element.classList.contains('feature-item')) {
            const index = Array.from(element.parentNode.children).indexOf(element);
            element.style.animationDelay = `${index * 0.1}s`;
        } else if (element.classList.contains('menu-item')) {
            const index = Array.from(element.parentNode.children).indexOf(element);
            element.style.animationDelay = `${index * 0.1}s`;
        } else if (element.classList.contains('gallery-item')) {
            const index = Array.from(element.parentNode.children).indexOf(element);
            element.style.animationDelay = `${index * 0.1}s`;
        }
    }

    // Counter Animation
    setupCounters() {
        const counters = document.querySelectorAll('.stat-number');
        let countersAnimated = false;

        const animateCounters = () => {
            if (countersAnimated) return;
            
            counters.forEach(counter => {
                const target = parseInt(counter.dataset.target);
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        countersAnimated = true;
                    }
                    counter.textContent = Math.floor(current).toLocaleString();
                    
                    if (current < target) {
                        requestAnimationFrame(updateCounter);
                    }
                };

                updateCounter();
            });
        };

        // Trigger counter animation when about section is visible
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(animateCounters, 500);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(aboutSection);
        }
    }

    // Parallax Effects
    setupParallax() {
        const floatingElements = document.querySelectorAll('.floating-element');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            floatingElements.forEach((element, index) => {
                const speed = element.dataset.speed || 1;
                const yPos = scrolled * speed * 0.1;
                const rotation = scrolled * speed * 0.05;
                
                element.style.transform = `translate3d(0, ${yPos}px, 0) rotate(${rotation}deg)`;
            });
        });
    }

    // Utility Functions
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    handleResize() {
        // Handle responsive adjustments
        const navMenu = document.getElementById('nav-menu');
        const hamburger = document.getElementById('hamburger');
        
        if (window.innerWidth > 768) {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = 'visible';
            }
        }
    }

    generatePlaceholderImage(width, height) {
        // Generate a placeholder image URL
        return `https://via.placeholder.com/${width}x${height}/d4af37/ffffff?text=Gallery+Image`;
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-color);
            color: var(--text-light);
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            box-shadow: 0 4px 15px var(--shadow-medium);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the website
const restaurant = new RestaurantWebsite();

// Newsletter form submission
document.addEventListener('DOMContentLoaded', () => {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            if (email) {
                restaurant.showNotification('Thank you for subscribing to our newsletter!', 'success');
                newsletterForm.reset();
            }
        });
    }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RestaurantWebsite;
}
