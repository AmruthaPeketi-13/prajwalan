// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const robotWelcome = document.getElementById('robotWelcome');
const contactForm = document.getElementById('contactForm');
const modal = document.getElementById('responseModal');
const closeModal = document.querySelector('.close');

// Navigation functionality
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Robot welcome animation
setTimeout(() => {
    if (robotWelcome) {
        robotWelcome.style.animation = 'slideInLeft 0.8s ease-out reverse';
        setTimeout(() => {
            robotWelcome.style.display = 'none';
        }, 800);
    }
}, 5000);


// Sliding window functionality
let currentSlides = {
    winnersSlider: 0,
    entertainmentSlider: 0
};

function changeSlide(sliderId, direction) {
    const slider = document.getElementById(sliderId);
    const slides = slider.querySelectorAll('.slide');
    const indicators = slider.querySelectorAll('.indicator');
    
    // Remove active class from current slide and indicator
    slides[currentSlides[sliderId]].classList.remove('active');
    indicators[currentSlides[sliderId]].classList.remove('active');
    
    // Calculate new slide index
    currentSlides[sliderId] += direction;
    
    if (currentSlides[sliderId] >= slides.length) {
        currentSlides[sliderId] = 0;
    } else if (currentSlides[sliderId] < 0) {
        currentSlides[sliderId] = slides.length - 1;
    }
    
    // Add active class to new slide and indicator
    slides[currentSlides[sliderId]].classList.add('active');
    indicators[currentSlides[sliderId]].classList.add('active');
}

function goToSlide(sliderId, slideIndex) {
    const slider = document.getElementById(sliderId);
    const slides = slider.querySelectorAll('.slide');
    const indicators = slider.querySelectorAll('.indicator');
    
    // Remove active class from current slide and indicator
    slides[currentSlides[sliderId]].classList.remove('active');
    indicators[currentSlides[sliderId]].classList.remove('active');
    
    // Set new slide index
    currentSlides[sliderId] = slideIndex;
    
    // Add active class to new slide and indicator
    slides[currentSlides[sliderId]].classList.add('active');
    indicators[currentSlides[sliderId]].classList.add('active');
}

// Auto-slide functionality
function autoSlide() {
    changeSlide('winnersSlider', 1);
    changeSlide('entertainmentSlider', 1);
}

// Start auto-sliding
setInterval(autoSlide, 4000);

// Contact form handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const comment = document.getElementById('comment').value;
    
    // Simulate form submission
    if (name && email && comment) {
        // Generate sweet response message
        const responses = [
            `Dear ${name}, thank you for reaching out! Your enthusiasm for Prajwalan fills our hearts with joy. We'll get back to you soon! 💙`,
            `Hello ${name}! Your message brightened our day! We're thrilled about your interest in Prajwalan. Expect a response from our team shortly! 🌟`,
            `Hi ${name}! Thank you for your wonderful message! Your passion for technology and innovation is exactly what Prajwalan celebrates. We'll be in touch soon! 🚀`,
            `Dear ${name}, your message has been received with much appreciation! We're excited to connect with someone as enthusiastic as you. Stay tuned! ✨`
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        document.getElementById('responseMessage').textContent = randomResponse;
        
        // Show modal
        modal.style.display = 'block';
        
        // Reset form
        contactForm.reset();
    }
});

// Modal functionality
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.history-card, .timeline-item, .stat-item, .info-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Typing effect for the main title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const titleElement = document.querySelector('.prajwalan-title');
    if (titleElement) {
        // Set the title to match the image style
        titleElement.textContent = 'prajwalan';
        titleElement.style.fontFamily = "'Samarkan', serif";
    }
    
    // Update logo sources when images are provided
    // For now using placeholder images - replace with actual logo URLs when provided
    const collegeLogo = document.getElementById('collegeLogo');
    const clubLogo = document.getElementById('clubLogo');
    
    // These will be replaced with actual logo URLs
    // collegeLogo.src = 'path-to-college-logo.png';
    // clubLogo.src = 'path-to-club-logo.png';
});

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.history-card, .info-card, .stat-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Smooth reveal animation for sections
const revealElements = document.querySelectorAll('.section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Add some interactive particles
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: #3b82f6;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        opacity: 0.7;
    `;
    
    document.body.appendChild(particle);
    
    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight + 10;
    const endY = -10;
    const duration = 3000 + Math.random() * 2000;
    
    particle.style.left = startX + 'px';
    particle.style.top = startY + 'px';
    
    particle.animate([
        { transform: 'translateY(0px)', opacity: 0 },
        { transform: 'translateY(-20px)', opacity: 0.7 },
        { transform: `translateY(${endY - startY}px)`, opacity: 0 }
    ], {
        duration: duration,
        easing: 'linear'
    }).onfinish = () => {
        particle.remove();
    };
}
// 💡 VIDEO MODAL LOGIC
function openVideoModal() {
  document.getElementById('videoModal').style.display = 'block';
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  modal.style.display = 'none';
  const video = modal.querySelector("video");
  video.pause();
  video.currentTime = 0;
}

// Optional: Close on outside click
window.onclick = function(event) {
  const modal = document.getElementById('videoModal');
  if (event.target === modal) {
    closeVideoModal();
  }
};


// Create particles periodically
setInterval(createParticle, 500);

console.log('🚀 Prajwalan website loaded successfully!');
console.log('💙 Built with love by ACE Club, SRKR Engineering College');