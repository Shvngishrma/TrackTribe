# 🥳 SUPERCRAZYCAPSTONE PROJECT


**The ultimate party companion. Host. Join. Dance. Connect. Let the beats drop.**

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?logo=next.js)](https://nextjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Styled%20with-TailwindCSS-blue?logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/Powered%20by-TypeScript-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🚀 What is SuperCrazyCap?

**SuperCrazyCap** is a web app where users can:
- 🎉 **Host** the craziest parties.
- 🧑‍🎤 **Join** parties with a unique code.
- 🔍 **Discover** parties happening nearby.
- 🔐 Ensure access only for RSVPed & verified guests.
- 🧾 Keep party info safe, organized, and electrifying.

---

## 🔧 Tech Stack

| Frontend | Styling | Backend (Planned) | Auth | Others |
|----------|---------|-------------------|------|--------|
| Next.js (App Router) | TailwindCSS | tRPC / Express (TBD) | Auth.js / Clerk / Supabase (TBD) | Google Maps API (for party locators) |

---

## 📁 Folder Structure

client/
├── public/
│   └── images, favicon, etc.
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── (routes)
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── JoinModal.tsx
│   │   └── ...
│   ├── styles/
│   │   └── globals.css
│   └── utils/
│       └── helpers.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json

---

## 🖼️ Wireframes

Low-Fi Wireframes created collaboratively with ChatGPT (Figma Link coming soon)

- 🎯 Landing Page
- 🔐 Join Modal
- 👤 User Profile / Login
- 🎊 Party Dashboard
- 📍 Party Discovery

---

## 🎨 Color Palette

| Element       | Color         | Hex        |
|---------------|---------------|------------|
| Background    | Dark Purple   | `#1E0028`  |
| Primary CTA   | Electric Pink | `#FF3CAC`  |
| Accent Glow   | Neon Blue     | `#4CFFFC`  |
| Text          | White / Gray  | `#FFFFFF`, `#E0E0E0` |

---

## ✨ Features (Planned & Implemented)

- [x] Next.js + TailwindCSS setup
- [x] Beautiful mobile-first responsive design
- [x] Landing page with call-to-action
- [x] Join Party Modal
- [ ] User Login / Registration
- [ ] Host a Party dashboard
- [ ] Admin RSVP verification
- [ ] Nearby Party Discovery with Google Maps
- [ ] Profile management
- [ ] Real-time party updates (Socket.io or similar)

---

## 🛠️ Run Locally

```bash
git clone https://github.com/Shvngishrma/trackTribe.git
cd trackTribe/client
npm install
npm run dev
```

---

## 👨‍💻 Contributing

We welcome PRs and ideas! Just fork, clone, branch, and open a PR.  
Let’s make the craziest party experience ever!

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more info.

---

## ❤️ Made with caffeine, chaos & code by [Shivangi](https://github.com/shvngishrma)
