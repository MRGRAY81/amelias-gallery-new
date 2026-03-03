// Admin Dashboard Logic
let token = localStorage.getItem('adminToken');
let adminData = JSON.parse(localStorage.getItem('adminData') || '{}');
let currentTab = 'messages';
let categories = [];
let artworks = [];
let messages = [];
let orders = [];

// Check authentication
if (!token) {
  window.location.href = '/admin/login.html';
}

// Set admin name
document.getElementById('adminName').textContent = adminData.name || adminData.email || 'Admin';

// Logout function
function logout() {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminData');
  window.location.href = '/admin/login.html';
}

// Fetch with auth header
async function fetchWithAuth(url, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers
  };
  return fetch(url, { ...options, headers });
}

// Tab switching
function switchTab(tabName) {
  currentTab = tabName;
  
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
  
  document.querySelector(`[onclick="switchTab('${tabName}')"]`).classList.add('active');
  document.getElementById(`${tabName}-tab`).classList.add('active');
  
  loadTabData(tabName);
}

// Load tab data
async function loadTabData(tabName) {
  switch(tabName) {
    case 'messages':
      await loadMessages();
      break;
    case 'orders':
      await loadOrders();
      break;
    case 'artworks':
      await loadArtworks();
      break;
    case 'categories':
      await loadCategories();
      break;
  }
}

// ===== MESSAGES =====
async function loadMessages() {
  try {
    const response = await fetchWithAuth(`${window.BACKEND_URL}/api/messages`);
    messages = await response.json();
    renderMessages();
  } catch (error) {
    console.error('Error loading messages:', error);
  }
}

function renderMessages() {
  const container = document.getElementById('messagesContainer');
  
  if (messages.length === 0) {
    container.innerHTML = '<p>No messages yet.</p>';
    return;
  }
  
  const table = `
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Subject</th>
          <th>Status</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${messages.map(msg => `
          <tr data-testid="message-row-${msg.id}">
            <td>${msg.name}</td>
            <td>${msg.email}</td>
            <td>${msg.subject}</td>
            <td><span class="badge ${msg.read ? 'badge-read' : 'badge-unread'}">${msg.read ? 'Read' : 'Unread'}</span></td>
            <td>${new Date(msg.createdAt).toLocaleDateString()}</td>
            <td class="action-buttons">
              ${!msg.read ? `<button class="btn btn-small" onclick="markMessageRead('${msg.id}')" data-testid="mark-read-btn-${msg.id}">Mark Read</button>` : ''}
              <button class="btn btn-danger btn-small" onclick="deleteMessage('${msg.id}')" data-testid="delete-message-btn-${msg.id}">Delete</button>
            </td>
          </tr>
          <tr>
            <td colspan="6" style="padding-left: 2rem; font-style: italic; color: #6a6a6a;">
              "${msg.message}"
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
  
  container.innerHTML = table;
}

