<div align="center">

# Allify

<br />

<img src="https://allify-sv.netlify.app/open-graph-images/og-image-allify.webp" width="600" alt="Allify banner" />

**Everything about your music, connected in one place.**

Connect your streaming services, track detailed metrics, get personalized suggestions and compete in rankings with your friends.

[![Deploy on Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)](https://allify-sv.netlify.app/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-2.x-FF3E00?style=flat-square&logo=svelte&logoColor=white)](https://kit.svelte.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[🌐 Live App](https://allify-sv.netlify.app/) • [👤 LinkedIn](https://www.linkedin.com/in/igorgabriel-dev/) • [🐙 GitHub](https://github.com/stwsz)

</div>

<br />

## 📖 About

**Allify** is a web platform that centralizes your music data in one place. With it, you understand your listening habits through real metrics, discover new music based on your taste, and compete in music battles with friends.

<br />

## ✨ Features

- **🎵 My Musical Profile** — View your most listened tracks, artists and albums with detailed metrics generated from your streaming account.
- **🔍 Discoveries** — Get personalized music and artist suggestions based on your real listening history.
- **⚔️ Music Battles** — Compete in rankings with your friends and see who has the most diverse or intense music taste.
- **🌐 Multi-language** — Interface available in multiple languages.
- **📱 Responsive** — Access from any device with a smooth and consistent experience.

<br />

## 🔗 Integrations

| Platform                                                                                               | Status         |
| ------------------------------------------------------------------------------------------------------ | -------------- |
| ![Spotify](https://img.shields.io/badge/Spotify-1DB954?style=flat-square&logo=spotify&logoColor=white) | ✅ Supported   |
| ![Deezer](https://img.shields.io/badge/Deezer-FF0000?style=flat-square&logo=deezer&logoColor=white)    | 🚧 Coming soon |

<br />

## 🚀 How to use

1. Go to [allify-sv.netlify.app](https://allify-sv.netlify.app/)
2. Click **"Connect my streamings"**
3. Log in with your **Spotify** account
4. Explore your musical profile, discover new music and join battles!

<br />

## 🛠️ Tech Stack

| Technology                                                                            | Version         | Purpose                        |
| ------------------------------------------------------------------------------------- | --------------- | ------------------------------ |
| [Svelte 5](https://svelte.dev/)                                                       | `^5.51.3`       | Component framework            |
| [SvelteKit 2](https://kit.svelte.dev/)                                                | `^2.50.2`       | Full-stack framework / routing |
| [TypeScript](https://www.typescriptlang.org/)                                         | `^5.9.3`        | Static typing                  |
| [Tailwind CSS 4](https://tailwindcss.com/)                                            | `^4.1.17`       | Styling                        |
| [Vite 7](https://vitejs.dev/)                                                         | `^7.3.1`        | Bundler / dev server           |
| [Netlify Adapter](https://github.com/sveltejs/kit/tree/main/packages/adapter-netlify) | `^6.0.0`        | Netlify deployment             |
| [PostCSS](https://postcss.org/)                                                       | `^8.5.6`        | CSS processing                 |
| [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)                      | `^9.x` / `^3.x` | Linting and formatting         |

<br />

## 🗂️ Route Structure

```
/                        → Landing page
/my-musical-profile      → User musical profile
/discoveries             → Personalized suggestions
/music-battles           → Music battles
/privacy-policy          → Privacy policy
/terms-of-service        → Terms of service
/data-usage              → Data usage
```

<br />

## ⚙️ Running locally

```bash
# Clone the repository
git clone https://github.com/stwsz/allify.git
cd allify

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in your credentials

# Start the development server
npm run dev
```

<br />

### Environment variables

```env
# Allify
ALLIFY_URL=

# Spotify
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REDIRECT_URI=

# Anthropic
ANTHROPIC_API_KEY=
```

<br />

## 📦 Available scripts

| Command               | Description                      |
| --------------------- | -------------------------------- |
| `npm run dev`         | Start the development server     |
| `npm run build`       | Generate the production build    |
| `npm run preview`     | Preview the build locally        |
| `npm run check`       | Type-check with `svelte-check`   |
| `npm run check:watch` | Type-check in watch mode         |
| `npm run lint`        | Check formatting and lint errors |
| `npm run format`      | Format code with Prettier        |

<br />

## 📄 Legal

- [Privacy Policy](https://allify-sv.netlify.app/privacy-policy)
- [Terms of Service](https://allify-sv.netlify.app/terms-of-service)
- [Data Usage](https://allify-sv.netlify.app/data-usage)

<br />

---

<div align="center">

Made with 🎶 by [STWSZ](https://github.com/stwsz)

© 2026 Allify. All rights reserved.

</div>
