# Amelia's Gallery

A beautiful, family-run art gallery website featuring a soft, minimal, artistic design with a blossom-themed aesthetic.

## Features

### Public Website
- **Home Page**: Welcome panel with gallery introduction
- **Gallery Page**: Artwork showcase with carousel (placeholder for existing moving-rows carousel)
- **About Page**: Gallery story and background
- **Contact Page**: Inquiry and commission request form

### Admin Backoffice
- **Secret Access**: Hidden hotspot in header + keyboard shortcut (type "AMELIA")
- **Messages Management**: View, mark as read/unread, delete inquiries
- **Orders Management**: Update order status (pending/paid/shipped/cancelled)
- **Artwork Management**: Create, edit, delete artworks with images and pricing
- **Category Management**: Organize artworks by categories

## Project Structure

```
/app/
├── server/                 # Node.js + Express backend
│   ├── index.js           # Main server file
│   ├── db.json            # JSON file database
│   └── package.json       # Node dependencies
├── public/                # Static frontend files
│   ├── index.html         # Home page
│   ├── gallery.html       # Gallery page
│   ├── about.html         # About page
│   ├── contact.html       # Contact page
│   ├── admin/
│   │   ├── login.html     # Admin login
│   │   └── index.html     # Admin dashboard
│   ├── css/
│   │   ├── main.css       # Global styles
│   │   └── gallery.css    # Gallery-specific styles
│   ├── js/
│   │   ├── config.js      # Backend URL configuration
│   │   ├── gallery.js     # Gallery logic
│   │   └── admin.js       # Admin dashboard logic
│   └── assets/
│       └── images/
│           └── blossom-bg.png  # Background artwork
└── README.md
```

## Running on Replit

### Setup Instructions

1. **Install Dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Start the Server**
   ```bash
   npm start
   ```

3. **Access the Website**
   - The server runs on port 3000 (or process.env.PORT on Replit)
   - Open your Replit preview to view the site
   - Navigate to `/admin/login.html` for admin access

### Admin Credentials

- **Email**: amelia@admin.com
- **Password**: AmeliaSecure123

### Secret Admin Access

Two ways to access the admin panel:
1. Click the invisible hotspot in the bottom-right corner of the header
2. Type "AMELIA" (case-insensitive) anywhere on the site

## API Endpoints

### Public Endpoints
- `GET /api/health` - Health check
- `GET /api/artworks` - Get all artworks
- `GET /api/categories` - Get all categories
- `POST /api/messages` - Submit contact message
- `POST /api/orders` - Create order (scaffold)

### Protected Endpoints (require JWT token)
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

## Database

The application uses a JSON file (`server/db.json`) for data persistence with the following collections:
- `admins` - Admin users
- `categories` - Artwork categories
- `artworks` - Gallery artworks
- `messages` - Contact form submissions
- `orders` - Customer orders

## Design Guidelines

- Soft, minimal, artistic aesthetic
- Serif typography (Georgia)
- Gentle hover effects and transitions
- Light translucent panels over artwork background
- No heavy UI or visible box frames
- Calm, artistic color palette (soft pinks, roses, neutrals)

## Gallery Carousel

The gallery page includes a placeholder section (`#galleryCarouselMount`) for your existing moving-rows carousel code. To integrate your carousel:

1. Open `/public/js/gallery.js`
2. Find the comment: `// PASTE EXISTING MOVING-ROWS CAROUSEL CODE HERE (UNCHANGED)`
3. Replace the fallback grid code with your carousel implementation
4. The `artworks` array is already loaded from the backend

## Technologies Used

- **Frontend**: Pure HTML, CSS, JavaScript (no frameworks)
- **Backend**: Node.js + Express
- **Database**: JSON file storage
- **Authentication**: JWT tokens
- **Deployment**: Replit-ready with process.env.PORT support

## Sample Data

The application comes pre-populated with:
- 2 categories (Watercolor Paintings, Oil on Canvas)
- 3 sample artworks with descriptions and pricing
- 1 admin user (Amelia)

## Notes

- All pages use standard anchor links (not SPA routing)
- Background image is the uploaded blossom artwork
- Admin dashboard is fully functional with CRUD operations
- Contact form submits to backend API
- Token-based authentication for admin access
