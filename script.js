document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  lucide.createIcons();

  /* ==========================================================================
     THEME TOGGLE SYSTEM
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Retrieve theme preference from local storage, default to dark
  const currentTheme = localStorage.getItem('theme') || 'dark';
  htmlElement.setAttribute('data-theme', currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    const activeTheme = htmlElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  /* ==========================================================================
     MOBILE NAVIGATION MENU
     ========================================================================== */
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const isOpen = mobileMenu.classList.contains('open');
    
    // Change menu icon to close icon dynamically
    const icon = mobileMenuToggle.querySelector('i');
    if (isOpen) {
      icon.setAttribute('data-lucide', 'x');
    } else {
      icon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
  });

  // Close mobile menu when clicking any nav link
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      const icon = mobileMenuToggle.querySelector('i');
      icon.setAttribute('data-lucide', 'menu');
      lucide.createIcons();
    });
  });

  /* ==========================================================================
     ACTIVE NAVIGATION LINK HIGHLIGHT ON SCROLL
     ========================================================================== */
  const sections = document.querySelectorAll('header, section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 200)) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });

    // Make navbar sticky with shadow on scroll
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
      navbar.style.boxShadow = 'var(--glass-shadow)';
      navbar.style.padding = '0.5rem 0';
    } else {
      navbar.style.boxShadow = 'none';
      navbar.style.padding = '0px'; // Resets to base CSS padding
    }
  });

  /* ==========================================================================
     SKILLS FILTER
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('fade-out');
          card.classList.add('fade-in');
          card.style.display = 'flex';
        } else {
          card.classList.remove('fade-in');
          card.classList.add('fade-out');
          // Delay display change to match transition fade
          setTimeout(() => {
            if (card.classList.contains('fade-out')) {
              card.style.display = 'none';
            }
          }, 300);
        }
      });
    });
  });

  /* ==========================================================================
     PROJECT DETAILS MODAL SYSTEM
     ========================================================================== */
  const projectCards = document.querySelectorAll('.project-card');
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalContent = document.getElementById('modal-dynamic-content');

  // Database of detailed project descriptions
  const projectsData = {
    exmak: {
      badge: 'Capstone Project',
      title: 'ExMak – Web-based Examination Result Management System',
      date: 'Aug 2025 – Mar 2026',
      description: 'ExMak is a capstone project focused on centralizing the computation of examination results. The web-based application compiles, computes, and stores exam outcomes, serving as an essential tool to eliminate arithmetic errors and administrative delays.',
      highlights: [
        'Client-Focused: Specially developed for and actively used by the Schools Division Office (SDO) of Makati.',
        'Data Centralization: Reduced manual record-handling times by 70% and secured student exam indices.',
        'Calculations Module: Automated average formulas, grade weight systems, and statistical distributions.',
        'Development Framework: Structured using modular programming and database normalization patterns.'
      ],
      techStack: ['HTML5', 'Vanilla CSS', 'JavaScript', 'SQL & Database Design', 'Agile Methodology']
    },
    hotel: {
      badge: 'Academic Project',
      title: 'Hotel Reservation System',
      date: 'Completed 2023',
      description: 'An improved Hotel Reservation System that integrates structured C++ models with persistent file handling. Emphasizes an engaging user interface and high system reliability.',
      highlights: [
        'Enhanced User Interface: Crafted a visually driven console interface featuring embedded mock picture-displays and design boundaries.',
        'Persistence: Integrated full text/file-based database functionality, storing booking details, guest accounts, and room statuses.',
        'Input Guarding: Developed secure input sanitizations in C++ to prevent file corruptions and invalid queries.',
        'Availability Computations: Implemented automatic checks for double-bookings and dynamic room pricing algorithms.'
      ],
      techStack: ['C++', 'File-based Database', 'Object-Oriented Programming (OOP)']
    },
    airlines: {
      badge: 'Course Work',
      title: 'Airlines Reservation System',
      date: 'Completed 2022',
      description: 'Built as a secondary programmer for a computer science requirement, this Airlines Reservation System mimics terminal-based transactional environments used by airline ticketing agents.',
      highlights: [
        'Imitation UI: Used Windows command-line console coloring, clear-screen buffers, and neat ASCII tables to mock user transactions.',
        'Core Logic: Programmed flight selection paths, ticket class conversions, seat booking layouts, and dynamic invoice generation.',
        'Refactoring: Conducted extensive functional programming optimizations, simplifying overall program control flows.'
      ],
      techStack: ['C++', 'Command Prompt (CMD) UI', 'Structured Programming']
    }
  };

  const openProjectModal = (projectId) => {
    const data = projectsData[projectId];
    if (!data) return;

    // Build the dynamic HTML
    let tagsHTML = '';
    data.techStack.forEach(tech => {
      tagsHTML += `<span>${tech}</span>`;
    });

    let highlightsHTML = '';
    data.highlights.forEach(point => {
      highlightsHTML += `<li>${point}</li>`;
    });

    modalContent.innerHTML = `
      <div class="modal-project-header">
        <span class="modal-project-badge">${data.badge}</span>
        <h3 class="modal-project-title">${data.title}</h3>
        <p class="modal-project-date"><i data-lucide="calendar" style="width: 14px; height: 14px; display: inline; vertical-align: middle; margin-right: 4px;"></i> ${data.date}</p>
      </div>

      <div class="modal-project-section">
        <h4>Overview</h4>
        <p>${data.description}</p>
      </div>

      <div class="modal-project-section">
        <h4>Key Accomplishments</h4>
        <ul class="modal-project-list">
          ${highlightsHTML}
        </ul>
      </div>

      <div class="modal-project-section">
        <h4>Technologies Used</h4>
        <div class="modal-project-tags">
          ${tagsHTML}
        </div>
      </div>
    `;

    // Re-trigger Lucide icon loader in the dynamic content
    lucide.createIcons();

    // Show modal
    projectModal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Stop background scrolling
  };

  const closeProjectModal = () => {
    projectModal.classList.remove('open');
    document.body.style.overflow = 'auto'; // Enable scrolling
  };

  // Add click events to project cards
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });

  // Modal events
  modalCloseBtn.addEventListener('click', closeProjectModal);
  
  // Close on backdrop click
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      closeProjectModal();
    }
  });

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('open')) {
      closeProjectModal();
    }
  });

  /* ==========================================================================
     CONTACT FORM CONTROLLER
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.btn-submit');
    const submitBtnText = submitBtn.querySelector('span');
    const originalText = submitBtnText.textContent;

    // Visually show submitting status
    submitBtn.style.pointerEvents = 'none';
    submitBtnText.textContent = 'Sending...';

    // Simulate sending delay
    setTimeout(() => {
      // Reset button
      submitBtn.style.pointerEvents = 'auto';
      submitBtnText.textContent = originalText;

      // Show toast notification
      toast.classList.add('show');

      // Clear form inputs
      contactForm.reset();

      // Hide toast notification after 4 seconds
      setTimeout(() => {
        toast.classList.remove('show');
      }, 4000);

    }, 1200);
  });
});
