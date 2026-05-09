/* ============================================================
   EMPHASYS IT — script.js (FIXED)
   ============================================================ */

$(function () {
  /* ---- Sticky header ---- */
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".site-header").addClass("sticky-nav");
    } else {
      $(".site-header").removeClass("sticky-nav");
    }
  });

  /* ---- Counter animation ---- */
  function animateCounter($el) {
    const target = parseInt($el.data("target"), 10);
    const duration = 1600;
    const step = Math.ceil(target / (duration / 16));
    let current = 0;

    const timer = setInterval(function () {
      current = Math.min(current + step, target);
      $el.text(current);
      if (current >= target) clearInterval(timer);
    }, 16);
  }

  const counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !$(entry.target).data("counted")) {
          $(entry.target).data("counted", true);
          animateCounter($(entry.target));
        }
      });
    },
    { threshold: 0.5 },
  );

  $(".counter").each(function () {
    counterObserver.observe(this);
  });

  /* ---- Scroll reveal ---- */
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          $(entry.target).addClass("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  const revealTargets = [
    ".usp-card",
    ".case-studies-section",
    ".service-card",
    ".sector-card",
    ".problem-card",
    ".solution-card",
    ".blog-card",
    ".team-card",
    ".why-tag",
    ".hero-title",
    ".hero-subtitle",
    ".hero-cta",
    ".hero-stats",
    ".hero-badges",
    ".trust-section",
    ".cta-section",
    ".logo-slider-section",
    ".site-footer",
  ];

  revealTargets.forEach(function (selector) {
    $(selector)
      .addClass("reveal")
      .each(function (i) {
        const delayClass = Math.min(i + 1, 4);
        $(this).addClass("reveal-delay-" + delayClass);
        revealObserver.observe(this);
      });
  });

  /* ---- Case studies carousel ---- */
  $(".case-carousel-btn").on("click", function () {
    const target = $(this).data("bs-target");
    const slide = $(this).data("bs-slide");
    const el = document.querySelector(target);
    if (!el) return;

    const carousel = bootstrap.Carousel.getOrCreateInstance(el);
    slide === "prev" ? carousel.prev() : carousel.next();
  });

  /* ---- Hero particles ---- */
  const container = document.getElementById("particles");
  if (container) {
    const canvas = document.createElement("canvas");
    canvas.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;opacity:0.4;";
    container.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    let W,
      H,
      particles = [];

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function Particle() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.r = Math.random() * 1.5 + 0.5;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.alpha = Math.random() * 0.6 + 0.2;
    }

    function initParticles() {
      particles = [];
      const count = Math.floor((W * H) / 18000);
      for (let i = 0; i < count; i++) particles.push(new Particle());
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(function (p) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45,219,164,${p.alpha})`;
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    window.addEventListener("resize", () => {
      resize();
      initParticles();
    });

    resize();
    initParticles();
    draw();
  }

  /* ---- Mobile nav close ---- */
  $(".navbar-nav .nav-link:not(.dropdown-toggle)").on("click", function () {
    const $collapse = $("#navbarMain");
    if ($collapse.length && $collapse.hasClass("show")) {
      $collapse.collapse("hide");
    }
  });

  /* ---- Logo marquee pause ---- */
  $(".logo-marquee")
    .on("mouseenter", function () {
      $(this)
        .find(".logo-marquee__track")
        .css("animation-play-state", "paused");
    })
    .on("mouseleave", function () {
      $(this)
        .find(".logo-marquee__track")
        .css("animation-play-state", "running");
    });
});

/* ---- Owl Carousel ---- */
$(".case-studies-section .owl-carousel").owlCarousel({
  loop: true,
  margin: 24,
  nav: true,
  dots: false,
  autoplay: true,
  smartSpeed: 800,
  autoplayTimeout: 8000,
  navText: [
    '<img src="images/carousel-arrow-left.webp" alt="Previous" class="owl-nav-img">',
    '<img src="images/carousel-arrow-right.webp" alt="Next" class="owl-nav-img">',
  ],
  responsive: {
    0: {
      items: 1,
      stagePadding: 30,
      margin: 12,
    },
    576: {
      items: 1,
      stagePadding: 60,
      margin: 16,
    },
    768: {
      items: 1,
      stagePadding: 100,
      margin: 20,
    },
    992: {
      items: 2, // 2 full items on tablet/small desktop
      stagePadding: 120, // peek size
      margin: 20,
    },
    1200: {
      items: 2, // 2 full items on desktop
      stagePadding: 180, // bigger peek
      margin: 24,
    },
    1400: {
      items: 2,
      stagePadding: 300, // even bigger peek on wide screens
      margin: 24,
    },
  },
});

$(".logo-slider-section .owl-carousel").owlCarousel({
  loop: true,
  margin: 40,
  nav: false,
  dots: false,
  autoplay: true,
  autoplayHoverPause: true,
  autoplayTimeout: 3000,
  autoplaySpeed: 3000,
  smartSpeed: 3000,
  slideTransition: "linear",
  mouseDrag: false,
  responsive: {
    0: { items: 2 },
    768: { items: 4 },
    1200: { items: 6 },
  },
});

/* ---- SAFE DOM EVENTS ---- */
document.addEventListener("DOMContentLoaded", function () {
  /* ---- Search ---- */
  const trigger = document.getElementById("searchTrigger");
  const overlay = document.getElementById("searchOverlay");
  const closeBtn = document.getElementById("searchClose");
  const input = document.getElementById("searchInput");

  if (trigger && overlay && closeBtn && input) {
    trigger.addEventListener("click", () => {
      overlay.classList.add("active");
      closeBtn.classList.add("active");
      setTimeout(() => input.focus(), 200);
    });

    closeBtn.addEventListener("click", () => {
      overlay.classList.remove("active");
      closeBtn.classList.remove("active");
      input.value = "";
    });

    overlay.addEventListener("click", (e) => {
      if (!e.target.closest(".search-box")) {
        overlay.classList.remove("active");
        closeBtn.classList.remove("active");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") overlay.classList.remove("active");
    });
  }

  /* ---- Navbar toggler ---- */
  const navToggler = document.getElementById("navToggler");
  const navCollapse = document.getElementById("navbarCollapse");

  if (navToggler && navCollapse) {
    navToggler.addEventListener("click", function () {
      this.classList.toggle("is-open");
    });

    navCollapse.addEventListener("hidden.bs.collapse", () => {
      navToggler.classList.remove("is-open");
    });

    navCollapse.addEventListener("shown.bs.collapse", () => {
      navToggler.classList.add("is-open");
    });
  }

  /* ---- Trust stats stagger animation ---- */
  const trustSection = document.querySelector(".trust-stats-container");

  if (trustSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll(".trust-stat");

            items.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add("visible");

                const counter = el.querySelector(".counter");
                if (counter) {
                  const target = parseInt(counter.dataset.target);
                  let count = 0;
                  const step = target / 40;

                  const interval = setInterval(() => {
                    count += step;
                    if (count >= target) {
                      count = target;
                      clearInterval(interval);
                    }
                    counter.textContent = Math.floor(count);
                  }, 30);
                }
              }, i * 300);
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(trustSection);
  }
});

const wrap = document.querySelector(".topics-dropdown-wrap");
const toggleBtn = document.getElementById("topicsToggle");
const topicsList = document.getElementById("topicsList");
const selected = document.getElementById("selectedTopic");

// Open / close
toggleBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  wrap.classList.toggle("open");
});

// Select item
topicsList.addEventListener("click", (e) => {
  const item = e.target.closest(".topic-item");
  if (!item) return;

  // Update active state
  topicsList
    .querySelectorAll(".topic-item")
    .forEach((i) => i.classList.remove("active"));
  item.classList.add("active");

  // Update button label
  selected.textContent = item.dataset.value;

  // Close menu
  wrap.classList.remove("open");

  // ↓ Fire your filter logic here
  console.log("Selected topic:", item.dataset.value);
});

// Close when clicking outside
document.addEventListener("click", () => wrap.classList.remove("open"));
