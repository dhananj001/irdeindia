/* -------------------------------------------------------------
 * IRDE INDIA - REVAMPED INTERACTIVE SCRIPT
 * Clean, Vanilla JavaScript for Premium UI Interactions
 * ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initSmoothScroll();
  initTabs();
  initAimsSubtabs();
  initPortfolio();
  initLightbox();
  initFacebookWidget();
});

/* -------------------------------------------------------------
 * NAVBAR SCROLL STATE
 * ------------------------------------------------------------- */
function initNavbarScroll() {
  const header = document.querySelector('.main-header');
  const scrollThreshold = 50;

  const toggleScrollClass = () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', toggleScrollClass);
  toggleScrollClass(); // Initial run
}

/* -------------------------------------------------------------
 * MOBILE NAVIGATION MENU
 * ------------------------------------------------------------- */
function initMobileMenu() {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (!navToggle || !navLinks) return;

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('active');
    });
  });
}

/* -------------------------------------------------------------
 * SMOOTH SCROLL WITH ACTIVE STATES
 * ------------------------------------------------------------- */
function initSmoothScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const onScroll = () => {
    const scrollPos = window.scrollY + 160;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.parentElement.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.parentElement.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll);
}

/* -------------------------------------------------------------
 * VISION / MISSION / AIMS TABS
 * ------------------------------------------------------------- */
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      // Update active button
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update active content
      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === targetId) {
          content.classList.add('active');
        }
      });
    });
  });
}

/* -------------------------------------------------------------
 * AIMS SUBTABS CATEGORIZATION
 * ------------------------------------------------------------- */
const aimsData = {
  agri: [
    { id: 1, text: "To undertake research activities in Agriculture and Allied Sciences." },
    { id: 6, text: "To develop technology for efficient utilisation of rainfall, surface and underground water and water conservation practices." },
    { id: 9, text: "To make farming of small and marginal farmers viable by introducing co-op farming, establishing farmer producer companies." },
    { id: 11, text: "To study and recommend to appropriate authority the facility for harvesting, grading, storage and marketing of agri. produce for better pricing." },
    { id: 12, text: "To study and develop simple and easy technique for processing of perishable agriculture produce so as to have additional shelf life and value." },
    { id: 23, text: "To purchase / take land of farmers, Trust, NGO's, Govts. etc. on lease for carrying out Research/ education in Agriculture and Animal Sciences and to take Result Demonstration Plots." },
    { id: 25, text: "To undertake consulting work related to Agriculture." }
  ],
  social: [
    { id: 2, text: "To undertake survey activities for State, Central Govt., Private Bodies, Corporates, Banks etc; related to Agriculture and Rural Population / Development." },
    { id: 8, text: "To suggest programmes and policies for timely and sufficient financial support to agriculture and allied activities by financial institutions." },
    { id: 10, text: "To form self help groups and link them to banks." },
    { id: 14, text: "To assist and take assistance of various research, educational, training, financial, social, economic institutions, agri. colleges and Universities to fulfill the objectives of the Institute of Rural Development and Education." },
    { id: 16, text: "To improve physical, mental, educational, economic, psychological, social and eternal development of women, children and youths." },
    { id: 17, text: "To assist in all respect physically and mentally challenged persons, old and destitute people." },
    { id: 26, text: "The Beneficiaries of the Institute (IRDE) are a Section of the public and not specific individuals." }
  ],
  edu: [
    { id: 4, text: "To start / run training centres, Educational Institutes viz. School, College, University etc. and distance education learning centres." },
    { id: 18, text: "To start centres for moral and cultural upliftment of rural society." },
    { id: 19, text: "To establish and run library, study centres and students hostels." },
    { id: 21, text: "To publish literature on various subjects including rural / agriculture, policies, procedures etc., survey reports, evaluation reports etc." },
    { id: 22, text: "To run the programmes of Bahishal Shikshan Mandal, Savitribai Phule Pune University, Pune." }
  ],
  infra: [
    { id: 3, text: "To make maximum use of Information Technology." },
    { id: 5, text: "To find out alternative sources of energy." },
    { id: 7, text: "To propose changes and modifications in the policies and programmes of State and Central Govt., local governing bodies, so far as Rural Development and Education is concerned." },
    { id: 13, text: "To represent the Institute of Rural Development and Education in the various Central, State Govt., Semi Govt., Public and Private, economic and social committees constituted at International, National, State and local levels." },
    { id: 15, text: "To encourage Agriculture Tourism." },
    { id: 20, text: "To accept donations, financial aid, interest free deposits from Indian and Foreign residents and also Non Resident Indians and to give donations to needy persons and Social Organisations, Educational Institutes etc." },
    { id: 24, text: "To carry out surveys, project preparation, implementation, planning and evaluation of schemes and projects of the State and / or Central Govt., Private bodies." }
  ]
};

