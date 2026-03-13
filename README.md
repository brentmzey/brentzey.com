# Brent Zey | brentzey.com

Welcome to the source code for my personal portfolio and digital hub. This site is designed with a retro-futuristic, **"Synthwave / '84 Blues / Miami Blade Runner"** aesthetic, reflecting my passion for engineering, design, and creative exploration.

## 🚀 Featured Open Source

### [BSide](https://github.com/brentmzey/lovebside)
An upcoming project focused on love and community. Built with **Kotlin Multiplatform (KMP/KMM)** and **Compose Multiplatform** for a truly native experience across all platforms.
- **Key Technologies:** Kotlin, KMP, KMM, Compose Multiplatform (Multiplatform UI).

### [Sanctuary Stream](https://github.com/brentmzey/sanctuary-stream)
A **Secure-by-Design** church streaming control system. It empowers parishes to manage professional OBS (Open Broadcaster Software) streams from any device, reducing costs while maintaining high-quality liturgical ministry standards.
- **Key Features:** One-click start/stop, real-time health monitoring, and multi-platform support (Desktop, Mobile, Web).

## 🛠 Tech Stack

- **[Astro 6.0](https://astro.build/)**: The core framework for high-performance, content-focused websites.
- **[Bun](https://bun.sh/)**: The incredibly fast JavaScript runtime, package manager, and bundler powering the entire development and build pipeline.
- **[Tailwind CSS v4](https://tailwindcss.com/)**: For rapid, modern styling with a custom neon theme.
- **[Lucide React](https://lucide.dev/)**: Sleek, consistent vector iconography.
- **[Framer Motion](https://www.framer.com/motion/)**: Fluid, high-performance animations for that authentic synthwave feel.

## ⚡ Why Bun? (Performance Benchmarks)

This project is optimized to run on **Bun**. By switching from Node.js to Bun, the development experience and build performance are significantly improved.

| Metric | Node.js (22+) | Bun (1.1+) | Winner |
| :--- | :--- | :--- | :--- |
| **Cold Start** | ~150ms - 200ms | **~10ms - 50ms** | **Bun** 🚀 |
| **Build Speed (I/O)** | Baseline | **15–30% Faster** | **Bun** 🚀 |
| **SSR Throughput** | ~35k RPS | **~90k+ RPS** | **Bun** 🚀 |
| **Memory Usage** | Higher (V8) | **50% Lower (JSC)** | **Bun** 🚀 |
| **Install Speed** | Baseline | **10–30x Faster** | **Bun** 🚀 |

Using Bun reduces CI/CD pipeline times by **30–70%** and ensures the fastest possible iteration cycles during development.

## 🧞 Commands

All commands are run from the root of the project using **Bun**:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `bun install`             | Installs dependencies (blazing fast)             |
| `bun dev`                 | Starts local dev server at `localhost:4321`      |
| `bun build`               | Builds the production site to `./dist/`          |
| `bun preview`             | Previews the production build locally            |

## 📂 Project Structure

```text
/
├── public/               # Static assets (favicons, profile pics, resume)
├── src/
│   ├── components/       # Interactive React components (Gallery, Music, etc.)
│   ├── layouts/          # The main wrapper with navbar, footer, and theme logic
│   ├── pages/            # Site routes (Home, About, Work, Interests, Gallery)
│   ├── styles/           # Global CSS and Tailwind v4 neon theme configuration
│   └── api/              # Serverless API endpoints (e.g., Now Playing)
└── package.json
```

## 📸 Updating the Gallery

The `gallery.astro` page uses a masonry layout to showcase photography. To update:
1. Add your images to `src/assets/gallery/`.
2. Update the gallery component in `src/pages/gallery.astro` to include the new assets.
3. The site will automatically handle responsive image optimization via Astro's Image service.

## ☕ Support

If you find my work or open-source projects like **Sanctuary Stream** helpful, consider supporting my journey:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/brentmzey)

---

*“Engineering impactful solutions across healthcare, open source, and creative exploration.”*
