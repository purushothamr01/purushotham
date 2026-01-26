document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const targetPosition = target.offsetTop - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Navbar scroll effect
  let lastScroll = 0;
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    } else {
      navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  });

  // GSAP Animations
  if (typeof gsap !== 'undefined') {
    // Hero animations
    gsap.from('.hero-badge', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out'
    });

    gsap.from('.hero-title', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.2,
      ease: 'power2.out'
    });

    gsap.from('.hero-description', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      delay: 0.4,
      ease: 'power2.out'
    });

    gsap.from('.hero-actions', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      delay: 0.6,
      ease: 'power2.out'
    });

    gsap.from('.hero-stats', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      delay: 0.8,
      ease: 'power2.out'
    });

    // Section animations on scroll
    gsap.utils.toArray('.section-header').forEach(header => {
      gsap.from(header, {
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
          once: true
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out'
      });
    });

    // Expertise cards
    gsap.utils.toArray('.expertise-card').forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          once: true
        },
        opacity: 0,
        y: 40,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power2.out'
      });
    });

    // Work cards
    gsap.utils.toArray('.work-card').forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          once: true
        },
        opacity: 0,
        y: 40,
        duration: 0.6,
        delay: index * 0.15,
        ease: 'power2.out'
      });
    });

    // Contact links
    gsap.utils.toArray('.contact-link').forEach((link, index) => {
      gsap.from(link, {
        scrollTrigger: {
          trigger: link,
          start: 'top 85%',
          once: true
        },
        opacity: 0,
        x: -30,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power2.out'
      });
    });

    // Visual card
    gsap.from('.visual-card', {
      scrollTrigger: {
        trigger: '.visual-card',
        start: 'top 85%',
        once: true
      },
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      ease: 'power2.out'
    });

    // About content
    gsap.from('.about-content', {
      scrollTrigger: {
        trigger: '.about-content',
        start: 'top 80%',
        once: true
      },
      opacity: 0,
      x: -30,
      duration: 0.8,
      ease: 'power2.out'
    });

    gsap.from('.about-image', {
      scrollTrigger: {
        trigger: '.about-image',
        start: 'top 80%',
        once: true
      },
      opacity: 0,
      x: 30,
      duration: 0.8,
      ease: 'power2.out'
    });
  }

  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }

  // Add hover effect to cards
  const cards = document.querySelectorAll('.expertise-card, .work-card, .contact-link');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });

  // Typing effect for code in contact section
  const codeLines = document.querySelectorAll('.code-line');
  if (codeLines.length > 0) {
    codeLines.forEach((line, index) => {
      line.style.opacity = '0';
      setTimeout(() => {
        gsap.to(line, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out'
        });
      }, index * 200 + 1000);
    });
  }

  // Parallax effect for hero section
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
      hero.style.transform = `translateY(${scrolled * 0.3}px)`;
      hero.style.opacity = 1 - (scrolled / 600);
    }
  });

  // Add active state to navigation based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });

  console.log('Portfolio loaded successfully! 🚀');
});
