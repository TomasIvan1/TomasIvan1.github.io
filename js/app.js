/**
 * App.js: Main Logic & Effects
 */

document.addEventListener('DOMContentLoaded', () => {
    initCanvasParticles();
    initScrollRevels();
    initTypewriter();
});

function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;

    const words = ["Vyvíjam", "Budujem", "Nasádzam", "Dizajnujem"];
    let wordIndex = 0;
    /* Text Effect Delay */
    setTimeout(deletingEffect, 2500);

    // Navbar scroll effect
    const nav = document.querySelector('.site-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    function typingEffect() {
        let word = words[wordIndex].split("");
        const loopTyping = function () {
            if (word.length > 0) {
                typewriterElement.innerHTML += word.shift();
                timer = setTimeout(loopTyping, 120);
            } else {
                setTimeout(deletingEffect, 2500); // Wait after word is typed
            }
        };
        loopTyping();
    }

    function deletingEffect() {
        let word = words[wordIndex].split("");
        const loopDeleting = function () {
            if (word.length > 0) {
                word.pop();
                typewriterElement.innerHTML = word.join("");
                timer = setTimeout(loopDeleting, 60);
            } else {
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(typingEffect, 400); // Pause before typing next word
            }
        };
        loopDeleting();
    }
}

function initCanvasParticles() {
    const canvas = document.getElementById('flowCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particlesArray = [];
    const numberOfParticles = 80;

    // Colors matching Muted Teal and Light Coral for chromatic shift
    const colors = ['#84A59D', '#F28482', '#F6BD60', '#F5CAC3'];

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 0.5; // Very tiny

            // Slow drifing velocity
            this.velocityX = (Math.random() * 0.4) - 0.2;
            this.velocityY = (Math.random() * 0.4) - 0.2;

            this.color = colors[Math.floor(Math.random() * colors.length)];

            // For breathing effect
            this.alpha = Math.random() * 0.5 + 0.1;
            this.alphaDirection = Math.random() > 0.5 ? 1 : -1;
        }

        update() {
            this.x += this.velocityX;
            this.y += this.velocityY;

            // Wrap around edges
            if (this.x > width) this.x = 0;
            if (this.x < 0) this.x = width;
            if (this.y > height) this.y = 0;
            if (this.y < 0) this.y = height;

            // Breathing alpha logic
            this.alpha += 0.002 * this.alphaDirection;
            if (this.alpha <= 0.1) this.alphaDirection = 1;
            if (this.alpha >= 0.7) this.alphaDirection = -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.alpha;
            ctx.fill();
        }
    }

    // Init array
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, width, height); // clear instead of fade for crisp particles

        // Connect very close particles faintly to look like a botanical net
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let dx = particlesArray[a].x - particlesArray[b].x;
                let dy = particlesArray[a].y - particlesArray[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = '#F7EDE2'; // linen base color
                    ctx.globalAlpha = 0.05 * (1 - distance / 100);
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }

        ctx.globalAlpha = 1; // reset before drawing particles

        particlesArray.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

function initScrollRevels() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optionally stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    reveals.forEach((reveal, index) => {
        observer.observe(reveal);
    });
}

// Mobile Menu Logic
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenuBtn = document.getElementById('close-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.add('active'); // Changed to add since we have dedicated close
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
    });

    const closeMenu = () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    };

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', closeMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}
