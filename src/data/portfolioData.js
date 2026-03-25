/**
 * Centralized portfolio knowledge base
 * Used by the AI chat assistant to answer questions about the portfolio owner.
 */

export const owner = {
    name: 'Priyank Khatri',
    title: 'Aspiring Software Developer',
    degree: 'B.Tech CSE',
    semester: '2nd Semester',
    institute: 'Coding Gita (Offline Institute)',
    location: 'India',
    availability: 'Open to internships',
    email: 'priyank.khatri.cg@gmail.com',
    bio: `I'm a 2nd-semester Computer Science student at Coding Gita. I build small web apps (image galleries, movie explorers), REST APIs with Node.js + MongoDB, and browser games with HTML/CSS/JS. Currently learning React/Next.js, data structures, and backend architecture. I love experimenting with UI/UX, performance optimization, and system fundamentals.`,
}

export const techStack = [
    { label: 'C / C++', icon: '⚡', category: 'Language' },
    { label: 'HTML / CSS', icon: '🎨', category: 'Frontend' },
    { label: 'JavaScript', icon: '💛', category: 'Language' },
    { label: 'React / Next.js', icon: '⚛️', category: 'Frontend' },
    { label: 'Node.js', icon: '🟢', category: 'Backend' },
    { label: 'Express', icon: '🔲', category: 'Backend' },
    { label: 'MongoDB', icon: '🍃', category: 'Database' },
    { label: 'Netlify / Render', icon: '☁️', category: 'Deployment' },
    { label: 'Git / GitHub', icon: '🔀', category: 'Tools' },
    { label: 'Chrome DevTools', icon: '🛠️', category: 'Tools' },
]

export const projects = [
    {
        title: 'AI-Adaptive Onboarding Engine',
        tagline: 'Resume parsing & personalized roadmaps',
        description: 'A sophisticated tool that analyzes resumes against target job descriptions to identify skill gaps. Generates dependency-aware learning roadmaps featuring dynamic visualizations, instant demo mode, and professional PDF exports.',
        tech: ['React.js', 'Node.js', 'Express', 'MongoDB'],
        live: 'https://ai-onboarding-engine.netlify.app',
        source: 'https://github.com/Priyankkhatri/AI-Onboarding-Engine',
        year: '2026',
        role: 'Full-Stack Developer',
    },
    {
        title: 'Movie Explorer',
        tagline: 'Cinematic details & dynamic search',
        description: 'Movie search & details explorer using the OMDb API; cinematic details hero. Built to practice dynamic search, API integration, and creating clean detail pages with React and Tailwind.',
        tech: ['React.js', 'Tailwind CSS', 'OMDb API', 'Netlify'],
        live: 'https://api-movie-explorer.netlify.app',
        source: 'https://github.com/Priyankkhatri',
        year: '2026',
        role: 'Frontend Developer',
    },
    {
        title: 'API Image Gallery',
        tagline: 'Dynamic search & lazy loading',
        description: 'A responsive image gallery that fetches high-quality images via the Pexels API. Features dynamic keyword search, lazy loading without page reloads, and a fast frontend UI.',
        tech: ['HTML5', 'CSS3', 'JS', 'Pexels API', 'Netlify'],
        live: 'https://api-image-gallery.netlify.app',
        source: 'https://github.com/Priyankkhatri/My-Projects',
        year: '2025',
        role: 'Frontend Developer',
    },
    {
        title: 'Clone Websites',
        tagline: 'Pixel-perfect website recreations',
        description: 'Frontend clones of popular brand websites (DJI, Nothing, Prime, etc.) built to practice layout, responsiveness, and modern CSS techniques.',
        tech: ['HTML5', 'CSS3', 'JavaScript'],
        live: '#',
        source: 'https://github.com/Priyankkhatri',
        year: '2025',
        role: 'Frontend',
    },
]

export const certificates = [
    {
        title: 'Introduction to Front-End Development',
        issuer: 'Coursera (Meta)',
        date: 'Feb 24, 2026',
        category: 'Frontend',
        grade: '99%',
        credentialId: 'OEJDQXOP4W5Y',
        credentialUrl: 'https://coursera.org/verify/OEJDQXOP4W5Y',
        status: 'Completed',
        image: '/meta-frontend-cert.jpg',
        hours: 'Grade: 99%',
    },
    {
        title: 'Hacksagon 2026 Ideation Phase',
        issuer: 'ABV-IIITM IEEE',
        date: '2026',
        category: 'Hackathon',
        status: 'Completed',
        credentialUrl: '/Hacksagon.pdf',
        image: '/hacksagon-thumb.png',
    },
    {
        title: 'Elite Hack 1.0 Participation',
        issuer: 'Elite Coders',
        date: '2026',
        category: 'Hackathon',
        status: 'Completed',
        credentialUrl: '/Elite-Hack.pdf',
        image: '/elite-hack-thumb.png',
    },
]

export const experience = [
    { year: 'Currently', title: '2nd-Semester B.Tech CSE', desc: 'Coding Gita (Offline Institute)' },
    { year: '2026', title: 'Building Projects', desc: 'Creating APIs, and React apps to learn' },
    { year: '2025', title: 'Started Journey', desc: 'Exploring fundamentals of computer science' },
]

export const interests = [
    { icon: '🏸', label: 'Badminton', desc: 'Competitive player' },
    { icon: '⚽', label: 'Football', desc: 'Casual/competitive' },
    { icon: '📷', label: 'Photography', desc: 'Street & landscape' },
    { icon: '🏎️', label: 'Cars', desc: 'BMW M4 enthusiast' },
    { icon: '📱', label: 'Tech Tinkering', desc: 'Android rooting & custom ROMs' },
]

export const socials = [
    { label: 'GitHub', href: 'https://github.com/Priyankkhatri', desc: 'Student projects & code' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/priyankkhatrii/', desc: 'Professional network' },
    { label: 'YouTube', href: 'https://www.youtube.com/@PriyankCreates', desc: 'Project demos & videos' },
    { label: 'LeetCode', href: 'https://leetcode.com/u/Priyank_Khatri/', desc: 'DSA & problem solving' },
    { label: 'Instagram', href: 'https://www.instagram.com/priyankhatrii/', desc: 'Life & creative updates' },
    { label: 'X (Twitter)', href: 'https://x.com/PriyankKhatrii', desc: 'Thoughts & short updates' },
]
