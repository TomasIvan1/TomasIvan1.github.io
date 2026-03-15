/**
 * App.js: Main Logic & Effects
 */

document.addEventListener('DOMContentLoaded', () => {
    initCanvasParticles();
    initScrollRevels();
    initTypewriter();
    initLanguageToggle();
});

// Translation Dictionary
const translations = {
    "sk": {
        "nav_about": "O mne",
        "nav_edu": "Vzdelanie",
        "nav_proj": "Projekty",
        "nav_skills": "Skúsenosti",
        "nav_brand": "Sleduj ma",
        "hero_subtitle": "Tomáš Ivan — Študent & Vývojár",
        "hero_highlight": "inovatívne riešenia.",
        "about_title": "Technológia ako organický ekosystém.",
        "about_text": "Mám 18 rokov a som študentom informačných a sieťových technológií na SPŠE v Prešove. Verím, že technológie by nemali byť len chladným kódom, ale živými systémami. Fascinuje ma vývoj softvéru, voľný tok dát a zabezpečovanie stability a bezpečnosti digitálnych prepojení.",
        "edu_title": "Vzdelanie",
        "edu_date_1": "2023 — Súčasnosť",
        "edu_title_1": "Informačné a sieťové technológie",
        "edu_school_1": "Stredná priemyselná škola elektrotechnická, Prešov",
        "edu_desc_1": "Zameranie na tvorbu webových aplikácií, vývoj softvéru a sieťové technológie. Aktívna participácia na školských súťažiach.",
        "edu_date_2": "2014 — 2023",
        "edu_title_2": "Základné vzdelanie",
        "edu_school_2": "Základná škola (Doplniť názov)",
        "edu_desc_2": "Budovanie základov v matematike a logickom myslení. Prvé kontakty s programovaním a algoritmizáciou.",
        "proj_title": "Vybrané Projekty",
        "proj_name_1": "Návrh Sieťovej Topológie",
        "proj_desc_1": "Simulácia a architektonický návrh bezpečnej podnikovej siete. Detailné plánovanie smerovania a prepínania s ohľadom na vysokú dostupnosť.",
        "proj_name_2": "Algoritmické Modely",
        "proj_desc_2": "Skripty na automatizáciu a optimalizáciu dátových tokov. Plynulá integrácia s existujúcimi systémami.",
        "skills_title": "Skúsenosti & Zručnosti",
        "skill_name_1": "Vývoj Softvéru",
        "skill_name_2": "Cloudové Technológie",
        "skill_desc_2": "Architektúra, Manažment",
        "skill_name_3": "Nasadzovanie Softvéru",
        "skill_desc_3": "CI/CD, Integrácia",
        "footer_claim": "&copy; 2026 Tomáš Ivan. Všetky práva vyhradené.",
        "lang_toggle": "EN",
        "words": ["Vyvíjam", "Budujem", "Nasádzam", "Dizajnujem"]
    },
    "en": {
        "nav_about": "About",
        "nav_edu": "Education",
        "nav_proj": "Projects",
        "nav_skills": "Experience",
        "nav_brand": "Follow me",
        "hero_subtitle": "Tomáš Ivan — Student & Developer",
        "hero_highlight": "innovative solutions.",
        "about_title": "Technology as an organic ecosystem.",
        "about_text": "I am 18 years old and a student of Information and Network Technologies at SPŠE in Prešov. I believe technology shouldn't just be cold code, but living systems. I am fascinated by software development, free data flow, and ensuring the stability and security of digital connections.",
        "edu_title": "Education",
        "edu_date_1": "2023 — Present",
        "edu_title_1": "Information & Network Technologies",
        "edu_school_1": "Secondary Industrial School of Electrical Engineering, Prešov",
        "edu_desc_1": "Focus on web application development and network technologies. Active participation in school tech competitions.",
        "edu_date_2": "2014 — 2023",
        "edu_title_2": "Primary Education",
        "edu_school_2": "Primary School (Add name)",
        "edu_desc_2": "Building foundations in mathematics and logical thinking. Initial contacts with programming and basic algorithms.",
        "proj_title": "Selected Projects",
        "proj_name_1": "Network Topology Design",
        "proj_desc_1": "Simulation and architectural design of a secure enterprise network. Detailed routing and switching planning with high availability in mind.",
        "proj_name_2": "Algorithmic Models",
        "proj_desc_2": "Scripts for automation and data flow optimization. Seamless integration with existing systems.",
        "skills_title": "Experience & Skills",
        "skill_name_1": "Software Dev",
        "skill_name_2": "Cloud Technologies",
        "skill_desc_2": "Architecture, Management",
        "skill_name_3": "Software Deployment",
        "skill_desc_3": "CI/CD, Intgeration",
        "footer_claim": "&copy; 2026 Tomáš Ivan. All rights reserved.",
        "lang_toggle": "SK",
        "words": ["Developing", "Building", "Deploying", "Designing"]
    }
};

let currentLang = 'sk';
window.typewriterWords = translations[currentLang].words;

function initLanguageToggle() {
    const desktopToggle = document.getElementById('langToggle');
    const mobileToggle = document.getElementById('langToggleMobile');
    
    function toggleLanguage(e) {
        if (e) e.preventDefault();
        currentLang = currentLang === 'sk' ? 'en' : 'sk';
        window.typewriterWords = translations[currentLang].words;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                el.innerHTML = translations[currentLang][key];
            }
        });
    }

    if (desktopToggle) desktopToggle.addEventListener('click', toggleLanguage);
    if (mobileToggle) mobileToggle.addEventListener('click', toggleLanguage);
}

function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;

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
        let words = window.typewriterWords || ["Vyvíjam", "Budujem", "Nasádzam", "Dizajnujem"];
        if (wordIndex >= words.length) wordIndex = 0;
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
        let words = window.typewriterWords || ["Vyvíjam", "Budujem", "Nasádzam", "Dizajnujem"];
        if (wordIndex >= words.length) wordIndex = 0;
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
