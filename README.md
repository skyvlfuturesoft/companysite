<h1 align="center">
  <img src="public/favicon.svg" width="60" alt="Skyvl Logo" /><br />
  Skyvl Future Soft — Company Website
</h1>

<p align="center">
  <strong>Premium Web Development Agency Website</strong><br/>
  Modern, animated, high-performance company site built with Vite + Vanilla JS
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/CSS3-Modern-1572B6?logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/Supabase-Integrated-3ECF8E?logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/EmailJS-Integrated-FF6B6B" alt="EmailJS" />
</p>

---

## 🌐 Live Preview

> Deploy this project to Vercel, Netlify, or any static host.  
> Contact: [skyvlfuturesoft@gmail.com](mailto:skyvlfuturesoft@gmail.com)

---

## ✨ Features

- 🚀 **Blazing Fast** — Powered by Vite for instant HMR and optimized builds
- 🎨 **Premium Design** — Glassmorphism, gradient text, particle canvas effects
- 🌓 **Dark / Light Mode Toggle** — Smooth theme switching with localStorage persistence
- 📱 **Fully Responsive** — Mobile-first layout, works on all screen sizes
- 🎞️ **AOS Animations** — Scroll-triggered entrance animations on every section
- ✍️ **Typed.js Effect** — Dynamic typing animation in the Hero section
- 💬 **Contact Form** — Integrated with Supabase (DB) + EmailJS (email notifications)
- 📊 **Scroll Progress Bar** — Visual reading/scroll indicator at the top
- 💡 **Particle Canvas** — Interactive animated background in the hero section
- 🌊 **Floating WhatsApp Button** — Quick one-click WhatsApp contact
- ⬆️ **Back-to-Top Button** — Smooth scroll back to the top
- 🔍 **SEO Ready** — Meta tags, semantic HTML, descriptive titles

---

## 🗂️ Project Structure

```
company-site/
├── public/
│   ├── favicon.svg              # Site favicon
│   ├── hero-preview.png         # Hero / portfolio image
│   ├── portfolio-business.png   # Portfolio image
│   ├── portfolio-ecommerce.png  # Portfolio image
│   ├── portfolio-portfolio.png  # Portfolio image
│   └── icons.svg                # Icon assets
├── src/
│   ├── main.js                  # All JavaScript logic
│   ├── style.css                # Full CSS styling system
│   └── counter.js               # (Utility)
├── index.html                   # Main HTML entry point
├── package.json                 # Project config & scripts
├── .gitignore                   # Git ignore rules
└── README.md                    # This file
```

---

## 📄 Sections

| # | Section       | Description                                      |
|---|---------------|--------------------------------------------------|
| 1 | **Hero**      | Animated intro with typed text & particle canvas |
| 2 | **About**     | Agency story, mission & vision cards             |
| 3 | **Services**  | 6 service cards with hover effects               |
| 4 | **Portfolio** | Filterable project showcase with overlays        |
| 5 | **Why Us**    | Key differentiators with animated stats          |
| 6 | **Contact**   | Form with Supabase + EmailJS integration         |
| 7 | **Footer**    | Links, social icons, contact info                |

---

## 🛠️ Tech Stack

| Technology     | Purpose                              |
|----------------|--------------------------------------|
| **Vite 8**     | Build tool & dev server              |
| **HTML5**      | Semantic page structure              |
| **CSS3**       | Styling, glassmorphism, animations   |
| **JavaScript** | Logic, interactivity, animations     |
| **Supabase**   | Contact form data storage            |
| **EmailJS**    | Contact form email notifications     |
| **AOS.js**     | Scroll-triggered animations          |
| **Font Awesome** | Icons                              |
| **Google Fonts** | Poppins & Inter typography         |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/skyvlfuturesoft/company-site.git

# 2. Navigate into the project directory
cd company-site

# 3. Install dependencies
npm install
```

### Development

```bash
# Start the local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
# Build optimised files for production
npm run build

# Preview the production build locally
npm run preview
```

---

## ⚙️ Configuration

### Supabase (Contact Form Storage)

In `src/main.js`, update with your own Supabase credentials:

```js
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';
```

Create a `contacts` table in Supabase with the following columns:

| Column    | Type   |
|-----------|--------|
| id        | int8   |
| name      | text   |
| email     | text   |
| phone     | text   |
| service   | text   |
| message   | text   |
| created_at | timestamptz |

### EmailJS (Contact Form Email Notifications)

In `src/main.js`, replace with your EmailJS credentials:

```js
emailjs.init('YOUR_PUBLIC_KEY');
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', { ... });
```

---

## 📞 Contact

| Channel    | Details                                     |
|------------|---------------------------------------------|
| 📧 Email   | [skyvlfuturesoft@gmail.com](mailto:skyvlfuturesoft@gmail.com) |
| 📞 Phone   | +91 86103 62451 / +91 72005 25770           |
| 🌍 Location | India 🇮🇳 — Working Globally               |
| 💬 WhatsApp | [Chat Now](https://wa.me/918610362451)     |
| 🐙 GitHub  | [github.com/skyvlfuturesoft](https://github.com/skyvlfuturesoft) |

---

## 📄 License

© 2026 **Skyvl Future Soft**. All rights reserved.  
Made with ❤️ in India.
