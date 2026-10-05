document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('nav-open');
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
    });
  }

  const yearNode = document.getElementById('year');
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  const galleryGrid = document.getElementById('gallery-grid');
  const photoCatalog = [
    { title: 'Warehouse conveyor line', url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=900&q=80' },
    { title: 'Lift platform installation', url: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=80' },
    { title: 'Assembly line access bridge', url: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80' },
    { title: 'Material lift upgrade', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80' },
    { title: 'Logistics flow design', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80' },
    { title: 'Custom handling equipment', url: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=900&q=80' },
    { title: 'Forklift operations', url: 'https://images.unsplash.com/photo-1565610222536-ef125c59da2b?auto=format&fit=crop&w=900&q=80' },
    { title: 'Production floor', url: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80' },
    { title: 'Automated workflow', url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80' },
    { title: 'Facility expansion', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80' }
  ];

  const shuffle = (items) => {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
    }
    return copy;
  };

  const createGalleryFigure = (photo) => {
    const figure = document.createElement('figure');
    figure.className = 'gallery-item';

    const image = document.createElement('div');
    image.className = 'gallery-image';
    image.setAttribute('aria-hidden', 'true');
    image.style.backgroundImage = `linear-gradient(135deg, rgba(11,45,93,0.6), rgba(15,96,170,0.4), rgba(245,125,41,0.5)), url("${photo.url}")`;
    image.style.backgroundSize = 'cover';
    image.style.backgroundPosition = 'center';

    const caption = document.createElement('figcaption');
    caption.textContent = photo.title;

    figure.appendChild(image);
    figure.appendChild(caption);
    return figure;
  };

  const renderGallery = (items) => {
    if (!galleryGrid) return;

    galleryGrid.innerHTML = '';
    shuffle(items).slice(0, 6).forEach((photo) => {
      galleryGrid.appendChild(createGalleryFigure(photo));
    });
  };

  const addRandomPhoto = () => {
    if (!galleryGrid) return;

    const existingTitles = Array.from(galleryGrid.querySelectorAll('figcaption')).map((caption) => caption.textContent.trim());
    const availablePhotos = photoCatalog.filter((photo) => !existingTitles.includes(photo.title));
    const nextPhoto = availablePhotos.length ? availablePhotos[Math.floor(Math.random() * availablePhotos.length)] : photoCatalog[Math.floor(Math.random() * photoCatalog.length)];

    galleryGrid.appendChild(createGalleryFigure(nextPhoto));
  };

  const addRandomButton = document.getElementById('add-random-photo');
  const shuffleButton = document.getElementById('shuffle-gallery');

  if (galleryGrid) {
    renderGallery(photoCatalog);
  }

  if (addRandomButton) {
    addRandomButton.addEventListener('click', addRandomPhoto);
  }

  if (shuffleButton && galleryGrid) {
    shuffleButton.addEventListener('click', () => renderGallery(photoCatalog));
  }
});
