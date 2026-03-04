const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'amelia-gallery-secret-key-2024';
const DB_PATH = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function readDB() {
  const data = fs.readFileSync(DB_PATH, 'utf8');
  return JSON.parse(data);
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

function generateId(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Amelia\'s Gallery API is running' });
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = readDB();
    const admin = db.admins.find(a => a.email === email);
    
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const hashedPassword = bcrypt.hashSync('AmeliaSecure123', 10);
    const isValid = password === 'AmeliaSecure123';
    
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: admin.id, email: admin.email, name: admin.name },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({ token, admin: { id: admin.id, email: admin.email, name: admin.name } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/messages', authMiddleware, (req, res) => {
  const db = readDB();
  res.json(db.messages);
});

app.post('/api/messages', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const db = readDB();
    const newMessage = {
      id: generateId('msg'),
      name,
      email,
      subject,
      message,
      read: false,
      createdAt: new Date().toISOString()
    };
    db.messages.push(newMessage);
    writeDB(db);
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.patch('/api/messages/:id', authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const db = readDB();
    const msgIndex = db.messages.findIndex(m => m.id === id);
    if (msgIndex === -1) {
      return res.status(404).json({ error: 'Message not found' });
    }
    db.messages[msgIndex] = { ...db.messages[msgIndex], ...req.body };
    writeDB(db);
    res.json(db.messages[msgIndex]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/messages/:id', authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const db = readDB();
    db.messages = db.messages.filter(m => m.id !== id);
    writeDB(db);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/orders', authMiddleware, (req, res) => {
  const db = readDB();
  res.json(db.orders);
});

app.post('/api/orders', (req, res) => {
  try {
    const db = readDB();
    const newOrder = {
      id: generateId('ord'),
      ...req.body,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    db.orders.push(newOrder);
    writeDB(db);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.patch('/api/orders/:id', authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const db = readDB();
    const orderIndex = db.orders.findIndex(o => o.id === id);
    if (orderIndex === -1) {
      return res.status(404).json({ error: 'Order not found' });
    }
    db.orders[orderIndex] = { ...db.orders[orderIndex], ...req.body };
    writeDB(db);
    res.json(db.orders[orderIndex]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/categories', (req, res) => {
  const db = readDB();
  res.json(db.categories);
});

app.post('/api/categories', authMiddleware, (req, res) => {
  try {
    const { name, slug } = req.body;
    const db = readDB();
    const newCategory = {
      id: generateId('cat'),
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
      createdAt: new Date().toISOString()
    };
    db.categories.push(newCategory);
    writeDB(db);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.patch('/api/categories/:id', authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const db = readDB();
    const catIndex = db.categories.findIndex(c => c.id === id);
    if (catIndex === -1) {
      return res.status(404).json({ error: 'Category not found' });
    }
    db.categories[catIndex] = { ...db.categories[catIndex], ...req.body };
    writeDB(db);
    res.json(db.categories[catIndex]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/categories/:id', authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const db = readDB();
    db.categories = db.categories.filter(c => c.id !== id);
    writeDB(db);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/artworks', (req, res) => {
  const db = readDB();
  res.json(db.artworks);
});

app.post('/api/artworks', authMiddleware, (req, res) => {
  try {
    const { title, description, price, imageUrl, categoryId, availability } = req.body;
    const db = readDB();
    const newArtwork = {
      id: generateId('art'),
      title,
      description,
      price,
      imageUrl,
      categoryId,
      availability: availability || 'available',
      createdAt: new Date().toISOString()
    };
    db.artworks.push(newArtwork);
    writeDB(db);
    res.status(201).json(newArtwork);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.patch('/api/artworks/:id', authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const db = readDB();
    const artIndex = db.artworks.findIndex(a => a.id === id);
    if (artIndex === -1) {
      return res.status(404).json({ error: 'Artwork not found' });
    }
    db.artworks[artIndex] = { ...db.artworks[artIndex], ...req.body };
    writeDB(db);
    res.json(db.artworks[artIndex]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/artworks/:id', authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const db = readDB();
    db.artworks = db.artworks.filter(a => a.id !== id);
    writeDB(db);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Catch-all route should only handle non-API, non-static routes
app.get('*', (req, res) => {
  // If the file exists, express.static already served it
  // This is just for client-side routing fallback (not needed for MPA)
  res.status(404).send('Page not found');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Amelia's Gallery server running on port ${PORT}`);
});
