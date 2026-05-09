
  function animatorContador(elemento, objetivo, duracion) {
    let inicio = 0;
    let incremento = objetivo / (duracion / 16);

    let timer = setInterval (() => {
      inicio += incremento;
      if (inicio >= objetivo) {
        inicio = objetivo;
        clearInterval(timer)
      }

      //formatear numero
      if (objetivo >=1000000) {
        elemento.textContent = ( inicio / 1000000).toFixed(1) + 'M';
      } else if (objetivo >= 1000) {
        elemento.textContent = (inicio / 1000).toFixed(0) + 'K';
      } else {
        elemento.textContent = Math.floor(inicio);
      }
    }, 16);
  }

  //Detectar cuando el elemento es visisble
  const observer = new IntersectionObserver((entries)  => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const objetivo = parseInt(el.getAttribute('data-target'));
        animatorContador(el, objetivo, 2000);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5});

  //Aplicar a todos los numeros
  document.querySelectorAll('.stat-numero').forEach(el => {
    observer.observe(el);
  });

  // Lightbox CORREGIDO
  document.querySelectorAll('.galeria-item img').forEach(img => {
    img.addEventListener('click', function() {
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightboxImg');
    if (lb && lbImg) {
        lbImg.src = this.src;
        lb.classList.add('active');
    }
    });
  });

  function cerrarLightbox() {
    const lb = document.getElementById('lightbox');
    if (lb) lb.classList.remove('active');
  }

  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target.id === "lightbox") {
            cerrarLightbox();
        }
    });
  }

  // Cerrar con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarLightbox();
  });


// ====================== REVEAL + NAVBAR + MENÚ ======================
  const reveals = document.querySelectorAll('.reveal');

  const observerReveal = new IntersectionObserver((entries) =>{
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1});

  reveals.forEach(el => observerReveal.observe(el));

  //NABVAR SCROLLL
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }
  });

  //HAMBUERGUER MENU
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('nav-mobile');

  if (hamburger && navMobile) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      navMobile.classList.toggle('open');
    });
  }

  // Cerrar al hacer clic en enlaces
document.querySelectorAll('.nav-mobile a').forEach(link => {
  link.addEventListener('click', cerrarMenu);
});

// Cerrar al hacer clic fuera
document.addEventListener('click', (e) => {
  if (navMobile && navMobile.classList.contains('open') && !e.target.closest('#navbar')) {
    cerrarMenu();
  }
});

  function cerrarMenu() {
  if (navMobile) {  // ✅ Validar antes de usar
    navMobile.classList.remove('open');
  }
}
//  =====================CARRUSEL=========================  //
  let currentIndex = 0;
  const track = document.getElementById('carruselTrack');
  const slides = Array.from(track.children);
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carruselDots');

  function createDots() {
    dotsContainer.innerHTML = '';
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
  }

  function updatesDots() {
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updatesDots();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    goToSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(currentIndex);
  }

  //EVENTOS
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  //Auto slide cada 5 segundos
  let autoSlide = setInterval(nextSlide, 5000);

  //Pausar al mover el mouse
  const carruselConteiner = document.querySelector('.carrusel-container');
  carruselConteiner.addEventListener('mouseenter', () => clearInterval(autoSlide));
  carruselConteiner.addEventListener('mouseleave', () => {
    autoSlide = setInterval(nextSlide, 5000);
  });

  //Inicializar
  createDots();

  function ajustarImagenesCarrusel() {
    const imagenes = document.querySelectorAll('.carrusel-track img');

    imagenes.forEach(img => {
      img.addEventListener('load', function() {
        const esVertical = this.naturalHeight > this.naturalWidth;

        if(esVertical) {
          this.style.objectFit = 'contain';
          this.style.background = '#0a0a0a';
          console.log('Imagen vertical detectada');
        } else {
          this.style.objectFit = 'cover';
          this.style.background = 'transparent';
          console.log('Imagen horizontal detectda');
        }
      });

        if(img.complete) {
          const esVertical = img.naturalHeight > img.naturalWidth;
          if (esVertical) {
            img.style.objectFit = 'contain';
            img.style.background = '#0a0a0a';
          } else {
            img.style.objectFit = 'cover';
            img.style.background = 'transparent';
          }
        }
    });
  }

  document.addEventListener('DOMContentLoaded', ajustarImagenesCarrusel);

