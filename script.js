/**
 * Premium DevFolio — Full Script
 */
(function () {
  "use strict";

  // ============================================
  // PRELOADER
  // ============================================
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('hidden'), 500);
    });
    setTimeout(() => preloader.classList.add('hidden'), 3000);
  }

  // ============================================
  // SCROLL PROGRESS BAR
  // ============================================
  const scrollProgress = document.getElementById('scrollProgress');
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.style.width = ((window.scrollY / total) * 100) + '%';
    });
  }

  // ============================================
  // HEADER SCROLL EFFECT
  // ============================================
  const header = document.getElementById('header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
  }

  // ============================================
  // CUSTOM CURSOR
  // ============================================
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');

  if (cursorDot && cursorOutline) {
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    // Smoothness / Lag Factor
    const speed = 0.15;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Immediate position for dot
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    // Lerp logic for the smooth outline trail
    const animateCursor = () => {
      let distX = mouseX - outlineX;
      let distY = mouseY - outlineY;

      outlineX = outlineX + (distX * speed);
      outlineY = outlineY + (distY * speed);

      cursorOutline.style.left = outlineX + 'px';
      cursorOutline.style.top = outlineY + 'px';

      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Click Animation
    window.addEventListener('mousedown', () => {
      cursorOutline.style.transform = 'translate(-50%, -50%) scale(0.8)';
      cursorOutline.style.background = 'rgba(0, 122, 255, 0.2)';
    });

    window.addEventListener('mouseup', () => {
      cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorOutline.style.background = 'rgba(0, 122, 255, 0.05)';
    });

    // Hover interactions
    const hoverTargets = 'a, button, .nav-link, .contact-item-card, .social-link-card, .tool-card, .btn-primary-cta, .btn-outline-cta';
    document.body.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverTargets)) {
        document.body.classList.add('cursor-hover');
      }
    });

    document.body.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverTargets)) {
        document.body.classList.remove('cursor-hover');
      }
    });
  }

  // ============================================
  // MOBILE NAV TOGGLE
  // ============================================
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navbar = document.getElementById('navbar');
  if (mobileToggle && navbar) {
    mobileToggle.addEventListener('click', () => {
      navbar.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      icon.classList.toggle('bi-list');
      icon.classList.toggle('bi-x');
    });
    navbar.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        icon.className = 'bi bi-list';
      });
    });
  }

  // ============================================
  // ACTIVE NAV HIGHLIGHTING
  // ============================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar .nav-link');
  function updateActiveNav() {
    const scrollY = window.scrollY + 200;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) link.classList.add('active');
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
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = header ? header.offsetHeight : 0;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      }
    });
  });

  // ============================================
  // BACK TO TOP
  // ============================================
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================
  // TYPED TEXT
  // ============================================
  const typedEl = document.getElementById('heroTyped');
  if (typedEl) {
    const phrases = ['Security Researcher', 'Bug Bounty Hunter', 'Pentest Enthusiast', 'Founder of Bloomeor'];
    let pIdx = 0, cIdx = 0, isDel = false;
    function typeLoop() {
      const current = phrases[pIdx];
      if (isDel) {
        typedEl.textContent = current.substring(0, cIdx--);
        if (cIdx < 0) { isDel = false; pIdx = (pIdx + 1) % phrases.length; setTimeout(typeLoop, 400); return; }
        setTimeout(typeLoop, 35);
      } else {
        typedEl.textContent = current.substring(0, cIdx++);
        if (cIdx > current.length) { isDel = true; setTimeout(typeLoop, 2200); return; }
        setTimeout(typeLoop, 75);
      }
    }
    setTimeout(typeLoop, 800);
  }

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
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = Math.floor(current) + '+';
        }, 16);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  // ============================================
  // SKILL BAR ANIMATION
  // ============================================
  const skillBars = document.querySelectorAll('.skill-fill[data-width], .service-progress-fill[data-width]');
  const barObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width + '%';
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  skillBars.forEach(bar => barObserver.observe(bar));

  // ============================================
  // REVEAL ON SCROLL
  // ============================================
  const revealElements = document.querySelectorAll(
    '.service-card, .portfolio-card, .blog-card, .contact-item, .about-card, .info-item'
  );
  revealElements.forEach(el => el.classList.add('reveal'));
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const parent = entry.target.parentElement;
        const siblings = Array.from(parent.children).filter(c => c.classList.contains('reveal'));
        const index = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 0.1}s`;
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealElements.forEach(el => revealObserver.observe(el));

  // Section headers
  document.querySelectorAll('.section-header').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // ============================================
  // ADVANCED CONSTELLATION NETWORK ANIMATION
  // ============================================
  const canvas = document.getElementById('particlesCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d', { alpha: false });
    const hero = canvas.closest('.hero');
    let particles = [];
    let animationFrameId;

    // Mouse interaction properties
    let mouse = {
      x: null,
      y: null,
      radius: 180,
      active: false
    };

    hero.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    });

    hero.addEventListener('mouseleave', () => {
      mouse.active = false;
    });

    function resizeCanvas() {
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
      initParticles();
    }
    window.addEventListener('resize', resizeCanvas);

    // Premium color palette (Deep space to glowing cyan/purple)
    const themeColors = [
      'rgba(0, 195, 255, 1)',    // Electric Cyan
      'rgba(88, 133, 255, 1)',   // Bright Deep Blue
      'rgba(180, 100, 255, 1)',  // Neon Purple
      'rgba(20, 70, 180, 0.4)'   // Deep faint blue (background filler)
    ];

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        // Premium depth of field: Z-axis determines size, speed, and blur
        // 0 is far away, 1 is close to screen
        this.z = Math.random();

        // Closer = larger and faster. Further = smaller and slower
        this.baseRadius = (this.z * 3) + 0.5;
        this.radius = this.baseRadius;

        // Extremely smooth, slow cinematic drift
        this.vx = (Math.random() - 0.5) * (this.z * 0.5 + 0.1);
        this.vy = (Math.random() - 0.5) * (this.z * 0.5 + 0.1);

        this.color = themeColors[Math.floor(Math.random() * themeColors.length)];

        // Smooth pulsing behavior
        this.pulseSpeed = Math.random() * 0.02 + 0.005;
        this.pulseOffset = Math.random() * Math.PI * 2;
      }

      update(time) {
        this.x += this.vx;
        this.y += this.vy;

        // Elegant wrapping instead of hard bouncing
        if (this.x < -50) this.x = canvas.width + 50;
        if (this.x > canvas.width + 50) this.x = -50;
        if (this.y < -50) this.y = canvas.height + 50;
        if (this.y > canvas.height + 50) this.y = -50;

        // Premium Mouse Interaction: Cinematic gravity/repel
        if (mouse.active) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            // Apply force based on depth (closer particles react more strongly)
            const force = ((mouse.radius - distance) / mouse.radius) * this.z;

            // Soft repel with swirling effect
            this.x -= (dx / distance) * force * 2;
            this.y -= (dy / distance) * force * 2;

            // Brighten and expand significantly on hover
            this.radius = this.baseRadius + (force * 3);
            this.hoverIntensity = force;
          } else {
            this.radius = this.baseRadius;
            this.hoverIntensity = 0;
          }
        } else {
          this.radius = this.baseRadius;
          this.hoverIntensity = 0;
        }

        // Apply slow pulsing opacity
        const baseOpacity = 0.3 + (this.z * 0.5); // Closer particles are brighter
        this.opacity = baseOpacity + Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.2 + (this.hoverIntensity || 0);
        if (this.opacity > 1) this.opacity = 1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        // Standard fast fill instead of shadowBlur
        ctx.fillStyle = this.color.replace(/[\d.]+\)$/, `${this.opacity})`);
        ctx.fill();

        // Fast faux-glow using a second larger, highly transparent circle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = this.color.replace(/[\d.]+\)$/, `${this.opacity * 0.15})`);
        ctx.fill();
      }
    }

    function initParticles() {
      // Lower density to ensure 60fps on all devices, still enough for depth
      const density = window.innerWidth < 768 ? 14000 : 9000;
      const count = Math.min(140, Math.floor((canvas.width * canvas.height) / density));
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 150;

          if (dist < maxDist) {
            // Only connect particles that are somewhat close in Z-depth to maintain parallax illusion
            const zDiff = Math.abs(particles[i].z - particles[j].z);
            if (zDiff > 0.4) continue;

            const opacity = (1 - (dist / maxDist)) * (1 - zDiff);

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);

            // Fast flat line color instead of expensive linear gradients
            ctx.strokeStyle = `rgba(100, 160, 255, ${opacity * 0.35})`;
            ctx.lineWidth = 0.5 + (Math.max(particles[i].z, particles[j].z) * 1.2);
            ctx.stroke();
          }
        }

        // Connection to mouse
        if (mouse.active) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius && particles[i].z > 0.3) {
            const opacity = 1 - (dist / mouse.radius);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);

            ctx.strokeStyle = `rgba(0, 200, 255, ${opacity * 0.5})`;
            ctx.lineWidth = 1 + (particles[i].z * 1.2);
            ctx.stroke();
          }
        }
      }
    }

    function animate(time) {
      // Cinematic Motion Blur (fast)
      ctx.fillStyle = 'rgba(5, 5, 8, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Removed expensive globalCompositeOperation='lighter' for high performance

      particles.forEach(p => {
        p.update(time);
        p.draw();
      });

      drawConnections();

      animationFrameId = requestAnimationFrame(animate);
    }

    resizeCanvas();
    animate(performance.now());
  }

  // ============================================
  // INTERACTIVE TERMINAL (Advanced v2.0)
  // ============================================
  document.addEventListener('DOMContentLoaded', () => {
    const terminalInput = document.getElementById('terminalInput');
    const terminalOutput = document.getElementById('terminalOutput');
    const terminalBody = document.getElementById('terminalBody');
    const terminalUptime = document.getElementById('terminalUptime');

    // Live uptime counter
    if (terminalUptime) {
      let seconds = 0;
      setInterval(() => {
        seconds++;
        const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        terminalUptime.textContent = `${h}:${m}:${s}`;
      }, 1000);
    }

    if (terminalInput && terminalOutput && terminalBody) {
      let commandHistory = [];
      let historyIndex = -1;

      function addLine(text, className = '') {
        const line = document.createElement('div');
        line.classList.add('term-line');
        if (className) line.classList.add(className);
        line.textContent = text;
        terminalOutput.appendChild(line);
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }

      // Typing effect for boot sequence
      async function typeLines(lines, speed = 30) {
        for (const { text, cls } of lines) {
          const line = document.createElement('div');
          line.classList.add('term-line');
          if (cls) line.classList.add(cls);
          terminalOutput.appendChild(line);
          for (let i = 0; i < text.length; i++) {
            line.textContent += text[i];
            await new Promise(r => setTimeout(r, speed));
          }
          terminalBody.scrollTop = terminalBody.scrollHeight;
          await new Promise(r => setTimeout(r, 60));
        }
      }

      // Animated progress bar
      async function showProgress(label, duration = 1500) {
        const line = document.createElement('div');
        line.classList.add('term-line', 'accent');
        terminalOutput.appendChild(line);
        const steps = 20;
        const delay = duration / steps;
        for (let i = 0; i <= steps; i++) {
          const filled = '█'.repeat(i) + '░'.repeat(steps - i);
          const pct = Math.round((i / steps) * 100);
          line.textContent = `${label} [${filled}] ${pct}%`;
          terminalBody.scrollTop = terminalBody.scrollHeight;
          await new Promise(r => setTimeout(r, delay));
        }
      }

      // Boot animation
      async function bootSequence() {

        await typeLines([
          { text: '[SYS] Initializing Purushotham\'s Terminal v2.0...', cls: 'dim' },
          { text: '[SYS] Loading modules...', cls: 'dim' },
        ], 18);
        await showProgress('Loading', 700);
        addLine('');
        addLine('✔ Terminal ready. Type "help" for commands.', 'success');
        addLine('  ↑/↓ = history | Tab = autocomplete', 'dim');
        addLine('');
      }

      bootSequence();

      const commands = {
        help: () => {
          addLine('┌───────────────────────────────────────┐', 'accent');
          addLine('│  Available Commands                    │', 'accent');
          addLine('├───────────────────────────────────────┤', 'accent');
          addLine('│  whoami     → About me                │', 'response');
          addLine('│  skills     → Technical skills         │', 'response');
          addLine('│  tools      → Open source tools        │', 'response');
          addLine('│  articles   → Published articles       │', 'response');
          addLine('│  contact    → How to reach me          │', 'response');
          addLine('│  socials    → Social media links        │', 'response');
          addLine('│  scan       → Run a security scan      │', 'response');
          addLine('│  clear      → Clear terminal           │', 'response');
          addLine('├───────────────────────────────────────┤', 'dim');
          addLine('│  🎮 Easter Eggs                       │', 'purple');
          addLine('│  matrix | hack | neofetch | nmap       │', 'purple');
          addLine('│  sudo | ping | ls | pwd | date         │', 'purple');
          addLine('└───────────────────────────────────────┘', 'accent');
        },
        whoami: () => {
          addLine('┌─ Identity ────────────────────────────┐', 'accent');
          addLine('│ Name:     Purushotham R                │', 'response');
          addLine('│ Role:     Security Researcher          │', 'response');
          addLine('│ Company:  Bloomeor (Founder)           │', 'response');
          addLine('│ Degree:   B.E in ECE                   │', 'response');
          addLine('│ Location: India 🇮🇳                     │', 'response');
          addLine('│ Status:   Available for bounties       │', 'success');
          addLine('└────────────────────────────────────────┘', 'accent');
        },
        skills: () => {
          addLine('[Skills Matrix]', 'accent');
          addLine('  Web Security     ████████████████░░ 90%', 'success');
          addLine('  Recon & OSINT    █████████████████░ 85%', 'success');
          addLine('  Python/Bash      ████████████████░░ 80%', 'accent');
          addLine('  JavaScript/Go    ██████████████░░░░ 70%', 'accent');
          addLine('  Cloud/Infra      █████████████░░░░░ 65%', 'response');
        },
        tools: () => {
          addLine('┌─ Open Source Tools ───────────────────┐', 'accent');
          addLine('│  🔎 ReconKit                          │', 'success');
          addLine('│     Recon automation framework         │', 'response');
          addLine('│     github.com/purushothamr01/ReconKit │', 'dim');
          addLine('│  ⚡ JS Explorer                       │', 'success');
          addLine('│     JavaScript analysis tool           │', 'response');
          addLine('│     purushothamr01.github.io/Jsexplorer│', 'dim');
          addLine('└────────────────────────────────────────┘', 'accent');
        },
        articles: () => {
          addLine('[Published Articles]', 'accent');
          addLine('  01. Complete Recon Workflow for Bug Bounty', 'success');
          addLine('      └─ medium.com/@Purushothamr', 'dim');
          addLine('  02. Reading JavaScript Like a Hacker', 'success');
          addLine('      └─ medium.com/@Purushothamr', 'dim');
          addLine('  03. Automating SQLi with SQLmap', 'success');
          addLine('      └─ medium.com/@Purushothamr', 'dim');
        },
        projects: () => { commands.articles(); },
        contact: () => {
          addLine('[Contact Info]', 'accent');
          addLine('  📧 Email:    purubughunting@gmail.com', 'response');
          addLine('  🔗 LinkedIn: linkedin.com/in/purushothamr06', 'response');
          addLine('  🐱 GitHub:   github.com/purushothamr01', 'response');
          addLine('  📝 Medium:   medium.com/@Purushothamr', 'response');
        },
        socials: () => {
          addLine('[Social Links]', 'accent');
          addLine('  GitHub   → github.com/purushothamr01', 'response');
          addLine('  LinkedIn → linkedin.com/in/purushothamr06', 'response');
          addLine('  Medium   → medium.com/@Purushothamr', 'response');
          addLine('  Blog     → bloomeor.github.io/bloomeor', 'response');
        },
        scan: async () => {
          addLine('[*] Initiating target scan...', 'warning');
          await new Promise(r => setTimeout(r, 400));
          addLine('[*] Target: purushotham.dev', 'response');
          await showProgress('Scanning ports', 1200);
          addLine('[+] Port 22    SSH       OPEN', 'success');
          await new Promise(r => setTimeout(r, 200));
          addLine('[+] Port 80    HTTP      OPEN', 'success');
          await new Promise(r => setTimeout(r, 200));
          addLine('[+] Port 443   HTTPS     OPEN', 'success');
          await new Promise(r => setTimeout(r, 200));
          addLine('[+] Port 3000  Node.js   OPEN', 'accent');
          await new Promise(r => setTimeout(r, 300));
          addLine('');
          await showProgress('Vulnerability scan', 1000);
          addLine('[✔] No vulnerabilities found. Site is secure! 🛡️', 'success');
        },
        clear: () => {
          terminalOutput.innerHTML = '';
          addLine('Terminal cleared.', 'dim');
        },
        matrix: () => {
          const chars = '01アイウエオカキクケコサシスセソ';
          for (let i = 0; i < 8; i++) {
            let line = '';
            for (let j = 0; j < 50; j++) line += chars[Math.floor(Math.random() * chars.length)];
            addLine(line, 'success');
          }
          addLine('');
          addLine('Follow the white rabbit 🐇', 'accent');
          addLine('The Matrix has you...', 'dim');
        },
        hack: async () => {
          addLine('[*] Initializing hack sequence...', 'warning');
          await new Promise(r => setTimeout(r, 300));
          addLine('[*] Bypassing firewall...', 'response');
          await showProgress('Bypass', 800);
          addLine('[*] Injecting payload...', 'accent');
          await new Promise(r => setTimeout(r, 500));
          addLine('[*] Decrypting credentials...', 'response');
          await showProgress('Decrypt', 600);
          addLine('[!] ACCESS GRANTED ✅', 'success');
          addLine('');
          addLine('Just kidding 😄 This is a portfolio!', 'purple');
          addLine('But I could find real vulns in yours.', 'dim');
        },
        neofetch: () => {
          addLine('  ██████╗ ██╗   ██╗██████╗ ██╗   ██╗', 'accent');
          addLine('  ██╔══██╗██║   ██║██╔══██╗██║   ██║', 'accent');
          addLine('  ██████╔╝██║   ██║██████╔╝██║   ██║', 'accent');
          addLine('  ██╔═══╝ ██║   ██║██╔══██╗██║   ██║', 'accent');
          addLine('  ██║     ╚██████╔╝██║  ██║╚██████╔╝', 'accent');
          addLine('  ╚═╝      ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ', 'accent');
          addLine('', 'dim');
          addLine('  OS:       Kali Linux 2025.1', 'response');
          addLine('  Shell:    /bin/zsh', 'response');
          addLine('  Terminal: puru-term v2.0', 'response');
          addLine('  Role:     Security Researcher', 'response');
          addLine('  Uptime:   3+ years in cybersec', 'response');
          addLine('  Bugs:     50+ found & reported', 'success');
          addLine('  Coffee:   ████████████████████ 100%', 'warning');
        },
        nmap: async () => {
          addLine('Starting Nmap 7.94 ( https://nmap.org )', 'dim');
          addLine('Nmap scan report for purushotham.dev', 'response');
          await showProgress('Host discovery', 800);
          addLine('Host is up (0.023s latency).', 'success');
          addLine('PORT     STATE   SERVICE', 'accent');
          addLine('22/tcp   open    ssh', 'success');
          addLine('80/tcp   open    http', 'success');
          addLine('443/tcp  open    https', 'success');
          addLine('Nmap done: 1 IP scanned in 2.34s', 'dim');
        },
        sudo: () => {
          addLine('[sudo] password for purushotham: ********', 'response');
          addLine('Nice try! 😏 Root access denied.', 'error');
          addLine('You don\'t need sudo to view my portfolio.', 'dim');
        },
        ping: async () => {
          addLine('PING purushotham.dev (93.184.216.34): 56 bytes', 'response');
          for (let i = 1; i <= 4; i++) {
            await new Promise(r => setTimeout(r, 400));
            const ms = (Math.random() * 20 + 10).toFixed(1);
            addLine(`64 bytes: icmp_seq=${i} ttl=56 time=${ms} ms`, 'success');
          }
          addLine('--- purushotham.dev ping statistics ---', 'dim');
          addLine('4 packets transmitted, 4 received, 0% loss', 'accent');
        },
        date: () => { addLine(new Date().toString(), 'response'); },
        hostname: () => { addLine('puru-kali-2025', 'response'); },
        pwd: () => { addLine('/home/purushotham', 'response'); },
        ls: () => {
          addLine('drwxr-xr-x  ReconKit/', 'accent');
          addLine('drwxr-xr-x  JsExplorer/', 'accent');
          addLine('-rw-r--r--  portfolio.html', 'response');
          addLine('-rw-r--r--  resume.pdf', 'response');
          addLine('-rw-r--r--  README.md', 'response');
        },
      };

      // Command completions
      const cmdNames = Object.keys(commands);

      terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const cmd = terminalInput.value.trim().toLowerCase();
          addLine(`$ ${cmd}`, 'cmd-echo');
          terminalInput.value = '';
          if (cmd === '') return;
          commandHistory.unshift(cmd);
          historyIndex = -1;
          if (commands[cmd]) commands[cmd]();
          else { addLine(`Command not found: ${cmd}`, 'error'); addLine('Type "help" for available commands.', 'dim'); }
          addLine('', 'dim');
        }
        // Arrow up/down for history
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            terminalInput.value = commandHistory[historyIndex];
          }
        }
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (historyIndex > 0) {
            historyIndex--;
            terminalInput.value = commandHistory[historyIndex];
          } else { historyIndex = -1; terminalInput.value = ''; }
        }
        // Tab completion
        if (e.key === 'Tab') {
          e.preventDefault();
          const partial = terminalInput.value.trim().toLowerCase();
          if (partial) {
            const match = cmdNames.find(c => c.startsWith(partial));
            if (match) terminalInput.value = match;
          }
        }
      });

      const terminalCard = document.getElementById('terminalCard');
      if (terminalCard) terminalCard.addEventListener('click', () => terminalInput.focus());
    }
  });

})();
