# 🎨 Amelia's Gallery - Quick Reference

## 🚀 Start Server
```bash
cd /app/server
node index.js
```
Server runs on: **http://localhost:4000**

## 🌐 Public Pages
- **Home**: http://localhost:4000/
- **Gallery**: http://localhost:4000/gallery.html
- **About**: http://localhost:4000/about.html
- **Contact**: http://localhost:4000/contact.html

## 🔐 Admin Access

### Method 1: Direct URL
http://localhost:4000/admin/login.html

### Method 2: Secret Hotspot
Click the invisible area in **bottom-right corner** of header

### Method 3: Keyboard Shortcut
Type **"AMELIA"** (case-insensitive) anywhere on the site

### Admin Credentials
- **Email**: amelia@admin.com
- **Password**: AmeliaSecure123

## 📊 Admin Dashboard Features
Once logged in, you can manage:
- **Messages** - View inquiries from contact form
- **Orders** - Track and update order status
- **Artworks** - Create, edit, delete gallery items
- **Categories** - Organize artworks

## 🎯 Gallery Carousel Integration
Want to add your custom moving-rows carousel?

1. Open: `/app/public/js/gallery.js`
2. Find: `// PASTE EXISTING MOVING-ROWS CAROUSEL CODE HERE (UNCHANGED)`
3. Replace the fallback grid with your carousel
4. The `artworks` array is already loaded for you!

## 📁 Key Files
- **Server**: `/app/server/index.js`
- **Database**: `/app/server/db.json`
- **Frontend**: `/app/public/`
- **Styles**: `/app/public/css/`
- **Scripts**: `/app/public/js/`
- **Background**: `/app/public/assets/images/blossom-bg.png`

## 🎨 Sample Data Included
- ✅ 3 artworks (Cherry Blossom Dreams, Sunset Serenity, Morning Mist)
- ✅ 2 categories (Watercolor Paintings, Oil on Canvas)
- ✅ 1 admin user (Amelia)

## 🔧 API Base URL
All API calls go to: **http://localhost:4000/api/**

## ✨ Design Notes
- Soft, minimal, artistic aesthetic
- Serif typography (Georgia)
- Light translucent panels
- Gentle hover effects
- No heavy UI or frames
- Full-page blossom background (your uploaded image)

## 📦 Exportable Structure
```
/app/
├── server/          # Backend (Node.js + Express)
├── public/          # Frontend (HTML/CSS/JS)
├── start-server.sh  # Quick start script
├── README.md        # Full documentation
└── PROJECT_SUMMARY.md  # Detailed summary
```

## ⚡ Tech Stack
- Frontend: **Pure HTML, CSS, JavaScript** (No React!)
- Backend: **Node.js + Express**
- Database: **JSON file** (db.json)
- Auth: **JWT tokens**
- Port: **4000** (Replit-compatible)

---

**Everything is ready to go!** 🎉

Your gallery is running, all features are functional, and the project is fully exportable.
