/* -------------- Basic interactive behaviors -------------- */

/* 1) set footer year */
document.addEventListener('DOMContentLoaded', () => {
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  // generate starfield (lightweight)
  generateStars(36);
});

/* 2) top nav links open drawers (by id) */
document.querySelectorAll('a[data-open]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    e.preventDefault();
    const id = a.getAttribute('data-open');
    openDrawer(id);
  });
});

/* 3) openDrawer helper */
function openDrawer(id){
  const el = document.getElementById(id);
  if (!el) return;
  // if already open, close it
  if (el.open) {
    el.open = false;
    return;
  }

  // decide UX: onlyOneOpen = true -> close others when opening this
  const onlyOneOpen = true; // change to false if you want multiple open at once

  if (onlyOneOpen) {
    document.querySelectorAll('.accordion[open]').forEach(d=>{
      if (d.id !== id) d.open = false;
    });
  }

  el.open = true;
  // scroll the opened drawer into view (smooth)
  setTimeout(()=> el.scrollIntoView({behavior:'smooth', block:'center'}), 150);
}

/* 4) close other nested details when opening nested (makes nested clean) */
document.addEventListener('click', function(e){
  // if a <summary> is clicked, we let native toggle happen then close others after short delay
  if (e.target.tagName.toLowerCase() === 'summary') {
    setTimeout(()=> {
      // for each top-level accordion, if open and not the clicked ancestor, close if onlyOneOpen
      // handled by openDrawer when clicking top nav; nested will remain if inside same accordion
    }, 10);
  }
});

/* 5) small star generator for background */
function generateStars(count = 30){
  const container = document.getElementById('starfield');
  if (!container) return;
  for (let i=0; i<count; i++){
    const s = document.createElement('span');
    s.className = 'star';
    const size = Math.random()*3 + 1;
    s.style.width = s.style.height = (size)+'px';
    s.style.left = (Math.random()*100)+'%';
    s.style.top = (Math.random()*100)+'%';
    s.style.opacity = (0.4 + Math.random()*0.8);
    s.style.transform = `translateY(${(Math.random()*40)-20}px)`;
    container.appendChild(s);

    // small floating animation via CSS class
  }

  // Add simple CSS for each star (inserted dynamically once)
  if (!document.getElementById('star-style')){
    const css = `
    #starfield .star {
      position: absolute;
      background: radial-gradient(circle, #fff 0%, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0.0) 60%);
      border-radius:50%;
      filter: drop-shadow(0 0 6px rgba(255,255,255,0.08));
      animation: floatStar 6s linear infinite;
    }
    @keyframes floatStar {
      0% { transform: translateY(0) scale(1); opacity: 0.6; }
      50% { transform: translateY(-10px) scale(0.9); opacity: 1; }
      100% { transform: translateY(0) scale(1); opacity: 0.6; }
    }`;
    const style = document.createElement('style');
    style.id = 'star-style';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }
}
