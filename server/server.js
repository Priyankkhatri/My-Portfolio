import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3002

app.use(cors())
app.use(express.json())

/* ── Portfolio data (system context for AI) ──────────── */
const portfolioContext = `
You are an AI assistant for Priyank Khatri's developer portfolio website. 
Answer questions about the portfolio owner using ONLY the data provided below.
If the question is unrelated to the portfolio, politely redirect the conversation back to the portfolio.
Keep answers concise, well-formatted, and use numbered lists when listing items.
Use emojis sparingly for visual appeal. Do NOT use markdown headers (##) — use bold text instead.

=== PORTFOLIO DATA ===

**Owner:**
- Name: Priyank Khatri
- Title: Aspiring Software Developer
- Degree: B.Tech CSE (2nd Semester)
- Institute: Coding Gita (Offline Institute)
- Location: India
- Availability: Open to internships
- Email: priyank.khatri.cg@gmail.com
- Bio: 2nd-semester Computer Science student at Coding Gita. Builds small web apps (image galleries, movie explorers), REST APIs with Node.js + MongoDB, and browser games with HTML/CSS/JS. Currently learning React/Next.js, data structures, and backend architecture. Loves experimenting with UI/UX, performance optimization, and system fundamentals.

**Tech Stack:**
- Languages: C/C++, JavaScript
- Frontend: HTML/CSS, React, Next.js, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB
- Deployment: Netlify, Render
- Tools: Git/GitHub, Chrome DevTools

**Projects:**
1. API Image Gallery — Dynamic search & lazy loading. Responsive image gallery using Pexels API. Tech: HTML5, CSS3, JS, Pexels API, Netlify. Live: https://api-image-gallery.netlify.app | Year: 2025
2. Movie Explorer — Cinematic details & dynamic search using OMDb API. Tech: React.js, Tailwind CSS, OMDb API, Netlify. Live: https://api-movie-explorer.netlify.app | Year: 2026
3. Weather API — [Upcoming] Personal API wrapper with caching. Tech: Node.js, Redis/Mongo, Render. Year: Planned
4. Mini Games — Snake, Tic Tac Toe (Minimax AI), Memory Match, Typing Speed Test. Tech: Vanilla JS, HTML, CSS. Year: 2025

**Certificates:**
1. Introduction to Front-End Development — Coursera (Meta), Feb 24 2026, Grade: 99%, Credential ID: OEJDQXOP4W5Y, Verify: https://coursera.org/verify/OEJDQXOP4W5Y (Completed)
2. Introduction to Back-End Development — Coursera (Meta) (Upcoming)
3. Maximize Productivity With AI Tools — Coursera (Google) (Upcoming)

**Experience/Journey:**
- Currently: 2nd-Semester B.Tech CSE at Coding Gita
- 2026: Building Projects — Creating APIs and React apps to learn
- 2025: Started Journey — Exploring fundamentals of computer science

**Interests & Hobbies:**
- 🏸 Badminton (Competitive player)
- ⚽ Football (Casual/competitive)
- 📷 Photography (Street & landscape)
- 🏎️ Cars (BMW M4 enthusiast)
- 📱 Tech Tinkering (Android rooting & custom ROMs)

**Social Links:**
- GitHub: https://github.com/Priyankkhatri
- LinkedIn: https://www.linkedin.com/in/priyankkhatrii/
- YouTube: https://www.youtube.com/@PriyankCreates
- LeetCode: https://leetcode.com/u/priyankkhatrii/
- Instagram: https://www.instagram.com/priyankhatrii/
- X (Twitter): https://x.com/PriyankKhatrii

=== END PORTFOLIO DATA ===
`

/* ── Chat endpoint using Free Pollinations API ──────────── */
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body

        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Message is required' })
        }

        // Call the free text.pollinations.ai endpoint
        // This accepts OpenAI-style message payloads directly
        const fetchResponse = await fetch('https://text.pollinations.ai/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [
                    { role: 'system', content: portfolioContext },
                    { role: 'user', content: message }
                ],
                model: 'openai'
            })
        })

        if (!fetchResponse.ok) {
            throw new Error(`Pollinations API error: ${fetchResponse.statusText}`)
        }

        const responseText = await fetchResponse.text()

        res.json({ response: responseText })
    } catch (error) {
        console.error('AI API error:', error.message || error)
        res.status(500).json({
            error: 'Failed to generate response',
            details: error.message,
        })
    }
})

/* ── Health check ────────────────────────────────────────── */
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', provider: 'pollinations.ai' })
})

app.listen(PORT, () => {
    console.log(`✨ Portfolio AI server running on http://localhost:${PORT}`)
})
