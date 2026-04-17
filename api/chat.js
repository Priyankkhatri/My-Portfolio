export const config = {
    runtime: 'edge', // Using Edge runtime since we just use fetch() instead of Node fs/express
}

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

**Primary Projects:**
1. API Image Gallery — Dynamic search & lazy loading. Tech: HTML5, CSS3, JS, Pexels API, Netlify. Live: https://api-image-gallery.netlify.app | Year: 2025
2. Movie Explorer — Cinematic details & dynamic search. Tech: React.js, Tailwind CSS, OMDb API, Netlify. Live: https://api-movie-explorer.netlify.app | Year: 2026
3. Weather API — [Upcoming] Personal API wrapper with caching. Tech: Node.js, Redis/Mongo, Render. Year: Planned

**Clone Websites (Pixel-perfect brand recreations):**
1. Beyond Snack — Beyond Snack website clone. Live: https://beyond-snack.netlify.app
2. DJI — DJI tech store clone. Live: https://dji-clone.netlify.app
3. Drink Prime — Prime drinks website clone. Live: https://drinkprime-clone.netlify.app
4. Nothing — Nothing phone website clone. Live: https://nothing-india.netlify.app
5. Snitch — Snitch fashion website clone. Live: https://clone-snitch.netlify.app
6. Soylent — Soylent nutrition website clone. Live: https://soylent-clone.netlify.app

**Mini Games (Interactive logic challenges):**
1. Tic Tac Toe — Classic game. Live: https://tictactoee-game.netlify.app
2. Todo List — Productivity app. Live: https://todo-lists-game.netlify.app
3. Memory Flipping — Concentration game. Live: https://memory-flipping-game.netlify.app
4. Typing Speed Test — Real-time typing evaluation. Live: https://typing-tester-game.netlify.app
5. Whack A Mole — Reflex game. Live: https://whack-a-mole-gamee.netlify.app
6. Guess The Color — HSL color guessing game. Live: https://guessing-the-color-game.netlify.app
7. Click Counter — Simple click tracking. Live: https://click-counting.netlify.app

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

export default async function handler(req) {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        })
    }

    try {
        const body = await req.json()
        const { message } = body

        if (!message || typeof message !== 'string') {
            return new Response(JSON.stringify({ error: 'Message is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            })
        }

        // Call the free text.pollinations.ai endpoint
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

        return new Response(JSON.stringify({ response: responseText }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })

    } catch (error) {
        console.error('AI API error:', error.message || error)
        return new Response(JSON.stringify({
            error: 'Failed to generate response',
            details: error.message,
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}