function initAimsSubtabs() {
  const aimsButtons = document.querySelectorAll('.aims-cat-btn');
  const aimsList = document.getElementById('aimsList');

  if (!aimsList) return;

  const renderAims = (category) => {
    aimsList.innerHTML = '';
    
    let items = [];
    if (category === 'all') {
      items = [
        ...aimsData.agri,
        ...aimsData.social,
        ...aimsData.edu,
        ...aimsData.infra
      ];
      items.sort((a, b) => a.id - b.id);
    } else {
      items = aimsData[category] || [];
    }
    
    items.forEach(aim => {
      const div = document.createElement('div');
      div.className = 'aim-item';
      div.innerHTML = `
        <div class="aim-num">${aim.id}</div>
        <div class="aim-text">${aim.text}</div>
      `;
      aimsList.appendChild(div);
    });
  };

  aimsButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      aimsButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderAims(btn.getAttribute('data-cat'));
    });
  });

  // Render initial
  renderAims('all');
}

/* -------------------------------------------------------------
 * IMPACT PORTFOLIO IMAGES GENERATION
 * ------------------------------------------------------------- */
const basePath = './assets/images/';

const portfolioImages = {
  scientists: [
    { src: `${basePath}1.jpg`, title: 'Agricultural Scientists Interaction', desc: 'Farmers and Scientists Meetup' },
    { src: `${basePath}2.jpg`, title: 'Agri Innovation Seminar', desc: 'Expert Lecture on Soil Health' },
    { src: `${basePath}3.jpg`, title: 'Scientists Workshop', desc: 'Field Demonstration Session' }
  ],
  education: Array.from({ length: 13 }, (_, i) => ({
    src: `${basePath}edu_${i + 1}.jpg`,
    title: `Education Initiative ${i + 1}`,
    desc: 'Bahishal Shikshan Mandal Lecture Series'
  })),
  citizens: [
    { src: `${basePath}1(1).jpg`, title: 'Senior Citizen Forum', desc: 'Will Writing Program' },
    { src: `${basePath}2(1).jpg`, title: 'Dignitaries Address', desc: 'Inaugural Session' },
    { src: `${basePath}3(1).jpg`, title: 'Advisory Panel Meet', desc: 'Planning and Strategy' },
    ...Array.from({ length: 10 }, (_, i) => ({
      src: `${basePath}${i + 4}.jpg`,
      title: `Senior Citizen Session ${i + 1}`,
      desc: 'Will & Trust Education Series'
    }))
  ],
  villagers: [
    { src: `${basePath}1(2).jpg`, title: 'Villagers Assembly', desc: 'Community Training Program' },
    { src: `${basePath}2(2).jpg`, title: 'Farmer Interaction', desc: 'Soya Cultivation Program' },
    { src: `${basePath}3(2).jpg`, title: 'Women SHG Training', desc: 'Financial Literacy Shibir' },
    { src: `${basePath}4(1).jpg`, title: 'Villagers Discussion', desc: 'Water Management Meet' },
    { src: `${basePath}5(1).jpg`, title: 'Agricultural Training', desc: 'Modern Farming Practices' },
    { src: `${basePath}6(1).jpg`, title: 'Rural Development Meet', desc: 'Empowerment Strategy' }
  ],
  villages: [
    { src: `${basePath}1(3).jpg`, title: 'Village Survey', desc: 'Field Inspection' },
    { src: `${basePath}2(3).jpg`, title: 'Water Conservation Site', desc: 'Check Dam Project' },
    { src: `${basePath}3(3).jpg`, title: 'Soybean Trial Plot', desc: 'Crop Yield Inspection' },
    { src: `${basePath}4(2).jpg`, title: 'Soil Testing Demo', desc: 'Health Card Initiative' },
    { src: `${basePath}5(2).jpg`, title: 'Horticulture Training', desc: 'Fruit Crop Cultivation' },
    { src: `${basePath}6(2).jpg`, title: 'Community Forestation', desc: 'Tree Plantation Drive' },
    { src: `${basePath}7(1).jpg`, title: 'Village Action Plan', desc: 'Local Leaders Meet' },
    { src: `${basePath}8(1).jpg`, title: 'Cattle Health Camp', desc: 'Animal Science Shibir' },
    { src: `${basePath}9(1).jpg`, title: 'Micro Irrigation Trial', desc: 'Drip System Installation' },
    { src: `${basePath}10(1).jpg`, title: 'Organic Manure Prep', desc: 'Composting Workshop' },
    { src: `${basePath}11(1).jpg`, title: 'Fodder Development', desc: 'Silage Making Demo' },
    { src: `${basePath}12(1).jpg`, title: 'Rainwater Harvesting', desc: 'Rooftop System Demo' },
    { src: `${basePath}13(1).jpg`, title: 'Rural Sanitation Camp', desc: 'Hygiene & Cleanliness' },
    { src: `${basePath}14.jpg`, title: 'Local Seeds Exhibition', desc: 'Biodiversity Preservation' },
    { src: `${basePath}15.jpg`, title: 'Self Help Group Bazaar', desc: 'Marketing Rural Crafts' },
    { src: `${basePath}16.jpg`, title: 'Biogas Plant Demo', desc: 'Renewable Energy Shibir' },
    { src: `${basePath}17.jpg`, title: 'Farm Pond Inspection', desc: 'Surface Water Storage' },
    { src: `${basePath}18.jpg`, title: 'Digital Literacy Center', desc: 'IT Training in School' }
  ]
};

