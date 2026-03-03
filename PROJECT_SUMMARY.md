# Amelia's Gallery - Project Summary

## 🎨 Overview
A beautiful, family-run art gallery website built as a **Multi-Page Application (MPA)** with pure HTML/CSS/JavaScript frontend and Node.js + Express backend. Features a soft, minimal, artistic design with a stunning blossom-themed background.

## ✅ Completed Features

### Public Website (MPA - No SPA Routing)
- ✅ **Home Page** (`index.html`)
  - Full-page blossom artwork background (unmodified)
  - Soft welcome panel with introduction
  - "View Gallery" button linking to gallery page
  - Standard anchor link navigation

- ✅ **Gallery Page** (`gallery.html`)
  - Displays artworks from backend API
  - Fallback grid layout (placeholder for existing moving-rows carousel)
  - Shows all artwork details: title, description, price
  - Comment placeholder ready for custom carousel code

- ✅ **About Page** (`about.html`)
  - Translucent content panel with gallery story
  - Maintains consistent design aesthetic

- ✅ **Contact Page** (`contact.html`)
  - Form fields: name, email, subject, message
  - POST to backend `/api/messages`
  - Success/error feedback
  - Form validation

### Secret Admin Access
- ✅ **Hidden Hotspot**: Invisible clickable area in bottom-right of header
- ✅ **Keyboard Shortcut**: Type "AMELIA" (case-insensitive) anywhere to redirect to admin login
- ✅ Admin not visible in public navigation

### Admin Backoffice
- ✅ **Admin Login** (`/admin/login.html`)
  - Email + password authentication
  - JWT token storage
  - Health check on load
  - Credentials: `amelia@admin.com` / `AmeliaSecure123`

- ✅ **Admin Dashboard** (`/admin/index.html`)
  - Protected route (requires authentication)
  - Four main sections:

  **A) Messages Tab**
  - View all contact form submissions
  - Display: name, email, subject, message, date, status
  - Mark as read/unread
  - Delete messages

  **B) Orders Tab**
  - View all orders
  - Update status: pending / paid / shipped / cancelled
  - Status badges with color coding

  **C) Artworks Tab**
  - Create new artwork with:
    - Title, description, price
    - Image URL
    - Category selection
    - Availability status
  - Edit existing artworks
  - Delete artworks
  - View all artworks in table

  **D) Categories Tab**
  - Create categories with name and slug
  - Auto-generate slug from name
  - Edit categories
  - Delete categories

### Backend API (Node.js + Express)
- ✅ **Server**: Express on port 4000
- ✅ **Database**: JSON file storage (`db.json`)
- ✅ **Authentication**: JWT tokens with bcryptjs
- ✅ **CORS enabled** for cross-origin requests

**Public Endpoints:**
- `GET /api/health` - Health check
- `GET /api/artworks` - Get all artworks
- `GET /api/categories` - Get all categories
- `POST /api/messages` - Submit contact message
- `POST /api/orders` - Create order

**Protected Endpoints:**
- `POST /api/auth/login` - Admin login
- `GET /api/messages` - Get all messages
- `PATCH /api/messages/:id` - Update message
- `DELETE /api/messages/:id` - Delete message
- `GET /api/orders` - Get all orders
- `PATCH /api/orders/:id` - Update order status
- `POST /api/artworks` - Create artwork
- `PATCH /api/artworks/:id` - Update artwork
- `DELETE /api/artworks/:id` - Delete artwork
- `POST /api/categories` - Create category
- `PATCH /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Sample Data
- ✅ 2 pre-populated categories
- ✅ 3 sample artworks with descriptions and pricing
- ✅ 1 admin user (Amelia)

## 🎨 Design Features
- Soft, minimal, artistic aesthetic
- Serif typography (Georgia)
- Gentle hover effects
- Light translucent panels (backdrop-filter blur)
- No heavy UI or visible box frames
- Calm color palette: soft pinks, roses, neutrals
- Full-page blossom background (unmodified)
- Responsive design

## 📁 Project Structure
```
/app/
├── server/                 # Backend
│   ├── index.js           # Express server
│   ├── db.json            # Data storage
│   ├── package.json       # Dependencies
│   └── yarn.lock
├── public/                # Frontend
│   ├── index.html         # Home
│   ├── gallery.html       # Gallery
│   ├── about.html         # About
│   ├── contact.html       # Contact
│   ├── admin/
│   │   ├── login.html     # Admin login
│   │   └── index.html     # Dashboard
│   ├── css/
│   │   ├── main.css       # Global styles
│   │   └── gallery.css    # Gallery styles
│   ├── js/
│   │   ├── config.js      # Backend URL
│   │   ├── gallery.js     # Gallery logic
│   │   └── admin.js       # Admin logic
│   └── assets/
│       └── images/
│           └── blossom-bg.png
├── start-server.sh        # Startup script
└── README.md              # Documentation
```

## 🚀 Running the Application

### Start Server
```bash
cd /app/server
node index.js
```

Or use the startup script:
```bash
bash /app/start-server.sh
```

### Access
- **Website**: http://localhost:4000
- **Admin Login**: http://localhost:4000/admin/login.html
- **Admin Credentials**: 
  - Email: `amelia@admin.com`
  - Password: `AmeliaSecure123`

### Secret Access
1. Click invisible hotspot (bottom-right of header)
2. Type "AMELIA" anywhere on the site

## 🔧 Technical Stack
- **Frontend**: Pure HTML, CSS, JavaScript (No React, No SPA)
- **Backend**: Node.js + Express
- **Database**: JSON file (`db.json`)
- **Auth**: JWT + bcryptjs
- **Port**: 4000 (configurable via `process.env.PORT`)

## 📝 Notes
- All pages use standard anchor links (not SPA routing)
- No React, Vue, or any frontend framework
- Background image is the uploaded blossom artwork (unmodified)
- Gallery includes placeholder for custom moving-rows carousel
- Admin dashboard fully functional with CRUD operations
- Contact form submits to backend API
- Token-based authentication for admin access
- Replit-compatible (uses `process.env.PORT`)

## 🎯 Gallery Carousel Integration
To add your custom moving-rows carousel:

1. Open `/app/public/js/gallery.js`
2. Find: `// PASTE EXISTING MOVING-ROWS CAROUSEL CODE HERE (UNCHANGED)`
3. Replace the fallback grid code with your carousel implementation
4. The `artworks` array is already loaded and available

## ✨ Features Working
✅ All public pages with navigation
✅ Gallery displays artworks from backend
✅ Contact form submission
✅ Secret admin access (hotspot + keyboard)
✅ Admin login with authentication
✅ Messages management (view, mark read, delete)
✅ Orders management (view, update status)
✅ Artworks CRUD (create, edit, delete)
✅ Categories CRUD (create, edit, delete)
✅ Sample data pre-populated
✅ Beautiful, artistic design
✅ Fully functional backend API
✅ JWT authentication
✅ Data persistence with JSON file

## 🎉 Ready for Deployment
The project is complete and ready for:
- Replit deployment (port configured)
- Local development
- Custom carousel integration
- Further customization

**Server Status**: ✅ Running on port 4000
**Database**: ✅ Initialized with sample data
**Admin Access**: ✅ Working (amelia@admin.com)
**All Features**: ✅ Tested and functional
