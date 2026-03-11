/**
 * AI Chat Engine — local keyword-matching assistant
 * No external API needed, answers by searching portfolioData.
 */

import { owner, techStack, projects, certificates, experience, interests, socials } from '../data/portfolioData'

/* ── Intent Detection ────────────────────────────────────── */

const intentPatterns = [
    {
        intent: 'greeting',
        patterns: [/^(hi|hello|hey|hola|howdy|greetings|yo|sup|what's up|whats up)/i],
    },
    {
        intent: 'about',
        patterns: [/who (is|are)|about (him|her|you|the|priyank)|tell me about|introduction|introduce|bio|background|summary/i],
    },
    {
        intent: 'projects',
        patterns: [/project|built|build|portfolio work|apps?|websites?|work|created|made/i],
    },
    {
        intent: 'certificates',
        patterns: [/certific|credential|course|award|certificat|coursera|meta|google/i],
    },
    {
        intent: 'skills',
        patterns: [/skill|tech|technolog|stack|language|framework|tool|know|proficien|learn|use/i],
    },
    {
        intent: 'education',
        patterns: [/educat|study|stud(ying|ies|ent)|college|university|degree|b\.?tech|cse|semester|school|institute/i],
    },
    {
        intent: 'experience',
        patterns: [/experience|journey|timeline|career|work history/i],
    },
    {
        intent: 'interests',
        patterns: [/interest|hobb|hobbies|passion|beyond code|free time|like to do|fun/i],
    },
    {
        intent: 'contact',
        patterns: [/contact|reach|email|mail|connect|social|github|linkedin|youtube|leetcode|instagram|twitter|x\.com/i],
    },
    {
        intent: 'availability',
        patterns: [/availab|hire|intern|job|opportunit|collaborat|open to/i],
    },
]

function detectIntent(message) {
    const msg = message.toLowerCase().trim()
    for (const { intent, patterns } of intentPatterns) {
        for (const pattern of patterns) {
            if (pattern.test(msg)) return intent
        }
    }
    return 'unknown'
}

/* ── Response Generators ─────────────────────────────────── */

function greetingResponse() {
    const greetings = [
        `Hey there! 👋 I'm Priyank's portfolio assistant. I can tell you about his **projects**, **skills**, **certificates**, **education**, and more. What would you like to know?`,
        `Hello! 🚀 Welcome to Priyank's portfolio. Ask me anything — projects, tech stack, certificates, or just say "tell me about Priyank"!`,
        `Hi! ✨ I know everything about this portfolio. Try asking about **projects**, **skills**, **certificates**, or **education**!`,
    ]
    return greetings[Math.floor(Math.random() * greetings.length)]
}

function aboutResponse() {
    return `## ${owner.name}\n**${owner.title}** · ${owner.degree} (${owner.semester})\n\n${owner.bio}\n\n📍 ${owner.location} · 🎓 ${owner.institute}\n\n💡 *${owner.availability}*`
}

function projectsResponse() {
    let response = `## Projects (${projects.length})\n\nHere are Priyank's projects:\n\n`
    projects.forEach((p, i) => {
        const status = p.year === 'Planned' ? '🔮 Upcoming' : '✅ Completed'
        response += `**${i + 1}. ${p.title}** — *${p.tagline}*\n`
        response += `${p.description}\n`
        response += `🛠️ Tech: ${p.tech.join(', ')}\n`
        response += `📅 ${p.year} · ${p.role} · ${status}\n`
        if (p.live && p.live !== '#') {
            response += `🔗 [Live Demo](${p.live})\n`
        }
        response += `\n`
    })
    return response.trim()
}

function certificatesResponse() {
    let response = `## Certificates & Credentials (${certificates.length})\n\n`
    certificates.forEach((c, i) => {
        const statusIcon = c.status === 'Completed' ? '✅' : '⏳'
        response += `**${i + 1}. ${c.title}**\n`
        response += `${statusIcon} ${c.issuer} · ${c.date}\n`
        response += `📂 Category: ${c.category}\n`
        if (c.grade) response += `📊 Grade: ${c.grade}\n`
        if (c.credentialId) response += `🔑 Credential ID: ${c.credentialId}\n`
        if (c.credentialUrl) response += `🔗 [Verify](${c.credentialUrl})\n`
        response += `\n`
    })
    return response.trim()
}

function skillsResponse() {
    let response = `## Tech Stack (${techStack.length} technologies)\n\n`
    const grouped = {}
    techStack.forEach((t) => {
        if (!grouped[t.category]) grouped[t.category] = []
        grouped[t.category].push(t)
    })
    Object.entries(grouped).forEach(([category, techs]) => {
        response += `**${category}:**\n`
        techs.forEach((t) => {
            response += `  ${t.icon} ${t.label}\n`
        })
        response += `\n`
    })
    return response.trim()
}

function educationResponse() {
    return `## Education\n\n🎓 **${owner.degree}** — ${owner.semester}\n🏫 ${owner.institute}\n📍 ${owner.location}\n\nPriyank is currently pursuing his Bachelor of Technology in Computer Science & Engineering. He started his journey in 2025, exploring fundamentals of computer science, and is now building projects with React, Node.js, and more.`
}

function experienceResponse() {
    let response = `## Journey & Experience\n\n`
    experience.forEach((e) => {
        response += `**${e.year}** — ${e.title}\n${e.desc}\n\n`
    })
    return response.trim()
}

function interestsResponse() {
    let response = `## Interests & Hobbies\n\nBeyond coding, Priyank enjoys:\n\n`
    interests.forEach((i) => {
        response += `${i.icon} **${i.label}** — ${i.desc}\n`
    })
    return response.trim()
}

function contactResponse() {
    let response = `## Connect with Priyank\n\n📧 Email: ${owner.email}\n\n**Social Links:**\n\n`
    socials.forEach((s) => {
        response += `• **${s.label}** — ${s.desc}\n  🔗 [${s.href}](${s.href})\n`
    })
    return response.trim()
}

function availabilityResponse() {
    return `## Availability\n\n🟢 **${owner.availability}**\n\nPriyank is currently looking for internships and small collaborations to apply his fundamentals. He usually replies within 24 hours.\n\n📧 Reach out at: ${owner.email}\n\nYou can also use the **Contact** section on this website to send a message directly!`
}

function unknownResponse() {
    const fallbacks = [
        `I'm not sure I understood that. Try asking about **projects**, **skills**, **certificates**, **education**, or **interests**! 😊`,
        `Hmm, I didn't quite catch that. You can ask me things like:\n• "What projects has Priyank built?"\n• "What technologies does he know?"\n• "Tell me about his certificates"`,
        `I can help with questions about this portfolio! Try asking about **skills**, **projects**, **certificates**, **education**, or just say "**tell me about Priyank**". 🚀`,
    ]
    return fallbacks[Math.floor(Math.random() * fallbacks.length)]
}

/* ── Main Export ──────────────────────────────────────────── */

const responseMap = {
    greeting: greetingResponse,
    about: aboutResponse,
    projects: projectsResponse,
    certificates: certificatesResponse,
    skills: skillsResponse,
    education: educationResponse,
    experience: experienceResponse,
    interests: interestsResponse,
    contact: contactResponse,
    availability: availabilityResponse,
    unknown: unknownResponse,
}

export function getAiResponse(message) {
    const intent = detectIntent(message)
    const handler = responseMap[intent] || unknownResponse
    return handler()
}
