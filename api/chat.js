import { owner, techStack, experience, interests, socials } from '../src/data/portfolioData.js'
import { projects } from '../src/data/projectsData.js'
import certificates from '../src/data/certificatesData.js'

export const config = {
    runtime: 'edge', // Using Edge runtime since we just use fetch() instead of Node fs/express
}

const portfolioContext = `You are an AI assistant for Priyank Khatri's developer portfolio website. 
Answer questions about the portfolio owner using ONLY the data provided below.
If the question is unrelated to the portfolio, politely redirect the conversation back to the portfolio.
Keep answers concise, well-formatted, and use numbered lists when listing items.
Use emojis sparingly for visual appeal. Do NOT use markdown headers (##) — use bold text instead.

=== PORTFOLIO DATA ===

**Owner:**
- Name: ${owner.name}
- Title: ${owner.title}
- Degree: ${owner.degree} (${owner.semester})
- Institute: ${owner.institute}
- Location: ${owner.location}
- Availability: ${owner.availability}
- Email: ${owner.email}
- Bio: ${owner.bio}

**Tech Stack:**
${techStack.map(t => `- ${t.category}: ${t.label}`).join('\n')}

**Primary Projects:**
${projects.map((p, idx) => `${idx + 1}. ${p.title} — ${p.shortDescription}. Tech: ${p.techStack.map(t => t.name).join(', ')}. Live: ${p.liveUrl || 'N/A'} | GitHub: ${p.githubUrl || 'N/A'} | Year: ${p.year}`).join('\n')}

**Certificates:**
${certificates.map((c, idx) => `${idx + 1}. ${c.title} — ${c.issuer}, ${c.date}, Category: ${c.category}${c.grade ? `, Grade: ${c.grade}` : ''}${c.credentialId ? `, Credential ID: ${c.credentialId}` : ''}${c.credentialUrl ? `, Verify: ${c.credentialUrl}` : ''}`).join('\n')}

**Experience/Journey:**
${experience.map(e => `- ${e.year}: ${e.title} — ${e.desc}`).join('\n')}

**Interests & Hobbies:**
${interests.map(i => `- ${i.icon} ${i.label} (${i.desc})`).join('\n')}

**Social Links:**
${socials.map(s => `- ${s.label}: ${s.href} (${s.desc})`).join('\n')}

=== END PORTFOLIO DATA ===`

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
