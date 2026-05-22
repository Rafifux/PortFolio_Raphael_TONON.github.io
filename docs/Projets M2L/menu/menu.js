const menuToggle = document.querySelector('.toggle');
const showcase = document.querySelector('.showcase');

if (menuToggle && showcase) {
  const setMenuState = (isOpen) => {
    menuToggle.classList.toggle('active', isOpen);
    showcase.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  };

  menuToggle.setAttribute('aria-label', 'Ouvrir ou fermer le menu');
  menuToggle.setAttribute('aria-expanded', 'false');

  menuToggle.addEventListener('click', () => {
    const isOpen = !menuToggle.classList.contains('active');
    setMenuState(isOpen);
  });
}