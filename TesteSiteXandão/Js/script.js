/* main.js - comportamento do site */

/* ----------------------
   FUNÇÃO: debounce (pequena utilidade)
   ---------------------- */
function debounce(fn, wait = 10) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

/* ----------------------
   HERO: parallax suave e fade (não some completamente)
   ---------------------- */
function heroEffect() {
  const hero = document.querySelector('.hero-content');
  if (!hero) return;

  const scroll = window.scrollY;
  // controla quanto desaparece no topo (min opacidade = 0.28)
  const opacity = Math.max(1 - scroll / 450, 0.28);
  const translate = Math.min(scroll / 6, 80);

  hero.style.opacity = opacity;
  hero.style.transform = `translateY(${translate}px)`;
}

/* ----------------------
   HEADER: adiciona classe scrolled para encolher
   ---------------------- */
function handleHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;
  if (window.scrollY > 40) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
}

/* ----------------------
   OBSERVER: animaçōes quando elementos entram em view
   ---------------------- */
const appearOptions = { threshold: 0.18 };
const appearObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('show');
    obs.unobserve(entry.target);
  });
}, appearOptions);

/* inicia observers em elementos com classes fade-up / project-block */
function initObservers() {
  document.querySelectorAll('.fade-up, .project-block, .intro-card').forEach(el => {
    appearObserver.observe(el);
  });
}

/* ----------------------
   SMOOTH SCROLL para links internos (se existirem hash)
   ---------------------- */
function initSmoothLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const headerOffset = document.getElementById('site-header')?.offsetHeight || 90;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ----------------------
   INICIALIZA GRÁFICOS APEXCHARTS (quando containers presentes)
   - barras finas, não ocupam tela inteira
   ---------------------- */
function initCharts() {
  // MABEL
  const elM = document.querySelector('#chart-mabel');
  if (elM && typeof ApexCharts !== 'undefined') {
    const optionsM = {
      chart: { type: 'bar', height: 200, toolbar: { show: false } },
      series: [{ name: 'Progresso', data: [22, 48, 76, 100] }],
      xaxis: { categories: ['Planejamento', 'Dev', 'Testes', 'Entrega'], labels: { style: { fontSize: '12px' } } },
      plotOptions: { bar: { columnWidth: '28%', borderRadius: 6 } },
      dataLabels: { enabled: false },
      grid: { show: false },
      tooltip: { theme: 'light' },
      colors: ['#2e8b57']
    };
    const chartM = new ApexCharts(elM, optionsM);
    chartM.render();
  }

  // PTQA
  const elP = document.querySelector('#chart-ptqa');
  if (elP && typeof ApexCharts !== 'undefined') {
    const optionsP = {
      chart: { type: 'bar', height: 200, toolbar: { show: false } },
      series: [{ name: 'Desempenho', data: [30, 62, 86, 100] }],
      xaxis: { categories: ['Análise', 'Codificação', 'Testes', 'Conclusão'], labels: { style: { fontSize: '12px' } } },
      plotOptions: { bar: { columnWidth: '28%', borderRadius: 6 } },
      dataLabels: { enabled: false },
      grid: { show: false },
      tooltip: { theme: 'light' },
      colors: ['#006400']
    };
    const chartP = new ApexCharts(elP, optionsP);
    chartP.render();
  }
}

/* ----------------------
   BOTÕES: micro animação (scale) - progressive enhancement
   ---------------------- */
function initButtonHover() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => btn.style.transform = 'translateY(-4px) scale(1.02)');
    btn.addEventListener('mouseleave', () => btn.style.transform = '');
  });
}

/* ----------------------
   INIT - roda quando DOM estiver pronto
   ---------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initObservers();
  initSmoothLinks();
  initCharts();
  initButtonHover();

  // garante que elementos .intro-card aparecam
  document.querySelectorAll('.intro-card, .project-block, .fade-up').forEach(el => {
    appearObserver.observe(el);
  });
});

/* event listeners de scroll (debounced) */
window.addEventListener('scroll', debounce(() => {
  heroEffect();
  handleHeader();
}, 8));

/* initial run */
heroEffect();
handleHeader();
