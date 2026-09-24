/**
 * Indiana Peças - Portal de Devoluções & Garantias
 * Interactive Scripts, Parallax & Scroll Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Progress Bar
    const progressBar = document.getElementById('scrollProgressBar');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        if (progressBar) {
            progressBar.style.width = `${scrollPercent}%`;
        }
    }, { passive: true });

    // 2. Parallax Scroll Effect for Orbs & Background
    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');
    const orb3 = document.querySelector('.orb-3');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (orb1) orb1.style.transform = `translateY(${scrolled * 0.15}px)`;
        if (orb2) orb2.style.transform = `translateY(${scrolled * -0.12}px)`;
        if (orb3) orb3.style.transform = `translateY(${scrolled * 0.08}px)`;
    }, { passive: true });

    // 3. Scroll Reveal via IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal-init, .reveal-scale-init');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback if IntersectionObserver is not available
        revealElements.forEach(el => el.classList.add('reveal-visible'));
    }

    // 4. 3D Tilt Card & Spotlight Glow Effect on MouseMove
    const tiltCards = document.querySelectorAll('.hero-visual-card, .step-card, .warranty-card');

    tiltCards.forEach(card => {
        card.classList.add('spotlight-card');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Set spotlight position
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // Apply 3D Tilt only for hero-visual-card
            if (card.classList.contains('hero-visual-card')) {
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -7;
                const rotateY = ((x - centerX) / centerX) * 7;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            if (card.classList.contains('hero-visual-card')) {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            }
        });
    });

    // 5. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-open');
            const isExpanded = navLinks.classList.contains('mobile-open');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });

        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-open');
                menuToggle.setAttribute('aria-expanded', false);
            });
        });
    }

    // 6. Fiscal Guide Tabs
    const tabBtns = document.querySelectorAll('.fiscal-tab-btn');
    const tabPanels = document.querySelectorAll('.fiscal-content-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // 7. FAQ Accordions
    const faqHeaders = document.querySelectorAll('.faq-header');

    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');

            document.querySelectorAll('.faq-item').forEach(other => {
                if (other !== item) {
                    other.classList.remove('active');
                    const otherBtn = other.querySelector('.faq-header');
                    if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                }
            });

            item.classList.toggle('active', !isActive);
            header.setAttribute('aria-expanded', !isActive);
        });
    });

    // 8. Copy to Clipboard with Toast
    const copyBtns = document.querySelectorAll('.copy-btn');
    const toast = document.getElementById('toastNotice');
    let toastTimeout;

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }

    copyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const textToCopy = btn.getAttribute('data-copy');
            if (!textToCopy) return;

            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast(`Copiado: "${textToCopy}"`);
                const originalText = btn.textContent;
                btn.textContent = 'Copiado!';
                setTimeout(() => {
                    btn.textContent = originalText;
                }, 1500);
            }).catch(() => {
                showToast('Erro ao copiar');
            });
        });
    });

    // 9. Scroll to Top
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn?.classList.add('visible');
        } else {
            scrollTopBtn?.classList.remove('visible');
        }
    }, { passive: true });

    scrollTopBtn?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 10. Smooth Scroll Offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = document.querySelector('.navbar')?.offsetHeight || 84;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - (navHeight + 20);

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 11. Iframe Refresh Helper
    const refreshIframeBtn = document.getElementById('refreshIframe');
    const formIframe = document.getElementById('formIframe');

    if (refreshIframeBtn && formIframe) {
        refreshIframeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentSrc = formIframe.src;
            formIframe.src = '';
            setTimeout(() => {
                formIframe.src = currentSrc;
                showToast('Formulário recarregado.');
            }, 100);
        });
    }
});
