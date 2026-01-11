/* SCROLL ANIMATIONS */
const elements = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.15 });

elements.forEach(el => observer.observe(el));

/* THEME TOGGLE */
const toggle = document.querySelector('.theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme) body.setAttribute('data-theme', savedTheme);

toggle.addEventListener('click', () => {
  const theme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
});

/* PARTICLES */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

let particles = [];
const count = 80;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

for (let i = 0; i < count; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(255,255,255,0.4)';

  particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animate);
}
animate();


/* HERO PARALLAX GLOW */
const glow = document.querySelector('.hero-glow');

document.addEventListener('mousemove', e => {
  if (!glow) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 60;
  const y = (e.clientY / window.innerHeight - 0.5) * 60;
  glow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
});
