# 🎨 Amelia's Gallery

A beautiful family-run art gallery website with soft, minimal, artistic design featuring a stunning blossom-themed background.

## ⚡ Quick Start

### Run Locally
```bash
npm install
npm start
```
Open http://localhost:3000

### Run on Replit

#### Method 1: Import from GitHub (Recommended)
1. Push this repository to GitHub
2. Go to [Replit.com](https://replit.com)
3. Click **"Create Repl"** → **"Import from GitHub"**
4. Select your repository
5. Click **"Import from GitHub"**
6. Replit will automatically install dependencies and run the server
7. Your gallery will be live at your Repl URL!

#### Method 2: Manual Upload
1. Create a new Node.js Repl on Replit
2. Upload all files to the Repl
3. Click the **"Run"** button
4. Replit will handle the rest!

#### What Replit Does Automatically:
- ✅ Detects Node.js project via `package.json`
- ✅ Runs `npm install` to install dependencies
- ✅ Executes `node index.js` to start server
- ✅ Provides a live URL (e.g., `https://amelias-gallery.username.repl.co`)
- ✅ Maps port 3000 to public URL

## 🔐 Admin Access

**Login URL:** `/admin/login.html`

**Credentials:**
- Email: `amelia@admin.com`
- Password: `AmeliaSecure123`

**Secret Access:**
- Click invisible hotspot in bottom-right of header
- Type "AMELIA" anywhere on the site

## 📁 Project Structure

```
amelias-gallery/
├── index.js              # Express server (ENTRY POINT)
├── package.json          # Dependencies
├── db.json              # Database
├── public/              # Frontend files
│   ├── *.html          # Pages (home, gallery, about, contact)
│   ├── admin/          # Admin pages
│   ├── css/            # Stylesheets
│   ├── js/             # JavaScript
│   └── assets/         # Images
├── .replit             # Replit config
└── replit.nix          # Nix dependencies
```

## 🎯 Features

### Public Website
- **Home** - Welcome page with blossom background
- **Gallery** - Artwork showcase (3 sample artworks included)
- **About** - Gallery story
- **Contact** - Inquiry form with backend submission

### Admin Dashboard
- **Messages** - View/manage contact inquiries
- **Orders** - Track order status
- **Artworks** - Create, edit, delete gallery items
- **Categories** - Organize artworks

## 🔧 Tech Stack
- **Frontend**: Pure HTML, CSS, JavaScript (No React!)
- **Backend**: Node.js + Express
- **Database**: JSON file (`db.json`)
- **Auth**: JWT tokens
- **Port**: 3000 (configurable)

## 🌐 API Endpoints

### Public
- `GET /api/health` - Health check
- `GET /api/artworks` - List artworks
- `GET /api/categories` - List categories
- `POST /api/messages` - Submit contact form

### Protected (JWT required)
- `POST /api/auth/login` - Admin login
- Full CRUD for messages, orders, artworks, categories

## 📝 Configuration

### Environment Variables (Optional)
```bash
PORT=3000                  # Server port
JWT_SECRET=your-secret     # JWT signing key
```

### Replit Configuration
The `.replit` file tells Replit how to run the project:
```toml
run = "npm install && node index.js"
entrypoint = "index.js"
language = "nodejs"
```

## 🎨 Design
- Soft, minimal, artistic aesthetic
- Serif typography (Georgia)
- Translucent panels with backdrop blur
- Gentle hover effects
- Full-page blossom artwork background
- Responsive layout

## 📦 Sample Data
Includes pre-populated data for testing:
- 3 artworks with descriptions and pricing
- 2 categories (Watercolor Paintings, Oil on Canvas)
- 1 admin user (Amelia)

## 🚀 Deployment

### Replit (Zero Configuration)
1. Import from GitHub or upload files
2. Click "Run"
3. Done! Your gallery is live

### Other Platforms
- **Heroku**: Add `Procfile` with `web: node index.js`
- **Railway**: Automatically detects and deploys
- **Render**: Automatically detects and deploys
- **DigitalOcean App Platform**: Select Node.js runtime

## 🎯 Gallery Carousel Integration
To add custom moving-rows carousel:
1. Open `public/js/gallery.js`
2. Find comment: `// PASTE EXISTING MOVING-ROWS CAROUSEL CODE HERE`
3. Replace fallback grid with your carousel code
4. The `artworks` array is already loaded from backend

## 📚 Documentation
- **RELEASE_NOTES.md** - Full technical documentation
- **INSTALLATION.txt** - Quick setup guide
- **PROJECT_SUMMARY.md** - Feature overview
- **REPLIT_DEPLOY.md** - Replit deployment guide

## 🔒 Security
- JWT-based authentication
- bcrypt password hashing
- CORS enabled
- Environment variables for secrets

**Production Recommendations:**
- Change `JWT_SECRET` 
- Use HTTPS
- Add rate limiting
- Restrict database file permissions

## 🐛 Troubleshooting

**Port in use:**
```bash
PORT=4000 node index.js
```

**Dependencies fail:**
```bash
rm -rf node_modules
npm install
```

**Pages not loading:**
- Ensure server started: Look for "Amelia's Gallery server running on port 3000"
- Check db.json exists
- Verify Node.js version ≥18

## 📖 Scripts

```bash
npm start      # Start server (production)
npm run dev    # Start server (development, same as start)
npm test       # Run tests (currently placeholder)
```

## ✨ Key Features
✅ Multi-page application (MPA, not SPA)
✅ No build step required
✅ Replit-ready with automatic deployment
✅ Beautiful artistic design
✅ Secret admin access
✅ Full CRUD admin dashboard
✅ JWT authentication
✅ JSON file database
✅ Sample data included

## 📄 License
ISC

## 🙏 Credits
Background artwork: Cherry blossom themed illustration
Created for Amelia's Gallery

---

**Ready to deploy?** Push to GitHub and import to Replit in under 2 minutes! 🚀
