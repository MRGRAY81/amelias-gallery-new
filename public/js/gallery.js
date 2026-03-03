// Load artworks from backend and initialize carousel
let artworks = [];

async function loadArtworks() {
  try {
    const response = await fetch(`${window.BACKEND_URL}/api/artworks`);
    artworks = await response.json();
    initializeGallery();
  } catch (error) {
    console.error('Error loading artworks:', error);
  }
}

function initializeGallery() {
  // PASTE EXISTING MOVING-ROWS CAROUSEL CODE HERE (UNCHANGED)
  
  // Fallback: simple grid display
  const mount = document.getElementById('galleryCarouselMount');
  if (!mount) return;
  
  const grid = document.createElement('div');
  grid.className = 'gallery-grid';
  
  artworks.forEach(artwork => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.setAttribute('data-testid', `artwork-${artwork.id}`);
    
    item.innerHTML = `
      <img src="${artwork.imageUrl}" alt="${artwork.title}" />
      <div class="gallery-item-info">
        <h3>${artwork.title}</h3>
        <p>${artwork.description}</p>
        <div class="gallery-item-price">$${artwork.price}</div>
      </div>
    `;
    
    grid.appendChild(item);
  });
  
  mount.appendChild(grid);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadArtworks);
} else {
  loadArtworks();
}
