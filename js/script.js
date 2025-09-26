// MLTelect Samoa - Interactive JavaScript

// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const faqQuestions = document.querySelectorAll('.faq-question');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Contact Form Handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const formDataObj = {};

        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });

        // Simulate form submission (in real implementation, this would be an API call)
        console.log('Form submitted:', formDataObj);

        // Show success message
        showFormMessage('Thank you for your message! We will get back to you soon.', 'success');

        // Reset form
        contactForm.reset();
    });
}

// Show form message
function showFormMessage(message, type) {
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// Project Filtering
if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// FAQ Accordion
if (faqQuestions.length > 0) {
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close all FAQ items
            faqQuestions.forEach(q => {
                q.parentElement.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }

    lastScroll = currentScroll;
});

// Active navigation highlighting
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Animate elements on scroll
const animateElements = document.querySelectorAll('.service-card, .feature, .value-card, .team-member, .project-card, .testimonial');

function animateOnScroll() {
    const triggerBottom = window.innerHeight * 0.8;

    animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < triggerBottom) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animation states
animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
        }
    };

    updateCounter();
}

// Intersection Observer for counter animation
const observerOptions = {
    threshold: 0.7,
    rootMargin: '0px 0px -100px 0px'
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.textContent);
            animateCounter(counter, target);
            observer.unobserve(counter);
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observe all stat elements
document.querySelectorAll('.stat-item h3, .featured-stats .stat strong').forEach(stat => {
    if (stat.textContent.match(/\d+/)) {
        observer.observe(stat);
    }
});

// Phone number click tracking
document.querySelectorAll('a[href^="tel:"]').forEach(phoneLink => {
    phoneLink.addEventListener('click', () => {
        console.log('Phone number clicked:', phoneLink.getAttribute('href'));
        // Add analytics tracking here if needed
    });
});

// Email link click tracking
document.querySelectorAll('a[href^="mailto:"]').forEach(emailLink => {
    emailLink.addEventListener('click', () => {
        console.log('Email link clicked:', emailLink.getAttribute('href'));
        // Add analytics tracking here if needed
    });
});

// Service type selection in contact form
const serviceTypeSelect = document.getElementById('serviceType');
if (serviceTypeSelect) {
    serviceTypeSelect.addEventListener('change', (e) => {
        const selectedService = e.target.value;
        console.log('Service type selected:', selectedService);

        // You could add dynamic form fields based on service type
        // For example, show additional fields for emergency services
    });
}

// Form validation
function validateForm(formData) {
    const errors = [];

    if (!formData.firstName || formData.firstName.trim() === '') {
        errors.push('First name is required');
    }

    if (!formData.lastName || formData.lastName.trim() === '') {
        errors.push('Last name is required');
    }

    if (!formData.email || formData.email.trim() === '') {
        errors.push('Email address is required');
    } else if (!isValidEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }

    if (!formData.message || formData.message.trim() === '') {
        errors.push('Message is required');
    }

    return errors;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Dynamic year in footer
document.addEventListener('DOMContentLoaded', () => {
    const yearElements = document.querySelectorAll('.footer-bottom');
    const currentYear = new Date().getFullYear();

    yearElements.forEach(element => {
        element.innerHTML = element.innerHTML.replace(/\d{4}/, currentYear);
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Error handling for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        img.addEventListener('error', function() {
            console.error('Failed to load image:', this.src);
            // You could add a fallback image here
        });
    });
});

// Print functionality
function printPage() {
    window.print();
}

// Add print button if needed
// const printBtn = document.createElement('button');
// printBtn.textContent = 'Print';
// printBtn.addEventListener('click', printPage);
// document.body.appendChild(printBtn);

// Keyboard navigation improvements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// Accessibility improvements
navLinks.forEach(link => {
    link.addEventListener('focus', () => {
        link.style.outline = '2px solid var(--primary-color)';
        link.style.outlineOffset = '2px';
    });

    link.addEventListener('blur', () => {
        link.style.outline = 'none';
    });
});

// Performance optimization: debounce scroll events
function debounce(func, wait) {
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

// Apply debounce to scroll events
const debouncedHighlightNav = debounce(highlightNavigation, 10);
const debouncedAnimateOnScroll = debounce(animateOnScroll, 10);

window.addEventListener('scroll', debouncedHighlightNav);
window.addEventListener('scroll', debouncedAnimateOnScroll);

// Console welcome message
console.log('%c🔌 MLTelect Samoa - Professional Electrical Services', 'color: #1e40af; font-size: 16px; font-weight: bold;');
console.log('%cWebsite loaded successfully!', 'color: #10b981; font-size: 12px;');