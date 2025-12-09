# 1. Install Runtime Dependencies
npm install react-router-dom react-helmet-async aos

# 2. Initialize Tailwind
npx tailwindcss init -p

# 3. Remove Tailwind v4 and install v3
npm uninstall tailwindcss postcss autoprefixer
npm install -D tailwindcss@^3.4.0 postcss autoprefixer

# 4. Now initialize
npx tailwindcss init -p



# React + Vite Production Template

This is a production-ready **React + Vite** starter template. It comes pre-configured with routing, SEO management, Tailwind CSS, animations, and a PHP mailer backend for contact forms.

## 🚀 Features

- **Framework:** React 19 + Vite 7 (Fast HMR)
- **Styling:** Tailwind CSS 3.4 (Pre-configured)
- **Routing:** React Router v7 (Lazy loading enabled)
- **SEO:** `react-helmet-async` for meta tags and Open Graph data
- **Animations:** AOS (Animate On Scroll)
- **Architecture:** Clean folder structure with Absolute Imports
- **Backend:** PHP script included for handling multipart contact forms (text + file uploads)

---

# 🚀 React + Vite + Tailwind SEO Template

This is a **Production-Ready Starter Template** designed for high-performance websites. It includes pre-configured Routing, SEO management, Animations, and a PHP-based Contact Form handler.

---

## 📂 1. Project Structure Explained

Here is the purpose of every file in your directory:

### **Root Directory**
| File / Folder | Purpose |
|--------------|---------|
| `node_modules/` | Dependencies (Ignore). |
| `public/` | **Static Assets Root**. Files here are served at the root domain (`/`). |
| ├── `.htaccess` | **CRITICAL**. Configures Apache servers to handle React Routing (prevents 404s on refresh). |
| ├── `robots.txt` | Instructions for Google Bots (SEO). |
| ├── `send_email.php` | Backend script to handle Contact Form submissions. |
| ├── `vite.svg` | Default Favicon (Replace this). |
| `src/` | **Source Code**. All development happens here. |
| `.gitignore` | Tells Git which files to ignore. |
| `eslint.config.js` | Code linting rules. |
| `index.html` | The main entry HTML file. **SEO Title starts here.** |
| `package.json` | Project scripts and dependency list. |
| `postcss.config.js` | Required for Tailwind CSS to work. |
| `tailwind.config.js` | Tailwind Customization (Colors, Fonts, Screens). |
| `vite.config.js` | Vite Configuration (Ports, Aliases). |

### **Source Directory (`src/`)**
| Path | Purpose |
|------|---------|
| `src/assets/` | Store images, SVGs, and fonts here. |
| `src/Components/` | Reusable UI blocks. |
| ├── `Footer/` | Global Footer component. |
| ├── `Navbar/` | Global Navigation component. |
| ├── `Seo/` | **SEO Logic**. Manages Meta Tags, Open Graph, and Twitter Cards. |
| `src/Pages/` | Main Views (Routes). |
| ├── `Contact/` | Contact Form page (Integrates with `send_email.php`). |
| ├── `Home/` | Landing Page. |
| ├── `NotFound/` | Custom 404 Error Page. |
| `src/App.css` | Component-specific styles (Optional, mostly replaced by Tailwind). |
| `src/App.jsx` | **Main Router Logic**. Define all your website routes here. |
| `src/index.css` | Global Styles + Tailwind Directives (`@tailwind base...`). |
| `src/main.jsx` | React Entry Point. Wraps App in Providers (Router, Helmet). |

---

## ✅ 2. New Project Checklist (Start Here)

When starting a fresh project, follow these steps in order:

### **Phase 1: Branding & Cleanup**
- [ ] **`index.html`**:
    - Update `<title>` tag.
    - Update `<meta name="description">`.
    - Change the favicon (`<link rel="icon" ...>`).
- [ ] **`public/vite.svg`**: Delete or replace with your actual logo.
- [ ] **`src/Components/Navbar/Navbar.jsx`**: Update the Logo/Brand text.
- [ ] **`src/Components/Footer/Footer.jsx`**: Update the Copyright Year & Company Name.
- [ ] **`tailwind.config.js`**: (Optional) Add your brand colors if needed.

### **Phase 2: SEO Configuration (Crucial)**
*These steps ensure Google finds and ranks your site.*

- [ ] **`src/Components/Seo/Seo.jsx`**:
    - **Line 6:** Change `siteTitle` to your client's Business Name.
    - **Line 7:** Change `domain` to the **Live URL** (e.g., `https://my-client.com`).
- [ ] **`public/robots.txt`**:
    - Update the Sitemap URL: `Sitemap: https://my-client.com/sitemap.xml`
- [ ] **Create `public/sitemap.xml`**:
    - Create this file manually. It does not exist by default.
    - List all your pages (`/`, `/about`, `/contact`).
    - *Use an online generator like xml-sitemaps.com once the site is live.*

### **Phase 3: Contact Form & Backend**
- [ ] **`public/send_email.php`**:
    - **Line 42 (`$to`):** Change this to the email address that receives inquiries.
    - **Line 55 (`From`):** Change to `no-reply@your-domain.com`.
- [ ] **`src/Pages/Contact/Contact.jsx`**:
    - Customize the `<select>` dropdown options (Services) to match the business.
    - Ensure the API endpoint in `fetch` matches `/send_email.php`.

### **Phase 4: Routing (Adding Pages)**
1. Create a new folder: `src/Pages/About/`.
2. Create `About.jsx` inside it.
3. Open **`src/App.jsx`**:
   - Import the page: `const About = lazy(() => import("Pages/About/About"));`
   - Add the route: `<Route path="/about" element={<About />} />`

---

## 🚀 3. Deployment Guide

### **Build for Production**
Run this command to create the optimized files:
```bash
npm run build