/* ================================
   PERSONAL WEBSITE - INTERACTIVITY
   ================================ */

document.addEventListener('DOMContentLoaded', () => {
    // === DOM ELEMENTS ===
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const animatedElements = document.querySelectorAll('.fade-in-up');

    // === NAVIGATION TOGGLE (MOBILE) ===
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // === SCROLL EFFECTS ===
    window.addEventListener('scroll', () => {
        // Add shadow/background to nav on scroll
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveLink();
    });

    // === SMOOTH SCROLLING ===
    // Note: CSS scroll-behavior: smooth handles most cases, 
    // but this ensures precise offset for fixed header
    window.scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const navHeight = nav.offsetHeight;
            const targetPosition = section.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Update active state manually for immediate feedback
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.dataset.section === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    };

    // Override default anchor click to use offset-aware scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // === ACTIVE LINK UPDATER ===
    function updateActiveLink() {
        let currentString = '';
        const navHeight = nav.offsetHeight + 100; // Offset for better trigger point

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= (sectionTop - navHeight)) {
                currentString = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === currentString) {
                link.classList.add('active');
            }
        });
    }

    // === SCROLL ANIMATIONS (INTERSECTION OBSERVER) ===
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        // Pause animation initially
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
});

// === READ MORE TOGGLE ===
function toggleReadMore() {
    const dots = document.getElementById("dots-1");
    const moreText = document.getElementById("more-1");
    const btnText = document.getElementById("readMoreBtn");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Read more";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Read less";
        moreText.style.display = "block";
    }
}
