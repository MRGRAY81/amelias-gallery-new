# 🚀 Amelia's Gallery - Release v1.0.0

## Stack
- **Frontend**: Pure HTML, CSS, JavaScript (Multi-Page Application)
- **Backend**: Node.js 18+ with Express 4.x
- **Database**: JSON file storage (db.json)
- **Authentication**: JWT tokens with bcryptjs
- **Port**: 3000 (configurable via process.env.PORT)

## Setup Steps

### 1. Prerequisites
- Node.js 18.0.0 or higher
- npm or yarn package manager

### 2. Installation
```bash
npm install
```

### 3. Run Commands

**Development & Production:**
```bash
npm start
```
or
```bash
npm run dev
```

or directly:
```bash
node index.js
```

**Test (validates package):**
```bash
npm test
```

### 4. Access
Once running, open:
- **Home**: http://localhost:3000/
- **Gallery**: http://localhost:3000/gallery.html
- **About**: http://localhost:3000/about.html  
- **Contact**: http://localhost:3000/contact.html
- **Admin Login**: http://localhost:3000/admin/login.html

## Environment Variables

### Required:
None - works out of the box!

### Optional:
```bash
PORT=3000                    # Server port (default: 3000)
JWT_SECRET=your-secret-key   # JWT signing key (default provided)
```

### Safe Defaults:
- PORT: 3000
- JWT_SECRET: 'amelia-gallery-secret-key-2024' (change in production)
- Database: ./db.json
- Static files: ./public/

## Admin Credentials
- **Email**: amelia@admin.com
- **Password**: AmeliaSecure123

## Secret Admin Access
1. **Invisible Hotspot**: Click bottom-right corner of header on any page
2. **Keyboard Shortcut**: Type "AMELIA" (case-insensitive) anywhere

## Project Structure
```
/
├── index.js              # Express server (main entry point)
├── package.json          # Dependencies & scripts
├── db.json              # Data storage
├── public/              # Static frontend files
│   ├── index.html       # Home page
│   ├── gallery.html     # Gallery page
│   ├── about.html       # About page
│   ├── contact.html     # Contact page
│   ├── admin/
│   │   ├── login.html   # Admin login
│   │   └── index.html   # Admin dashboard
│   ├── css/
│   │   ├── main.css     # Global styles
│   │   └── gallery.css  # Gallery styles
│   ├── js/
│   │   ├── config.js    # Backend URL config
│   │   ├── gallery.js   # Gallery logic
│   │   └── admin.js     # Admin logic
│   └── assets/
│       └── images/
│           └── blossom-bg.png  # Background artwork
├── .replit              # Replit configuration
├── replit.nix           # Nix dependencies
└── README.md            # Documentation
```

## API Endpoints

### Public:
- `GET /api/health` - Health check
- `GET /api/artworks` - Get all artworks
- `GET /api/categories` - Get all categories
- `POST /api/messages` - Submit contact form
- `POST /api/orders` - Create order

### Protected (requires JWT):
- `POST /api/auth/login` - Admin login
- `GET /api/messages` - Get messages
- `PATCH /api/messages/:id` - Update message
- `DELETE /api/messages/:id` - Delete message
- `GET /api/orders` - Get orders
- `PATCH /api/orders/:id` - Update order
- `POST /api/artworks` - Create artwork
- `PATCH /api/artworks/:id` - Update artwork
- `DELETE /api/artworks/:id` - Delete artwork
- `POST /api/categories` - Create category
- `PATCH /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

## Sample Data Included
✅ 3 artworks (Cherry Blossom Dreams, Sunset Serenity, Morning Mist)
✅ 2 categories (Watercolor Paintings, Oil on Canvas)
✅ 1 admin user (Amelia)

## Features
- ✅ Multi-page website with standard navigation
- ✅ Gallery with artwork display
- ✅ Contact form with backend submission
- ✅ Secret admin access (hotspot + keyboard shortcut)
- ✅ Admin dashboard with CRUD operations
- ✅ JWT authentication
- ✅ JSON file persistence
- ✅ Beautiful, artistic design
- ✅ Responsive layout
- ✅ Replit-ready deployment

## Security Notes
- Change JWT_SECRET in production
- Use HTTPS in production
- Consider rate limiting for login endpoint
- Database file permissions should be restricted

## Troubleshooting

**Port already in use:**
```bash
# Set different port
PORT=4000 node index.js
```

**Dependencies fail to install:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Server won't start:**
- Check Node.js version: `node --version` (needs 18+)
- Check db.json exists and is valid JSON
- Check port 3000 is not already in use

## Gallery Carousel Integration
To add your custom moving-rows carousel:
1. Open `public/js/gallery.js`
2. Find: `// PASTE EXISTING MOVING-ROWS CAROUSEL CODE HERE (UNCHANGED)`
3. Replace fallback grid code with your carousel
4. The `artworks` array is already loaded from backend

## Version History
- **v1.0.0** (2026-03-04): Initial release
  - Multi-page website
  - Node.js backend
  - Admin dashboard
  - Replit-ready

## License
ISC

## Support
For issues or questions, check:
- README.md - Full documentation
- INSTALLATION.txt - Quick setup guide
- REPLIT_DEPLOY.md - Replit-specific instructions
