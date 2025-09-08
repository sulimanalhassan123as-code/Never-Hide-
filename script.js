// Drawer toggle (for your menu button)
const menuBtn = document.querySelector(".menu-btn");
const drawer = document.querySelector(".drawer");
const overlay = document.querySelector(".drawer-overlay");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    drawer.classList.toggle("active");
    overlay.classList.toggle("active");
  });
}

if (overlay) {
  overlay.addEventListener("click", () => {
    drawer.classList.remove("active");
    overlay.classList.remove("active");
  });
}

// Star effect on click
document.addEventListener("click", (e) => {
  const star = document.createElement("div");
  star.classList.add("star");
  star.style.left = `${e.pageX}px`;
  star.style.top = `${e.pageY}px`;
  document.body.appendChild(star);

  setTimeout(() => {
    star.remove();
  }, 1000);
});