async function markMessageRead(id) {
  try {
    await fetchWithAuth(`${window.BACKEND_URL}/api/messages/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ read: true })
    });
    await loadMessages();
  } catch (error) {
    console.error('Error marking message as read:', error);
  }
}

async function deleteMessage(id) {
  if (!confirm('Are you sure you want to delete this message?')) return;
  
  try {
    await fetchWithAuth(`${window.BACKEND_URL}/api/messages/${id}`, {
      method: 'DELETE'
    });
    await loadMessages();
  } catch (error) {
    console.error('Error deleting message:', error);
  }
}

// ===== ORDERS =====
async function loadOrders() {
  try {
    const response = await fetchWithAuth(`${window.BACKEND_URL}/api/orders`);
    orders = await response.json();
    renderOrders();
  } catch (error) {
    console.error('Error loading orders:', error);
  }
}

function renderOrders() {
  const container = document.getElementById('ordersContainer');
  
  if (orders.length === 0) {
    container.innerHTML = '<p>No orders yet.</p>';
    return;
  }
  
  const table = `
    <table>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Status</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${orders.map(order => `
          <tr data-testid="order-row-${order.id}">
            <td>${order.id}</td>
            <td><span class="badge badge-${order.status}">${order.status}</span></td>
            <td>${new Date(order.createdAt).toLocaleDateString()}</td>
            <td>
              <select onchange="updateOrderStatus('${order.id}', this.value)" data-testid="order-status-select-${order.id}">
                <option value="">Change Status</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="shipped">Shipped</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
  
  container.innerHTML = table;
}

async function updateOrderStatus(id, status) {
  if (!status) return;
  
  try {
    await fetchWithAuth(`${window.BACKEND_URL}/api/orders/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
    await loadOrders();
  } catch (error) {
    console.error('Error updating order status:', error);
  }
}

// ===== ARTWORKS =====
async function loadArtworks() {
  try {
    const response = await fetch(`${window.BACKEND_URL}/api/artworks`);
    artworks = await response.json();
    
    const catResponse = await fetch(`${window.BACKEND_URL}/api/categories`);
    categories = await catResponse.json();
    
    renderArtworks();
  } catch (error) {
    console.error('Error loading artworks:', error);
  }
}

function renderArtworks() {
  const container = document.getElementById('artworksContainer');
  
  if (artworks.length === 0) {
    container.innerHTML = '<p>No artworks yet.</p>';
    return;
  }
  
  const table = `
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th>Category</th>
          <th>Availability</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${artworks.map(art => {
          const category = categories.find(c => c.id === art.categoryId);
          return `
            <tr data-testid="artwork-row-${art.id}">
              <td>${art.title}</td>
              <td>$${art.price}</td>
              <td>${category ? category.name : 'N/A'}</td>
              <td>${art.availability}</td>
              <td class="action-buttons">
                <button class="btn btn-small" onclick="editArtwork('${art.id}')" data-testid="edit-artwork-btn-${art.id}">Edit</button>
                <button class="btn btn-danger btn-small" onclick="deleteArtwork('${art.id}')" data-testid="delete-artwork-btn-${art.id}">Delete</button>
              </td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;
  
  container.innerHTML = table;
}

function openArtworkModal(artworkId = null) {
  const modal = document.getElementById('artworkModal');
  const form = document.getElementById('artworkForm');
  const title = document.getElementById('artworkModalTitle');
  const categorySelect = document.getElementById('artworkCategory');
  
  categorySelect.innerHTML = categories.map(cat => 
    `<option value="${cat.id}">${cat.name}</option>`
  ).join('');
  
  if (artworkId) {
    const artwork = artworks.find(a => a.id === artworkId);
    title.textContent = 'Edit Artwork';
    document.getElementById('artworkId').value = artwork.id;
    document.getElementById('artworkTitle').value = artwork.title;
    document.getElementById('artworkDescription').value = artwork.description;
    document.getElementById('artworkPrice').value = artwork.price;
    document.getElementById('artworkImageUrl').value = artwork.imageUrl;
    document.getElementById('artworkCategory').value = artwork.categoryId;
    document.getElementById('artworkAvailability').value = artwork.availability;
  } else {
    title.textContent = 'Create Artwork';
    form.reset();
    document.getElementById('artworkId').value = '';
  }
  
  modal.classList.add('active');
}

function closeArtworkModal() {
  document.getElementById('artworkModal').classList.remove('active');
  document.getElementById('artworkForm').reset();
  document.getElementById('artworkAlertContainer').innerHTML = '';
}

function editArtwork(id) {
  openArtworkModal(id);
}

async function deleteArtwork(id) {
  if (!confirm('Are you sure you want to delete this artwork?')) return;
  
  try {
    await fetchWithAuth(`${window.BACKEND_URL}/api/artworks/${id}`, {
      method: 'DELETE'
    });
    await loadArtworks();
  } catch (error) {
    console.error('Error deleting artwork:', error);
  }
}

document.getElementById('artworkForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const id = document.getElementById('artworkId').value;
  const data = {
    title: document.getElementById('artworkTitle').value,
    description: document.getElementById('artworkDescription').value,
    price: parseFloat(document.getElementById('artworkPrice').value),
    imageUrl: document.getElementById('artworkImageUrl').value,
    categoryId: document.getElementById('artworkCategory').value,
    availability: document.getElementById('artworkAvailability').value
  };
  
  try {
    const url = id 
      ? `${window.BACKEND_URL}/api/artworks/${id}`
      : `${window.BACKEND_URL}/api/artworks`;
    const method = id ? 'PATCH' : 'POST';
    
    const response = await fetchWithAuth(url, {
      method,
      body: JSON.stringify(data)
    });
    
    if (response.ok) {
      closeArtworkModal();
      await loadArtworks();
    } else {
      document.getElementById('artworkAlertContainer').innerHTML = 
        '<div class="alert alert-error">Error saving artwork.</div>';
    }
  } catch (error) {
    document.getElementById('artworkAlertContainer').innerHTML = 
      '<div class="alert alert-error">Error saving artwork.</div>';
  }
});

// ===== CATEGORIES =====
async function loadCategories() {
  try {
    const response = await fetch(`${window.BACKEND_URL}/api/categories`);
    categories = await response.json();
    renderCategories();
  } catch (error) {
    console.error('Error loading categories:', error);
  }
}

function renderCategories() {
  const container = document.getElementById('categoriesContainer');
  
  if (categories.length === 0) {
    container.innerHTML = '<p>No categories yet.</p>';
    return;
  }
  
  const table = `
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Slug</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${categories.map(cat => `
          <tr data-testid="category-row-${cat.id}">
            <td>${cat.name}</td>
            <td>${cat.slug}</td>
            <td class="action-buttons">
              <button class="btn btn-small" onclick="editCategory('${cat.id}')" data-testid="edit-category-btn-${cat.id}">Edit</button>
              <button class="btn btn-danger btn-small" onclick="deleteCategory('${cat.id}')" data-testid="delete-category-btn-${cat.id}">Delete</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
  
  container.innerHTML = table;
}

function openCategoryModal(categoryId = null) {
  const modal = document.getElementById('categoryModal');
  const form = document.getElementById('categoryForm');
  const title = document.getElementById('categoryModalTitle');
  
  if (categoryId) {
    const category = categories.find(c => c.id === categoryId);
    title.textContent = 'Edit Category';
    document.getElementById('categoryId').value = category.id;
    document.getElementById('categoryName').value = category.name;
    document.getElementById('categorySlug').value = category.slug;
  } else {
    title.textContent = 'Create Category';
    form.reset();
    document.getElementById('categoryId').value = '';
  }
  
  modal.classList.add('active');
}

function closeCategoryModal() {
  document.getElementById('categoryModal').classList.remove('active');
  document.getElementById('categoryForm').reset();
  document.getElementById('categoryAlertContainer').innerHTML = '';
}

function editCategory(id) {
  openCategoryModal(id);
}

async function deleteCategory(id) {
  if (!confirm('Are you sure you want to delete this category?')) return;
  
  try {
    await fetchWithAuth(`${window.BACKEND_URL}/api/categories/${id}`, {
      method: 'DELETE'
    });
    await loadCategories();
  } catch (error) {
    console.error('Error deleting category:', error);
  }
}

document.getElementById('categoryForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const id = document.getElementById('categoryId').value;
  const data = {
    name: document.getElementById('categoryName').value,
    slug: document.getElementById('categorySlug').value
  };
  
  try {
    const url = id 
      ? `${window.BACKEND_URL}/api/categories/${id}`
      : `${window.BACKEND_URL}/api/categories`;
    const method = id ? 'PATCH' : 'POST';
    
    const response = await fetchWithAuth(url, {
      method,
      body: JSON.stringify(data)
    });
    
    if (response.ok) {
      closeCategoryModal();
      await loadCategories();
    } else {
      document.getElementById('categoryAlertContainer').innerHTML = 
        '<div class="alert alert-error">Error saving category.</div>';
    }
  } catch (error) {
    document.getElementById('categoryAlertContainer').innerHTML = 
      '<div class="alert alert-error">Error saving category.</div>';
  }
});

// Auto-generate slug from name
document.getElementById('categoryName').addEventListener('input', (e) => {
  if (!document.getElementById('categoryId').value) {
    const slug = e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    document.getElementById('categorySlug').value = slug;
  }
});

// Initialize
loadTabData('messages');
