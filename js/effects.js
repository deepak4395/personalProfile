// ===========================
// Animated Stat Counters
// ===========================

class StatCounter {
    constructor(element) {
        this.element = element;
        this.target = parseInt(element.getAttribute('data-target'));
        this.current = 0;
        this.duration = 2000; // 2 seconds
        this.hasAnimated = false;
        
        this.setupObserver();
    }
    
    setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.animate();
                    this.hasAnimated = true;
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(this.element);
    }
    
    animate() {
        const startTime = performance.now();
        const startValue = this.current;
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / this.duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            
            this.current = Math.floor(startValue + (this.target - startValue) * easeOutQuart);
            this.element.textContent = this.current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                this.element.textContent = this.target;
                this.addDigitalFlicker();
            }
        };
        
        requestAnimationFrame(updateCounter);
    }
    
    addDigitalFlicker() {
        // Add occasional digital flicker effect
        setInterval(() => {
            if (Math.random() > 0.95) {
                const originalValue = this.element.textContent;
                this.element.textContent = Math.floor(Math.random() * (this.target + 5));
                
                setTimeout(() => {
                    this.element.textContent = originalValue;
                }, 50);
            }
        }, 3000);
    }
}

// ===========================
// RGB Glitch Effect on Hover
// ===========================

class RGBGlitchEffect {
    constructor() {
        this.addHoverEffects();
    }
    
    addHoverEffects() {
        // Add RGB split effect to project cards
        const projectCards = document.querySelectorAll('.project-card-front h3');
        projectCards.forEach(card => {
            card.classList.add('glitch-text');
            card.setAttribute('data-text', card.textContent);
        });
        
        // Add glitch to section titles that don't have it
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach(title => {
            if (!title.classList.contains('glitch-text')) {
                title.classList.add('glitch-text');
                title.setAttribute('data-text', title.textContent);
            }
        });
        
        // Add hologram effect to navigation links
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.animation = 'hologram 0.3s ease-in-out';
            });
            
            link.addEventListener('animationend', function() {
                this.style.animation = '';
            });
        });
    }
}

// ===========================
// Scan Line Effect
// ===========================

class ScanLineEffect {
    constructor() {
        this.createScanLine();
    }
    
    createScanLine() {
        const scanLine = document.createElement('div');
        scanLine.className = 'scan-line';
        document.body.appendChild(scanLine);
        
        // Add CSS
        if (!document.getElementById('scan-line-styles')) {
            const style = document.createElement('style');
            style.id = 'scan-line-styles';
            style.textContent = `
                .scan-line {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background: linear-gradient(to right, 
                        transparent, 
                        rgba(239, 68, 68, 0.8), 
                        transparent);
                    box-shadow: 0 0 10px rgba(239, 68, 68, 0.8);
                    pointer-events: none;
                    z-index: 9999;
                    animation: scanLineMove 4s linear infinite;
                    opacity: 0.3;
                }
                
                @keyframes scanLineMove {
                    0% {
                        transform: translateY(0);
                    }
                    100% {
                        transform: translateY(100vh);
                    }
                }
                
                /* Disable scan line on mobile for performance */
                @media (max-width: 768px) {
                    .scan-line {
                        display: none;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// ===========================
// Initialize Effects
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize stat counters
    document.querySelectorAll('.stat-number').forEach(stat => {
        new StatCounter(stat);
    });
    
    // Initialize RGB glitch effects
    new RGBGlitchEffect();
    
    // Initialize scan line (CRT monitor effect)
    new ScanLineEffect();
});
