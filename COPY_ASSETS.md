# Portfolio Copy Assets

## LinkedIn Profile
**Headline:**
`Aspiring Frontend Developer | BTech CSE @ Coding Gita`

**About (Summary):**
`2nd-sem CSE student building web projects with JavaScript, Node.js and MongoDB. I deploy apps on Netlify/Render and create small browser games to sharpen fundamentals. Open to internships and small collaborations.`

---

## GitHub Profile README (`README.md`)
```markdown
Hi, I'm Priyank 👋
BTech CSE student exploring frontend & backend development.
🔭 Working on: API Image Gallery, Movie Explorer
📺 Demos: https://www.youtube.com/@PriyankCreates

📫 Contact: priyank@example.com
```

---

## Project README Template

```markdown
# [Project Name]

> **What I built:** [One line summary, e.g. "Image gallery using a custom REST API with search, filters and lazy loading."]

## Live Demo
[Link to live site]

## What I Learned
- [Learning point 1, e.g. "Building and consuming a custom REST API"]
- [Learning point 2, e.g. "Lazy load images and basic pagination"]

## Tech Stack
- Frontend: HTML, CSS, Vanilla JS
- Backend: Node.js, Express, MongoDB
- Deployment: Netlify / Render

## How to Run Locally
1. Clone the repository: `git clone https://github.com/Priyankkhatri/...`
2. Install dependencies: `npm install`
3. Create a `.env` file with your credentials (e.g., `MONGO_URI`, `PORT=3000`)
4. Start the server/app: `npm run dev` or `npm start`
```

---

## Deployment Instructions

### Netlify (Frontend)
1. Push your frontend code to GitHub.
2. Log into Netlify -> Add new site -> Import an existing project.
3. Connect your GitHub and select the repository.
4. If using standard HTML/CSS/JS, leave build command empty and publish directory as `/`. 
5. If using Vite/React, set build command to `npm run build` and publish directory to `dist`.
6. Click **Deploy site**.

### Render (Backend)
1. Push your Node.js/Express app to GitHub.
2. Log into Render -> New -> Web Service.
3. Connect your GitHub repo.
4. Set Build Command to `npm install` and Start Command to `node server.js` (or similar).
5. Add any environment variables under "Environment" (like `MONGO_URI`).
6. Click **Create Web Service**.
