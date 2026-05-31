document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Dual-Header Navigation Shrink & Highlight
  // ==========================================
  const mainNav = document.querySelector('.main-nav');
  const scrollProgressBar = document.getElementById('progress-bar');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    // Update Scroll Progress Bar
    if (scrollProgressBar) {
      scrollProgressBar.style.width = scrollPercent + '%';
    }

    // Shrink Nav on Scroll
    if (mainNav) {
      if (scrollTop > 40) {
        mainNav.classList.add('scrolled');
      } else {
        mainNav.classList.remove('scrolled');
      }
    }

    // Highlight Navigation Menu Items on Scroll (Scroll Spy)
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 135;
      const sectionHeight = section.clientHeight;
      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================
  // 2. Scroll Reveal Animations
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Reveal once
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================
  // 3. Mobile Navigation Drawer Toggle
  // ==========================================
  const mobileToggleBtn = document.getElementById('btn-mobile-toggle');
  const navMenu = document.getElementById('nav-menu-list');

  if (mobileToggleBtn && navMenu) {
    mobileToggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-active');
      const isExpanded = navMenu.classList.contains('mobile-active');
      mobileToggleBtn.innerHTML = isExpanded ? '&#x2715;' : '&#x2630;'; // X or Hamburger
    });

    // Close menu when a navigation item is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-active');
        mobileToggleBtn.innerHTML = '&#x2630;';
      });
    });
  }

  // ==========================================
  // 4. Statistics Counter & Circular Rings Fill
  // ==========================================
  const statsSection = document.getElementById('summer');
  const statItems = document.querySelectorAll('.stat-item');
  let countersAnimated = false;

  function animateStats() {
    statItems.forEach(item => {
      const ring = item.querySelector('.circle-progress-ring');
      if (!ring) return;
      
      const counterElement = item.querySelector('.circle-inner-value');
      const targetPercent = parseInt(ring.getAttribute('data-percent') || '0', 10);
      const targetNum = ring.getAttribute('data-num') || '';
      
      // Conic Gradient Circle Progress Animation
      let currentPercent = 0;
      const isOrange = ring.classList.contains('circle-ring-orange');
      
      const ringInterval = setInterval(() => {
        if (currentPercent >= targetPercent) {
          clearInterval(ringInterval);
        } else {
          currentPercent++;
          const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#0667b3';
          const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-secondary').trim() || '#f38421';
          const ringColor = isOrange ? secondaryColor : primaryColor;
          const ringBg = document.documentElement.getAttribute('data-theme') === 'dark' ? '#1e293b' : '#e1e7f0';
          const innerBg = document.documentElement.getAttribute('data-theme') === 'dark' ? '#0d1527' : '#ffffff';
          
          ring.style.background = `radial-gradient(closest-side, ${innerBg} 79%, transparent 80% 100%),
                                   conic-gradient(${ringColor} ${currentPercent}%, ${ringBg} 0)`;
        }
      }, 15);

      // Numerical Counter Animation
      const numericTarget = parseInt(targetNum.replace(/\D/g, ''), 10);
      const isPlus = targetNum.includes('+');
      
      let startValue = 0;
      const duration = 1500;
      const steps = 50;
      const stepValue = numericTarget / steps;
      const stepDuration = duration / steps;
      
      const counterInterval = setInterval(() => {
        startValue += stepValue;
        if (startValue >= numericTarget) {
          counterElement.textContent = isPlus ? `${numericTarget}+` : numericTarget;
          clearInterval(counterInterval);
        } else {
          counterElement.textContent = isPlus ? `${Math.floor(startValue)}+` : Math.floor(startValue);
        }
      }, stepDuration);
    });
  }

  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          animateStats();
          statsObserver.unobserve(statsSection);
        }
      });
    }, {
      threshold: 0.3
    });

    statsObserver.observe(statsSection);
  }

  // ==========================================
  // 5. Dynamic Task/Events Filtering
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const eventCards = document.querySelectorAll('.event-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      eventCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ==========================================
  // 6. Theme Switcher Logic (Dark / Cyberpunk Mode)
  // ==========================================
  const themeToggleBtn = document.getElementById('btn-theme-toggle');
  
  // Set default theme from localStorage
  const savedTheme = localStorage.getItem('nextgenai_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('nextgenai_theme', newTheme);
      
      // Update statistics ring backgrounds on theme change if animated
      if (countersAnimated) {
        statItems.forEach(item => {
          const ring = item.querySelector('.circle-progress-ring');
          if (!ring) return;
          const targetPercent = parseInt(ring.getAttribute('data-percent') || '0', 10);
          const isOrange = ring.classList.contains('circle-ring-orange');
          const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#0667b3';
          const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-secondary').trim() || '#f38421';
          const ringColor = isOrange ? secondaryColor : primaryColor;
          const ringBg = newTheme === 'dark' ? '#1e293b' : '#e1e7f0';
          const innerBg = newTheme === 'dark' ? '#0d1527' : '#ffffff';
          
          ring.style.background = `radial-gradient(closest-side, ${innerBg} 79%, transparent 80% 100%),
                                   conic-gradient(${ringColor} ${targetPercent}%, ${ringBg} 0)`;
        });
      }

      showToast(newTheme === 'dark' ? '⚡ تم تفعيل ثيم المطورين الداكن (Cyberpunk Mode)' : '☀️ تم تفعيل ثيم النهار الأكاديمي');
    });
  }

  // ==========================================
  // 7. Interactive Coding Challenge System
  // ==========================================
  const btnVerifyChallenge = document.getElementById('btn-verify-challenge');
  const challengeInput = document.getElementById('challenge-answer');
  const challengeError = document.getElementById('challenge-error');
  const challengeContainer = document.getElementById('challenge-container');
  const recruitmentFormContainer = document.getElementById('recruitment-form-container');

  // Check if challenge is already solved previously
  if (localStorage.getItem('nextgenai_challenge_solved') === 'true') {
    if (challengeContainer && recruitmentFormContainer) {
      challengeContainer.style.display = 'none';
      recruitmentFormContainer.style.display = 'block';
    }
  }

  if (btnVerifyChallenge && challengeInput) {
    btnVerifyChallenge.addEventListener('click', () => {
      const userAnswer = challengeInput.value.trim();
      
      // Correct answer is "name"
      if (userAnswer === 'name') {
        challengeError.style.display = 'none';
        
        // Beautiful fade-out/fade-in animation
        challengeContainer.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        challengeContainer.style.opacity = '0';
        challengeContainer.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
          challengeContainer.style.display = 'none';
          
          recruitmentFormContainer.style.display = 'block';
          recruitmentFormContainer.style.opacity = '0';
          recruitmentFormContainer.style.transform = 'translateY(10px)';
          recruitmentFormContainer.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          
          setTimeout(() => {
            recruitmentFormContainer.style.opacity = '1';
            recruitmentFormContainer.style.transform = 'translateY(0)';
          }, 50);

          localStorage.setItem('nextgenai_challenge_solved', 'true');
          showToast('🏆 أحسنت! إجابة صحيحة. تم فتح استمارة النخبة بنجاح 🎉!', '🏆');
        }, 400);

      } else {
        challengeError.style.display = 'block';
        challengeInput.style.borderColor = '#ff6b6b';
        challengeInput.classList.add('error-shake');
        setTimeout(() => challengeInput.classList.remove('error-shake'), 500);
      }
    });
  }

  // ==========================================
  // 8. Simulated AI Chatbot (NextGenAI Assistant)
  // ==========================================
  const chatToggle = document.getElementById('btn-chat-toggle');
  const chatWindow = document.getElementById('chat-window');
  const chatClose = document.getElementById('btn-chat-close');
  const chatInputForm = document.getElementById('chat-input-form');
  const chatUserInput = document.getElementById('chat-user-input');
  const chatMessages = document.getElementById('chat-messages');
  const chatPresets = document.querySelectorAll('.chat-preset-btn');
  const chatToggleBadge = chatToggle ? chatToggle.querySelector('.chat-toggle-badge') : null;

  if (chatToggle && chatWindow) {
    chatToggle.addEventListener('click', () => {
      chatWindow.classList.toggle('active');
      if (chatToggleBadge) chatToggleBadge.style.display = 'none'; // Clear badge
    });
  }

  if (chatClose) {
    chatClose.addEventListener('click', () => {
      chatWindow.classList.remove('active');
    });
  }

  // Pre-configured Intelligent QA Answers in Arabic
  const botAnswers = {
    'مؤسس': 'مؤسس فريق NextGenAI هو المطور الشاب الملهم 🚀 **"معاذ"**، وهو من رسم الرؤية الأساسية للفريق لتمكين الطلاب وربط مناهج الذكاء الاصطناعي بالتطبيق الفعلي.',
    'محمد': 'المسؤول التقني للفريق هو الباشمهندس 💻 **محمد محمود محمد شعبان** (Technical Lead). يشرف على النظم التقنية وتطوير المنصات ويعد المادة العلمية للمعسكرات.',
    'المسؤول': 'المسؤول التقني للفريق هو الباشمهندس 💻 **محمد محمود محمد شعبان** (Technical Lead). يشرف على النظم التقنية وتطوير المنصات ويعد المادة العلمية للمعسكرات.',
    'كيف': 'الانضمام للفريق غاية في السهولة! حل **تحدي المبرمج الذكي 💻** في قسم الانضمام أسفل الموقع، وبمجرد حله، سيفتح لك النموذج لتعبئة بياناتك واختيار مسارك المفضل! 🚀',
    'انضم': 'الانضمام للفريق غاية في السهولة! حل **تحدي المبرمج الذكي 💻** في قسم الانضمام أسفل الموقع، وبمجرد حله، سيفتح لك النموذج لتعبئة بياناتك واختيار مسارك المفضل! 🚀',
    'صيف': 'معسكرات الصيف (Summer Bootcamps) ستقدم دورات مكثفة بأكثر من 120 ساعة تدريبية وتطبيقات عملية في البرمجة، والتعلم الآلي، وأمن المعلومات لتأهيل الطلاب! ☀️',
    'تخصص': 'كليتنا الرائدة تحتوي على 3 تخصصات متكاملة: 🧠 **الذكاء الاصطناعي العام**، 🧬 **الذكاء الاصطناعي الحيوي**، و🛡️ **أمن المعلومات والذكاء الاصطناعي**. ويدعم فريقنا طلاب جميع هذه الأقسام.',
    ' bio': 'قسم **الذكاء الاصطناعي الحيوي (Bio AI)** 🧬 يدمج الذكاء الاصطناعي مع الطب والجينوم الحيوية لمعالجة الصور الطبية وتشخيص الأمراض والبروتينات الحاسوبية.',
    ' security': 'قسم **أمن المعلومات والذكاء الاصطناعي** 🛡️ يركز على الأمن السيبراني واكتشاف التهديدات البرمجية بالتشفير والذكاء الاصطناعي الدفاعي والهجومي.',
    'عام': 'قسم **الذكاء الاصطناعي العام (General AI)** 🧠 يغطي الخوارزميات، رؤية الحاسب، معالجة اللغات الطبيعية وروبوتات التحكم الذاتي المتكاملة.',
    'أقسام': 'كليتنا الرائدة تحتوي على 3 تخصصات متكاملة: 🧠 **الذكاء الاصطناعي العام**، 🧬 **الذكاء الاصطناعي الحيوي**، و🛡️ **أمن المعلومات والذكاء الاصطناعي**. ويدعم فريقنا طلاب جميع هذه الأقسام.'
  };

  const defaultBotAnswer = 'سؤال مميز! فريق **NextGenAI** بكلية هندسة الذكاء الاصطناعي يهدف لبناء جيل متمكن برمجياً وعلمياً. يمكنك التسجيل بالمعسكر الصيفى أو التواصل مباشرة مع المسؤول التقني محمد شعبان أو المؤسس معاذ! 🧠🚀';

  function appendChatBubble(text, sender) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // basic bolding markdown
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleBotResponse(userMsg) {
    // Show typing loader
    const loader = document.createElement('div');
    loader.className = 'chat-bubble bot loading';
    loader.innerHTML = 'يكتب الآن... <span class="typing-dots"></span>';
    chatMessages.appendChild(loader);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Process matching reply
    let responseText = defaultBotAnswer;
    const lowerMsg = userMsg.toLowerCase();
    
    for (const key in botAnswers) {
      if (lowerMsg.includes(key)) {
        responseText = botAnswers[key];
        break;
      }
    }

    setTimeout(() => {
      loader.remove();
      appendChatBubble(responseText, 'bot');
    }, 900 + Math.random() * 600); // realistic delay
  }

  // Presets trigger
  chatPresets.forEach(btn => {
    btn.addEventListener('click', () => {
      const question = btn.getAttribute('data-q');
      appendChatBubble(question, 'user');
      handleBotResponse(question);
    });
  });

  if (chatInputForm && chatUserInput) {
    chatInputForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const question = chatUserInput.value.trim();
      if (!question) return;

      appendChatBubble(question, 'user');
      chatUserInput.value = '';
      handleBotResponse(question);
    });
  }

  // ==========================================
  // 9. Interactive RSVP Modal Handlers
  // ==========================================
  const modalOverlay = document.getElementById('rsvp-modal');
  const modalCloseBtn = document.getElementById('btn-close-modal');
  const modalTitle = document.getElementById('modal-event-title');
  const eventNameInput = document.getElementById('rsvp-event-name');
  const rsvpForm = document.getElementById('rsvp-form');
  const rsvpButtons = document.querySelectorAll('.rsvp-trigger');

  rsvpButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const eventName = btn.getAttribute('data-event');
      if (modalOverlay && modalTitle && eventNameInput) {
        modalTitle.textContent = `المشاركة في: ${eventName}`;
        eventNameInput.value = eventName;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
      if (rsvpForm) rsvpForm.reset();
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // ==========================================
  // 10. Success Toast Indicators
  // ==========================================
  function showToast(message, icon = '&#x2714;') {
    const toast = document.getElementById('toast-feedback');
    const toastIcon = toast ? toast.querySelector('.toast-icon') : null;
    const toastMessage = toast ? toast.querySelector('.toast-message') : null;

    if (toast && toastIcon && toastMessage) {
      toastIcon.innerHTML = icon;
      toastMessage.textContent = message;
      toast.classList.add('show');

      setTimeout(() => {
        toast.classList.remove('show');
      }, 4000);
    }
  }

  // ==========================================
  // 11. Form Submissions
  // ==========================================

  // RSVP Form Modal Submission
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = rsvpForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'جارٍ التسجيل...';

      setTimeout(() => {
        const attendeeName = document.getElementById('rsvp-name').value;
        const taskRegistered = eventNameInput.value;

        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        closeModal();

        // Save RSVP
        const localRSVPs = JSON.parse(localStorage.getItem('nextgenai_rsvps') || '[]');
        localRSVPs.push({
          name: attendeeName,
          task: taskRegistered,
          timestamp: new Date()
        });
        localStorage.setItem('nextgenai_rsvps', JSON.stringify(localRSVPs));

        showToast(`تم التسجيل بنجاح! شكراً ${attendeeName}، نراك قريباً في مهمة "${taskRegistered}" 🚀`);
      }, 1200);
    });
  }

  // Recruitment / Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'جارٍ إرسال الطلب...';

      setTimeout(() => {
        const nameVal = document.getElementById('contact-name').value;
        const trackVal = document.getElementById('contact-track').value;
        const deptVal = document.getElementById('contact-dept') ? document.getElementById('contact-dept').value : 'غير محدد';

        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        contactForm.reset();

        // Clear focus floating labels
        const inputs = contactForm.querySelectorAll('.form-input');
        inputs.forEach(input => input.blur());

        // Save registration
        const localRegistrations = JSON.parse(localStorage.getItem('nextgenai_registrations') || '[]');
        localRegistrations.push({
          name: nameVal,
          track: trackVal,
          department: deptVal,
          eliteStatus: true,
          timestamp: new Date()
        });
        localStorage.setItem('nextgenai_registrations', JSON.stringify(localRegistrations));

        showToast(`أهلاً بك ${nameVal} في فريقنا النخبة! 🎉 تم تسجيل طلب انضمامك لقسم ${deptVal} بنجاح.`);
      }, 1400);
    });
  }

  // ==========================================
  // 12. Keyboard Easter Egg & Matrix Digital Rain
  // ==========================================
  const matrixCanvas = document.getElementById('matrix-canvas');
  let matrixInterval = null;
  let typedKeys = '';

  function startMatrixRain() {
    if (!matrixCanvas) return;
    matrixCanvas.style.display = 'block';
    
    const ctx = matrixCanvas.getContext('2d');
    
    // Resize canvas
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    
    const katakana = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZAI🧬🧠🛡️';
    const alphabet = katakana.split('');
    
    const fontSize = 16;
    const columns = matrixCanvas.width / fontSize;
    
    const rainDrops = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }
    
    const draw = () => {
      ctx.fillStyle = 'rgba(6, 11, 19, 0.08)'; // Space theme fading trail
      ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
      
      ctx.fillStyle = '#0f0'; // bright green neon
      ctx.font = fontSize + 'px monospace';
      
      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        
        // Randomly color cyan/orange sometimes
        if (Math.random() > 0.95) {
          ctx.fillStyle = '#f38421'; // delta orange
        } else if (Math.random() > 0.95) {
          ctx.fillStyle = '#00e1ff'; // cyber cyan
        } else {
          ctx.fillStyle = '#10b981'; // neon emerald
        }
        
        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;
        
        ctx.fillText(text, x, y);
        
        if (y > matrixCanvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };
    
    matrixInterval = setInterval(draw, 30);
    showToast('📟 تم تفعيل بيضة الفصح: نظام شفرة مصفوفة النيون! 🚀', '📟');
    
    // Stop after 8 seconds
    setTimeout(() => {
      clearInterval(matrixInterval);
      
      // Beautiful fadeout
      let fadeCount = 0;
      const fadeInterval = setInterval(() => {
        matrixCanvas.style.opacity = (1 - fadeCount / 10).toString();
        fadeCount++;
        if (fadeCount >= 10) {
          clearInterval(fadeInterval);
          matrixCanvas.style.display = 'none';
          matrixCanvas.style.opacity = '1';
        }
      }, 50);
      
    }, 8000);
  }

  // Capture keyboard key sequence
  window.addEventListener('keydown', (e) => {
    typedKeys += e.key.toLowerCase();
    
    // Keep last 7 keys to match "nextgen"
    if (typedKeys.length > 7) {
      typedKeys = typedKeys.substring(typedKeys.length - 7);
    }
    
    if (typedKeys === 'nextgen') {
      typedKeys = ''; // reset
      startMatrixRain();
    }
  });

  // Handle window resize for matrix canvas
  window.addEventListener('resize', () => {
    if (matrixCanvas && matrixCanvas.style.display === 'block') {
      matrixCanvas.width = window.innerWidth;
      matrixCanvas.height = window.innerHeight;
    }
  });

  // ==========================================
  // 13. Console Developer Welcome Artwork (Easter Egg)
  // ==========================================
  try {
    const asciiArt = `
    ███▄    █ ▓█████ ▒██   ██▒▄▄▄█████▓  ▄████ ▓█████  ███▄    █  ▄▄▄      ██▓
    ██ ▀█   █ ▓█   ▀ ▒▒ █ █ ▒░▓  ██▒ ▓▒ ██▒ ▀█▒▓█   ▀  ██ ▀█   █ ▒████▄   ▓██▒
   ▓██  ▀█ ██▒▒███   ░ ▒ █░ ░ ▒ ▓██░ ▒░▒██░▄▄▄░▒███   ▓██  ▀█ ██▒▒██  ▀█▄ ▒██▒
   ▓██▒  ▐▌██▒▒▓█  ▄ ░ █ █ ▒  ░ ▓██▓ ░ ░▓██ ▀█ ██▓█  ▄ ▓██▒  ▐▌██▒░██▄▄▄▄██░██░
   ▒██░   ▓██░░▒████▒▒██▒ ▒██▒  ▒██▒ ░  ░▒████▒▒▒████▒▒██░   ▓██░ ▓█   ▓██░██░
   ░ ▒░   ▒ ▒ ░░ ▒░ ░▒▒ ░ ░▓ ░  ▒ ░░     ░▒ ▀  ░░ ▒░ ░░ ▒░   ▒ ▒  ▒▒   ▓▒█░▓  
   ░ ░░   ░ ▒░ ░ ░  ░░ ░   ░ ░    ░        ░   ░░ ░  ░░ ░░   ░ ▒░  ▒   ▒▒ ░▒ ░
      ░   ░ ░    ░   ░ ░   ░ ░  ░        ░ ░   ░  ░       ░   ░ ░   ░   ▒   ▒ ░
            ░    ░  ░  ░   ░               ░      ░  ░          ░       ░  ░  
    `;
    
    console.log(
      `%c${asciiArt}%c\n🚀 مرحباً بك في لوحة تحكم مطوري NextGenAI! 🚀\n💡 بيضة الفصح: اكتب كلمة "nextgen" على لوحة المفاتيح أثناء تصفح الموقع لتفعيل ميزة سرية مذهلة!\n🛠️ المسؤول التقني: محمد محمود محمد شعبان`,
      'color: #0667b3; font-weight: bold; font-family: monospace;',
      'color: #f38421; font-size: 13px; font-weight: bold; font-family: "Tajawal", sans-serif;'
    );
  } catch (err) {
    // Silent console fallback
  }

});
