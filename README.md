# Brent Zey - Synthwave Personal Site

Welcome to the source code for my personal portfolio and hub, designed with a retro-futuristic, "Synthwave / 84 Blues / Miami Blade Runner" aesthetic.

## 🚀 Overview

This site is built to be fast, highly responsive, and visually striking. It utilizes modern web standards while embracing an '80s/'90s cyberpunk design philosophy, featuring:
- **Neon Color Palette**: Deep darks, striking cyans, hot pinks, and vibrant purples.
- **Light & Dark Mode**: Persistent theme toggling, defaulting to a dark, neon-lit environment.
- **Focus Pages**: Dedicated views for `About`, `Work`, `Interests`, and a placeholder-ready `Gallery`.
- **Techno-Dripping Aesthetics**: Animated scanlines, glowing text, and particle-like background gradients.

## 🛠 Tech Stack

- **[Astro](https://astro.build/)**: The core framework. Used for its zero-JS-by-default architecture and excellent routing.
- **[Tailwind CSS v4](https://tailwindcss.com/)**: For rapid styling, custom `@theme` variables, and responsive design.
- **[Lucide React](https://lucide.dev/)**: For sleek, consistent vector iconography.
- **[Bun](https://bun.sh/)**: The incredibly fast JavaScript runtime and package manager used for this project.

## 📂 Project Structure

```text
/
├── public/               # Static assets (favicons, etc.)
├── src/
│   ├── layouts/
│   │   └── Layout.astro  # The main wrapper containing the navbar, footer, and theme logic
│   ├── pages/
│   │   ├── index.astro   # The main landing hub
│   │   ├── about.astro   # Academic & professional background
│   │   ├── work.astro    # Projects, open source, and client sites
│   │   ├── interests.astro # Hobbies and off-screen pursuits
│   │   └── gallery.astro # Photo gallery
│   └── styles/
│       └── global.css    # Tailwind v4 configuration, synthwave theme variables, and custom animations
└── package.json
```

## 📸 Updating the Gallery

Due to Google Photos' restrictions on direct hotlinking and scraping, the `gallery.astro` page currently utilizes beautifully styled synthwave placeholders.

**To add your real photos:**
1. Open `src/pages/gallery.astro`.
2. Locate the `placeholders.map` loop.
3. Replace the placeholder data array with real objects containing your direct image URLs (e.g., hosted on a CDN, Cloudinary, Imgur, or placed locally in the `public/images/` folder).
4. Swap the inner `<div>` gradient with standard `<img src={item.url} />` tags.

## 🧞 Commands

All commands are run from the root of the project:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `bun install`             | Installs dependencies                            |
| `bun dev`                 | Starts local dev server at `localhost:4321`      |
| `bun build`               | Builds the production site to `./dist/`          |
| `bun preview`             | Previews the production build locally            |

## ☕ Support

If you like what you see or found some of my open-source work helpful, consider buying me a coffee:
**[Support Me / Buy Me A Coffee](https://buymeacoffee.com/brentmzey)**

---

*“Engineering the future with a neon edge.”*
