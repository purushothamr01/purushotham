document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // PARTICLE SYSTEM (Hero Background)
  // ============================================
  const canvas = document.getElementById('particles-bg');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId;

    function resizeCanvas() {
      const hero = canvas.parentElement;
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    }

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.4 + 0.1;
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
        ctx.fillStyle = `rgba(37, 99, 235, ${this.opacity})`;
        ctx.fill();
      }
    }

    function initParticles() {
      const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }

    function drawConnections() {
      const maxDist = 120;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(37, 99, 235, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      drawConnections();
      animId = requestAnimationFrame(animateParticles);
    }

    resizeCanvas();
    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });
  }

  // ============================================
  // CURSOR GLOW
  // ============================================
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && window.innerWidth > 768) {
    let cursorX = 0, cursorY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
    });

    function updateGlow() {
      glowX += (cursorX - glowX) * 0.08;
      glowY += (cursorY - glowY) * 0.08;
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
      requestAnimationFrame(updateGlow);
    }
    updateGlow();
  }

  // ============================================
  // SCROLL PROGRESS BAR
  // ============================================
  const scrollProgress = document.getElementById('scrollProgress');
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      scrollProgress.style.width = progress + '%';
    });
  }

  // ============================================
  // NAVBAR SCROLL EFFECT
  // ============================================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ============================================
  // MOBILE MENU
  // ============================================
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ============================================
  // SMOOTH SCROLL
  // ============================================
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

  // ============================================
  // SCROLL TO TOP
  // ============================================
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================
  // STAT COUNTER ANIMATION
  // ============================================
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        let current = 0;
        const duration = 1500;
        const step = target / (duration / 16);

        const counter = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(counter);
          }
          el.textContent = Math.floor(current) + '+';
        }, 16);

        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => counterObserver.observe(num));

  // ============================================
  // ACTIVE NAV HIGHLIGHTING
  // ============================================
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 200) {
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

  // ============================================
  // GSAP ANIMATIONS
  // ============================================
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero staggered entrance
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl
      .from('.hero-badge', { opacity: 0, y: 30, duration: 0.7 })
      .from('.hero-title', { opacity: 0, y: 40, duration: 0.9 }, '-=0.3')
      .from('.hero-description', { opacity: 0, y: 30, duration: 0.7 }, '-=0.4')
      .from('.hero-actions', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
      .from('.hero-stats .stat-item', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1
      }, '-=0.2')
      .from('.hero-stats .stat-divider', {
        opacity: 0,
        scaleY: 0,
        duration: 0.4,
        stagger: 0.1
      }, '-=0.3');

    // Section headers
    gsap.utils.toArray('.section-header').forEach(header => {
      gsap.from(header, {
        scrollTrigger: {
          trigger: header,
          start: 'top 82%',
          once: true
        },
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out'
      });
    });

    // About content
    gsap.from('.about-content', {
      scrollTrigger: {
        trigger: '.about-content',
        start: 'top 80%',
        once: true
      },
      opacity: 0,
      x: -40,
      duration: 0.9,
      ease: 'power3.out'
    });

    gsap.from('.about-image', {
      scrollTrigger: {
        trigger: '.about-image',
        start: 'top 80%',
        once: true
      },
      opacity: 0,
      x: 40,
      duration: 0.9,
      ease: 'power3.out'
    });

    // Expertise cards stagger
    gsap.utils.toArray('.expertise-card').forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          once: true
        },
        opacity: 0,
        y: 50,
        duration: 0.7,
        delay: index * 0.12,
        ease: 'power3.out'
      });
    });

    // Work cards stagger
    gsap.utils.toArray('.work-card').forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          once: true
        },
        opacity: 0,
        y: 50,
        scale: 0.96,
        duration: 0.7,
        delay: index * 0.15,
        ease: 'power3.out'
      });
    });

    // Contact links
    gsap.utils.toArray('.contact-link').forEach((link, index) => {
      gsap.from(link, {
        scrollTrigger: {
          trigger: link,
          start: 'top 88%',
          once: true
        },
        opacity: 0,
        x: -30,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power3.out'
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
      scale: 0.92,
      y: 30,
      duration: 0.9,
      ease: 'power3.out'
    });

    // Interactive Terminal
    const terminalOutput = document.getElementById('terminalOutput');
    const terminalInput = document.getElementById('terminalInput');
    const terminalBody = document.getElementById('terminalBody');
    let terminalBooted = false;

    if (terminalOutput && terminalInput) {
      // Terminal commands
      const commands = {
        help: () => [
          { text: '', cls: '' },
          { text: '  Available Commands:', cls: 'accent' },
          { text: '  ─────────────────────────────', cls: 'dim' },
          { text: '  whoami       → About me', cls: 'response' },
          { text: '  skills       → Technical skills', cls: 'response' },
          { text: '  projects     → Featured work', cls: 'response' },
          { text: '  contact      → Contact info', cls: 'response' },
          { text: '  socials      → Social links', cls: 'response' },
          { text: '  cat resume   → Quick summary', cls: 'response' },
          { text: '  uname -a     → System info', cls: 'response' },
          { text: '  date         → Current date', cls: 'response' },
          { text: '  clear        → Clear terminal', cls: 'response' },
          { text: '', cls: '' },
        ],
        whoami: () => [
          { text: '', cls: '' },
          { text: '  ╭─ Purushotham R', cls: 'accent' },
          { text: '  │', cls: 'dim' },
          { text: '  ├─ 🔒 Security Researcher', cls: 'success' },
          { text: '  ├─ 🐛 Bug Bounty Hunter', cls: 'success' },
          { text: '  ├─ 🏗️  Founder @ Bloomeor', cls: 'success' },
          { text: '  ├─ 🎓 ECE Background', cls: 'response' },
          { text: '  ├─ 🌾 Farmer', cls: 'response' },
          { text: '  ╰─ 📸 Wildlife Photographer', cls: 'response' },
          { text: '', cls: '' },
        ],
        skills: () => [
          { text: '', cls: '' },
          { text: '  ╭─ Technical Arsenal', cls: 'accent' },
          { text: '  │', cls: 'dim' },
          { text: '  ├─ 🛡️  Web App Security    [██████████] 90%', cls: 'success' },
          { text: '  ├─ 🔍 Recon & OSINT       [█████████░] 85%', cls: 'success' },
          { text: '  ├─ 🐍 Python              [█████████░] 85%', cls: 'warning' },
          { text: '  ├─ 🖥️  Bash Scripting      [████████░░] 80%', cls: 'warning' },
          { text: '  ├─ ☁️  Cloud Security       [███████░░░] 70%', cls: 'purple' },
          { text: '  ╰─ 🔧 Go                  [██████░░░░] 60%', cls: 'purple' },
          { text: '', cls: '' },
          { text: '  Tools: Burp Suite, SQLMap, Nuclei, Subfinder', cls: 'dim' },
          { text: '', cls: '' },
        ],
        projects: () => [
          { text: '', cls: '' },
          { text: '  📂 Featured Research:', cls: 'accent' },
          { text: '  ─────────────────────────────', cls: 'dim' },
          { text: '  [1] Complete Recon Workflow (2024)', cls: 'success' },
          { text: '      → Bug bounty recon methodology', cls: 'dim' },
          { text: '  [2] Reading JS Like a Hacker (2024)', cls: 'warning' },
          { text: '      → Hidden API & logic flaw analysis', cls: 'dim' },
          { text: '  [3] Automating SQLi with SQLmap (2024)', cls: 'purple' },
          { text: '      → Responsible SQLi automation', cls: 'dim' },
          { text: '', cls: '' },
          { text: '  Read more at medium.com/@Purushothamr', cls: 'response' },
          { text: '', cls: '' },
        ],
        contact: () => [
          { text: '', cls: '' },
          { text: '  ╭─ Contact Information', cls: 'accent' },
          { text: '  │', cls: 'dim' },
          { text: '  ├─ 📧 purushothamr242@gmail.com', cls: 'success' },
          { text: '  ├─ 💼 linkedin.com/in/purushothamr06', cls: 'response' },
          { text: '  ├─ 🐙 github.com/purushothamr01', cls: 'response' },
          { text: '  ╰─ ✍️  medium.com/@Purushothamr', cls: 'response' },
          { text: '', cls: '' },
          { text: '  Status: 🟢 Available for consulting', cls: 'success' },
          { text: '', cls: '' },
        ],
        socials: () => [
          { text: '', cls: '' },
          { text: '  🌐 Social Links:', cls: 'accent' },
          { text: '  ─────────────────────────────', cls: 'dim' },
          { text: '  LinkedIn  → linkedin.com/in/purushothamr06', cls: 'response' },
          { text: '  GitHub    → github.com/purushothamr01', cls: 'response' },
          { text: '  Medium    → medium.com/@Purushothamr', cls: 'response' },
          { text: '  Bloomeor  → bloomeor.github.io/bloomeor', cls: 'success' },
          { text: '  Wildlife  → purushothamr01.github.io/purushothamr', cls: 'success' },
          { text: '', cls: '' },
        ],
        'cat resume': () => [
          { text: '', cls: '' },
          { text: '  ┌───────────────────────────────────┐', cls: 'accent' },
          { text: '  │     PURUSHOTHAM R — RESUME        │', cls: 'accent' },
          { text: '  └───────────────────────────────────┘', cls: 'accent' },
          { text: '', cls: '' },
          { text: '  Role:       Security Researcher', cls: 'response' },
          { text: '  Company:    Bloomeor (Founder)', cls: 'response' },
          { text: '  Education:  B.E. in ECE', cls: 'response' },
          { text: '  Focus:      Web App Security', cls: 'success' },
          { text: '  Bugs:       10+ vulnerabilities', cls: 'success' },
          { text: '  Experience: 2+ years', cls: 'success' },
          { text: '  Languages:  Python, Bash, JS, Go', cls: 'warning' },
          { text: '', cls: '' },
        ],
        'uname -a': () => [
          { text: '  Linux kali 6.1.0-kali9 #1 SMP x86_64 GNU/Linux', cls: 'response' },
        ],
        date: () => [
          { text: '  ' + new Date().toString(), cls: 'response' },
        ],
      };

      function addLine(text, cls = 'response') {
        const line = document.createElement('div');
        line.className = 'term-line ' + cls;
        line.textContent = text;
        terminalOutput.appendChild(line);
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }

      function addPromptEcho(cmd) {
        const line = document.createElement('div');
        line.className = 'term-line cmd-echo';
        line.innerHTML = '<span class="prompt-user">purushotham</span><span class="prompt-at">@</span><span class="prompt-host">kali</span><span class="prompt-colon">:</span><span class="prompt-path">~</span><span class="prompt-dollar">$</span> ' + cmd;
        terminalOutput.appendChild(line);
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }

      function processCommand(cmd) {
        const trimmed = cmd.trim().toLowerCase();
        addPromptEcho(cmd);

        if (trimmed === 'clear') {
          terminalOutput.innerHTML = '';
          return;
        }

        if (trimmed === '') return;

        const handler = commands[trimmed];
        if (handler) {
          const lines = handler();
          lines.forEach((l, i) => {
            setTimeout(() => {
              addLine(l.text, l.cls);
            }, i * 30);
          });
        } else {
          addLine('  bash: ' + trimmed + ': command not found', 'error');
          addLine('  Type "help" for available commands', 'dim');
        }
      }

      terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const cmd = terminalInput.value;
          terminalInput.value = '';
          processCommand(cmd);
        }
      });

      // Click anywhere on terminal to focus input
      document.getElementById('terminalCard').addEventListener('click', () => {
        terminalInput.focus();
      });

      // Boot sequence on scroll
      const terminalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !terminalBooted) {
            terminalBooted = true;
            runBootSequence();
          }
        });
      }, { threshold: 0.3 });

      terminalObserver.observe(document.getElementById('terminalCard'));

      function runBootSequence() {
        const bootLines = [
          { text: '  ┌─────────────────────────────────┐', cls: 'accent', delay: 0 },
          { text: '  │ Welcome to Purushotham\'s Shell │', cls: 'accent', delay: 60 },
          { text: '  └─────────────────────────────────┘', cls: 'accent', delay: 120 },
          { text: '', cls: '', delay: 180 },
          { text: '  OS:     Kali GNU/Linux', cls: 'response', delay: 240 },
          { text: '  Host:   purushotham.r', cls: 'response', delay: 300 },
          { text: '  Kernel: 6.1.0-kali9-amd64', cls: 'response', delay: 360 },
          { text: '  Shell:  /bin/zsh', cls: 'response', delay: 420 },
          { text: '  Uptime: 3+ years hacking', cls: 'success', delay: 480 },
          { text: '  Bugs:   60+ found & reported', cls: 'success', delay: 540 },
          { text: '', cls: '', delay: 600 },
          { text: '  Type "help" for available commands.', cls: 'dim', delay: 660 },
          { text: '', cls: '', delay: 720 },
        ];

        bootLines.forEach(line => {
          setTimeout(() => {
            addLine(line.text, line.cls);
          }, line.delay);
        });

        // Focus input after boot
        setTimeout(() => {
          terminalInput.focus();
        }, 800);
      }
    }
  }

  // ============================================
  // CARD TILT EFFECT
  // ============================================
  if (window.innerWidth > 768) {
    const tiltCards = document.querySelectorAll('.expertise-card, .work-card');
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        card.style.transition = 'transform 0.5s ease';
      });

      card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
      });
    });
  }

  // ============================================
  // PARALLAX HERO
  // ============================================
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
      hero.style.transform = `translateY(${scrolled * 0.2}px)`;
      hero.style.opacity = 1 - (scrolled / 800);
    }
  });

  console.log('%c🔒 Portfolio loaded successfully!', 'color: #00d4ff; font-weight: bold; font-size: 14px;');
});
