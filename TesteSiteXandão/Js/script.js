// Efeito de desaparecer suave no fundo (hero)
window.addEventListener("scroll", () => {
  const heroContent = document.querySelector(".hero-content");
  if (!heroContent) return;

  const scrollY = window.scrollY;
  const opacity = Math.max(1 - scrollY / 400, 0.3);
  heroContent.style.opacity = opacity;
});

// Animação de entrada dos blocos ao rolar
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

document.querySelectorAll(".projeto").forEach(proj => observer.observe(proj));
