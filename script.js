// ============================================
// iPortfolio Script — Full Featured
// ============================================
document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // PAGE PRELOADER
  // ============================================
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('hidden'), 400);
    });
    // Fallback: hide after 3 seconds max
    setTimeout(() => preloader.classList.add('hidden'), 3000);
  }

  // ============================================
  // TYPED TEXT — Sidebar
  // ============================================
  const typedEl = document.getElementById('typedText');
  if (typedEl) {
    const phrases = ['Security Researcher', 'Bug Bounty Hunter', 'Founder of Bloomeor'];
    let phraseIdx = 0, charIdx = 0, isDeleting = false;

    function typeLoop() {
      const current = phrases[phraseIdx];
      if (isDeleting) {
        typedEl.textContent = current.substring(0, charIdx--);
        if (charIdx < 0) {
          isDeleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          setTimeout(typeLoop, 400);
          return;
        }
        setTimeout(typeLoop, 40);
      } else {
        typedEl.textContent = current.substring(0, charIdx++);
        if (charIdx > current.length) {
          isDeleting = true;
          setTimeout(typeLoop, 2000);
          return;
        }
        setTimeout(typeLoop, 80);
      }
    }
    setTimeout(typeLoop, 500);
  }

  // ============================================
  // TYPED TEXT — Hero
  // ============================================
  const heroTypedEl = document.getElementById('heroTyped');
  if (heroTypedEl) {
    const heroPhrases = ['Security Researcher', 'Bug Bounty Hunter', 'Pentest Enthusiast'];
    let hIdx = 0, hChar = 0, hDel = false;

    function heroTypeLoop() {
      const current = heroPhrases[hIdx];
      if (hDel) {
        heroTypedEl.textContent = current.substring(0, hChar--);
        if (hChar < 0) {
          hDel = false;
          hIdx = (hIdx + 1) % heroPhrases.length;
          setTimeout(heroTypeLoop, 400);
          return;
        }
        setTimeout(heroTypeLoop, 40);
      } else {
        heroTypedEl.textContent = current.substring(0, hChar++);
        if (hChar > current.length) {
          hDel = true;
          setTimeout(heroTypeLoop, 2000);
          return;
        }
        setTimeout(heroTypeLoop, 80);
      }
    }
    setTimeout(heroTypeLoop, 1000);
  }

  // ============================================
  // MOBILE SIDEBAR TOGGLE
  // ============================================
  const sidebar = document.getElementById('sidebar');
  const mobileToggle = document.getElementById('mobileNavToggle');

  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
      mobileToggle.classList.toggle('active');
    });

    // Close sidebar when a link is clicked on mobile
    sidebar.querySelectorAll('.sidebar-nav a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
          sidebar.classList.remove('active');
          mobileToggle.classList.remove('active');
        }
      });
    });
  }

  // ============================================
  // ACTIVE NAV HIGHLIGHTING
  // ============================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.sidebar-nav a');

  function updateActiveNav() {
    const scrollY = window.pageYOffset + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  // ============================================
  // SMOOTH SCROLL
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ============================================
  // SCROLL TO TOP BUTTON
  // ============================================
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.pageYOffset > 400);
    });
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================
  // SCROLL PROGRESS BAR
  // ============================================
  const scrollProgress = document.getElementById('scrollProgress');
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      scrollProgress.style.width = progress + '%';
    });
  }

  // ============================================
  // DARK MODE TOGGLE
  // ============================================
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  // Restore saved theme
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeIcon) themeIcon.className = 'bi bi-sun-fill';
    if (themeToggle) themeToggle.querySelector('span').textContent = 'Light Mode';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      themeIcon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
      themeToggle.querySelector('span').textContent = isDark ? 'Light Mode' : 'Dark Mode';
    });
  }

  // ============================================
  // SKILL BAR ANIMATION
  // ============================================
  const skillBars = document.querySelectorAll('.skill-bar-fill[data-width]');
  const barObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.dataset.width;
        entry.target.style.width = width + '%';
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => barObserver.observe(bar));

  // ============================================
  // COUNTER ANIMATION
  // ============================================
  const counters = document.querySelectorAll('.hero-stat-number[data-count]');
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        let current = 0;
        const step = target / (1500 / 16);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current) + '+';
        }, 16);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  // ============================================
  // PARTICLE BACKGROUND — Hero
  // ============================================
  const canvas = document.getElementById('particles-bg');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const hero = canvas.closest('.hero-section');
    let particles = [];

    function resizeCanvas() {
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    }
    resizeCanvas();

    class Particle {
      constructor() {
        this.reset();
        this.color = Math.random() > 0.6 ? '20, 157, 221' : '0, 255, 65';
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.3 + 0.1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.fill();
      }
    }

    function initParticles() {
      const count = Math.min(60, Math.floor((canvas.width * canvas.height) / 18000));
      particles = [];
      for (let i = 0; i < count; i++) particles.push(new Particle());
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(20, 157, 221, ${(1 - dist / 120) * 0.1})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      drawConnections();
      requestAnimationFrame(animate);
    }

    initParticles();
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });
  }

  // ============================================
  // INTERSECTION OBSERVER — Staggered Card Reveals
  // ============================================
  const revealCards = document.querySelectorAll('.skill-card, .tool-card, .pub-card, .contact-info-card');
  revealCards.forEach(card => card.classList.add('reveal-card'));

  const cardObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger animation delay based on sibling position
        const parent = entry.target.parentElement;
        const siblings = Array.from(parent.children);
        const index = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 0.1}s`;
        entry.target.classList.add('revealed');
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealCards.forEach(el => cardObserver.observe(el));

  // Section title animations
  const sectionTitles = document.querySelectorAll('.section-title');
  const titleObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        titleObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  sectionTitles.forEach(el => titleObserver.observe(el));

  // Section fade-in
  const fadeEls = document.querySelectorAll('.section');
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.05 });

  fadeEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    fadeObserver.observe(el);
  });

  // ============================================
  // CUSTOM CURSOR — Sparkle Trail
  // ============================================
  const cursorDot = document.getElementById('cursorDot');

  if (cursorDot && window.innerWidth > 768 && window.matchMedia('(hover: hover)').matches) {
    let mouseX = 0, mouseY = 0;
    let trailCount = 0;
    const trailColors = ['#2563eb', '#7c3aed', '#06b6d4', '#10b981'];

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';

      // Spawn a trail particle every 3rd move event
      trailCount++;
      if (trailCount % 3 === 0) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        const size = Math.random() * 6 + 3;
        const color = trailColors[Math.floor(Math.random() * trailColors.length)];
        trail.style.cssText = `
          left: ${mouseX}px;
          top: ${mouseY}px;
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          box-shadow: 0 0 ${size * 2}px ${color};
        `;
        document.body.appendChild(trail);
        setTimeout(() => trail.remove(), 600);
      }
    });

    // Change dot on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, input, .skill-card, .tool-card, .pub-card, .contact-info-card');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => cursorDot.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursorDot.classList.remove('hovering'));
    });

    // Hide default cursor
    document.body.style.cursor = 'none';
    hoverTargets.forEach(el => el.style.cursor = 'none');
  }

  // ============================================
  // INTERACTIVE TERMINAL
  // ============================================
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');
  const terminalBody = document.getElementById('terminalBody');

  if (terminalInput && terminalOutput && terminalBody) {
    function addLine(text, className = '') {
      const line = document.createElement('div');
      line.classList.add('term-line');
      if (className) line.classList.add(className);
      line.textContent = text;
      terminalOutput.appendChild(line);
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    // Welcome message
    addLine('Welcome to Purushotham\'s Terminal!', 'accent');
    addLine('Type "help" for available commands.', 'dim');
    addLine('', 'dim');

    const commands = {
      help: () => {
        addLine('Available commands:', 'accent');
        addLine('  whoami     - About me', 'response');
        addLine('  skills     - My technical skills', 'response');
        addLine('  tools      - Open source tools', 'response');
        addLine('  projects   - Research & articles', 'response');
        addLine('  contact    - How to reach me', 'response');
        addLine('  socials    - Social media links', 'response');
        addLine('  clear      - Clear terminal', 'response');
        addLine('  ──────── Easter Eggs ────────', 'dim');
        addLine('  matrix     - Enter the Matrix', 'purple');
        addLine('  hack       - Hack the system', 'purple');
        addLine('  neofetch   - System info', 'purple');
        addLine('  date       - Current date/time', 'purple');
        addLine('  uptime     - Session uptime', 'purple');
      },
      whoami: () => {
        addLine('Purushotham R', 'success');
        addLine('Security Researcher | Bug Bounty Hunter', 'response');
        addLine('Founder of Bloomeor', 'accent');
        addLine('B.E in Electronics & Communication Engineering', 'response');
      },
      skills: () => {
        addLine('Technical Skills:', 'accent');
        addLine('  [+] Web Application Security', 'success');
        addLine('  [+] Reconnaissance & OSINT', 'success');
        addLine('  [+] Automation & Scripting', 'success');
        addLine('  [+] Cloud & Infrastructure', 'success');
        addLine('  Tools: Burp Suite, Nuclei, SQLMap, Subfinder', 'response');
      },
      tools: () => {
        addLine('Open Source Tools:', 'accent');
        addLine('  🔎 ReconKit — Recon automation framework', 'success');
        addLine('     github.com/purushothamr01/ReconKit', 'response');
        addLine('  ⚡ JS Explorer — JavaScript analysis tool', 'success');
        addLine('     purushothamr01.github.io/Jsexplorer/', 'response');
      },
      projects: () => {
        addLine('Publications:', 'accent');
        addLine('  📝 Complete Recon Workflow for Bug Bounty', 'success');
        addLine('  📝 Reading JavaScript Like a Hacker', 'success');
        addLine('  📝 Automating SQL Injection with SQLmap', 'success');
      },
      contact: () => {
        addLine('Contact Information:', 'accent');
        addLine('  📧 purubughunting@gmail.com', 'response');
        addLine('  🔗 linkedin.com/in/purushothamr06', 'response');
        addLine('  🐱 github.com/purushothamr01', 'response');
      },
      socials: () => {
        addLine('Social Links:', 'accent');
        addLine('  GitHub:   github.com/purushothamr01', 'response');
        addLine('  LinkedIn: linkedin.com/in/purushothamr06', 'response');
        addLine('  Medium:   medium.com/@Purushothamr', 'response');
      },
      clear: () => {
        terminalOutput.innerHTML = '';
        addLine('Terminal cleared.', 'dim');
      },
      // Easter eggs
      matrix: () => {
        const chars = '01アイウエオカキクケコ';
        for (let i = 0; i < 8; i++) {
          let line = '';
          for (let j = 0; j < 50; j++) line += chars[Math.floor(Math.random() * chars.length)];
          addLine(line, 'success');
        }
        addLine('Wake up, Neo...', 'accent');
      },
      hack: () => {
        addLine('[*] Initializing hack sequence...', 'warning');
        addLine('[*] Bypassing firewall...', 'success');
        addLine('[*] Injecting payload...', 'accent');
        addLine('[*] Escalating privileges...', 'success');
        addLine('[!] ACCESS GRANTED', 'success');
        addLine('Just kidding 😄 This is just a portfolio!', 'purple');
      },
      date: () => {
        addLine(new Date().toLocaleString(), 'response');
      },
      uptime: () => {
        const seconds = Math.floor(performance.now() / 1000);
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        addLine(`Session uptime: ${mins}m ${secs}s`, 'accent');
      },
      neofetch: () => {
        addLine('  ____                      ', 'accent');
        addLine(' |  _ \\ _   _ _ __ _   _    ', 'accent');
        addLine(' | |_) | | | | \'__| | | |   ', 'accent');
        addLine(' |  __/| |_| | |  | |_| |   ', 'accent');
        addLine(' |_|    \\__,_|_|   \\__,_|   ', 'accent');
        addLine('', 'dim');
        addLine('OS:      Kali Linux', 'response');
        addLine('Shell:   /bin/bash', 'response');
        addLine('Role:    Security Researcher', 'response');
        addLine('Tools:   Burp / Nuclei / SQLMap', 'response');
        addLine('Coffee:  ████████████ 100%', 'success');
      }
    };

    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = terminalInput.value.trim().toLowerCase();
        addLine(`$ ${cmd}`, 'cmd-echo');
        terminalInput.value = '';

        if (cmd === '') return;
        if (commands[cmd]) {
          commands[cmd]();
        } else {
          addLine(`Command not found: ${cmd}`, 'warning');
          addLine('Type "help" for available commands.', 'dim');
        }
        addLine('', 'dim');
      }
    });

    // Click terminal to focus input
    const terminalCard = document.getElementById('terminalCard');
    if (terminalCard) {
      terminalCard.addEventListener('click', () => terminalInput.focus());
    }
  }
});