function initPortfolio() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioGrid = document.getElementById('portfolioGrid');

  if (!portfolioGrid) return;

  const renderPortfolio = (category) => {
    portfolioGrid.innerHTML = '';
    
    let images = [];
    if (category === 'all') {
      images = [
        ...portfolioImages.scientists,
        ...portfolioImages.education.slice(0, 3),
        ...portfolioImages.citizens.slice(0, 3),
        ...portfolioImages.villagers.slice(0, 3),
        ...portfolioImages.villages.slice(0, 3)
      ];
    } else {
      images = portfolioImages[category] || [];
    }

    images.forEach(img => {
      const item = document.createElement('div');
      item.className = 'portfolio-item';
      item.setAttribute('data-src', img.src);
      item.setAttribute('data-title', img.title);
      item.innerHTML = `
        <img src="${img.src}" alt="${img.title}" loading="lazy">
        <div class="portfolio-overlay">
          <div class="portfolio-info">
            <h5>${img.title}</h5>
            <span>${img.desc}</span>
          </div>
        </div>
      `;
      portfolioGrid.appendChild(item);
    });

    // Re-bind Lightbox events to new elements
    bindLightboxEvents();
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPortfolio(btn.getAttribute('data-filter'));
    });
  });

  // Render all initially
  renderPortfolio('all');
}

/* -------------------------------------------------------------
 * LIGHTBOX MODAL SYSTEM
 * ------------------------------------------------------------- */
let lightboxModal;
let lightboxImg;
let lightboxCaption;

function initLightbox() {
  // Create Modal element programmatically
  lightboxModal = document.createElement('div');
  lightboxModal.className = 'modal';
  lightboxModal.id = 'lightboxModal';
  lightboxModal.innerHTML = `
    <div class="modal-content-container">
      <button class="modal-close" id="lightboxClose">&times;</button>
      <img src="" alt="" class="modal-img" id="lightboxImg">
      <div class="modal-caption" id="lightboxCaption"></div>
    </div>
  `;
  document.body.appendChild(lightboxModal);

  lightboxImg = document.getElementById('lightboxImg');
  lightboxCaption = document.getElementById('lightboxCaption');

  const closeBtn = document.getElementById('lightboxClose');
  closeBtn.addEventListener('click', closeLightbox);
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });

  // Bind close on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

function bindLightboxEvents() {
  const triggerElements = document.querySelectorAll('.portfolio-item, .lightbox-trigger');
  triggerElements.forEach(elem => {
    elem.addEventListener('click', () => {
      const src = elem.getAttribute('data-src');
      const title = elem.getAttribute('data-title') || '';
      openLightbox(src, title);
    });
  });
}

function openLightbox(src, title) {
  if (!lightboxModal || !lightboxImg) return;
  lightboxImg.src = src;
  lightboxCaption.textContent = title;
  lightboxModal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Lock background scroll
}

function closeLightbox() {
  if (!lightboxModal) return;
  lightboxModal.classList.remove('active');
  document.body.style.overflow = ''; // Unlock background scroll
}

/* -------------------------------------------------------------
 * FACEBOOK WIDGET RESPONSIVENESS (DYNAMIC SCALING)
 * ------------------------------------------------------------- */
function initFacebookWidget() {
  const container = document.querySelector('.facebook-widget');
  const iframe = container ? container.querySelector('iframe') : null;
  if (!container || !iframe) return;

  const adjustScale = () => {
    const containerWidth = container.getBoundingClientRect().width;
    const scale = containerWidth / 500;
    
    iframe.style.width = '500px';
    iframe.style.height = '650px';
    iframe.style.transform = `scale(${scale})`;
    iframe.style.transformOrigin = 'top left';
    
    // Dynamically adjust the container's height based on scaled iframe
    container.style.height = `${650 * scale}px`;
  };

  window.addEventListener('resize', adjustScale);
  window.addEventListener('load', adjustScale);
  adjustScale();
}

