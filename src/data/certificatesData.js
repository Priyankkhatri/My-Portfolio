/**
 * Enriched certificates data for the Cinematic Credentials Showcase.
 * Adding new certificates is a data-only operation — just append to this array.
 *
 * Fields:
 *   id            — unique slug (used as React key)
 *   title         — certificate / award name
 *   issuer        — issuing organization
 *   date          — human-readable date string
 *   category      — short label (Frontend, Hackathon, etc.)
 *   description   — meaningful 1-2 sentence summary of what was achieved
 *   skills        — array of skill tags shown on the details panel
 *   grade         — optional grade / score string
 *   credentialId  — optional credential ID for display
 *   credentialUrl — URL for verification CTA (omit to hide button)
 *   image         — path to certificate thumbnail (public/)
 *   themeColor    — optional accent color for background gradient shift
 */

const certificatesData = [
    {
        id: 'meta-frontend',
        title: 'Introduction to Front-End Development',
        issuer: 'Meta (via Coursera)',
        date: 'Feb 24, 2026',
        category: 'Frontend',
        description:
            'Comprehensive introduction to modern front-end development covering HTML5, CSS3, and responsive design principles taught by Meta engineers. Achieved a 99% grade demonstrating strong mastery of foundational web technologies and UI best practices.',
        skills: ['HTML5', 'CSS3', 'Responsive Design', 'UI Fundamentals'],
        grade: '99%',
        credentialId: 'OEJDQXOP4W5Y',
        credentialUrl: 'https://coursera.org/verify/OEJDQXOP4W5Y',
        image: 'https://res.cloudinary.com/dqvpsorso/image/upload/v1775563239/meta-frontend_b9gv9q.jpg',
        themeColor: '#60a5fa',
    },
    {
        id: 'hacksagon-2026',
        title: 'Hacksagon 2026 — Ideation Phase',
        issuer: 'ABV-IIITM IEEE',
        date: '2026',
        category: 'Hackathon',
        description:
            'Participated in the ideation phase of Hacksagon 2026, a national-level hackathon organized by ABV-IIITM IEEE. Collaborated with a team to conceptualize and pitch an innovative solution under time constraints.',
        skills: ['Problem Solving', 'Team Collaboration', 'Ideation', 'Pitching'],
        credentialUrl: '/Hacksagon.pdf',
        image: 'https://res.cloudinary.com/dqvpsorso/image/upload/v1775563016/hacksagon_xugwyg.jpg',
        themeColor: '#a78bfa',
    },
    {
        id: 'elite-hack',
        title: 'Elite Hack 1.0 — Participation',
        issuer: 'Elite Coders',
        date: '2026',
        category: 'Hackathon',
        description:
            'Competed in Elite Hack 1.0, a competitive coding hackathon hosted by Elite Coders. Gained hands-on experience building rapid prototypes, debugging under pressure, and presenting technical solutions to a judging panel.',
        skills: ['Rapid Prototyping', 'Debugging', 'Competitive Programming', 'Presentation'],
        credentialUrl: '/Elite-Hack.pdf',
        image: 'https://res.cloudinary.com/dqvpsorso/image/upload/v1775563067/elite-hack_esq9eu.jpg',
        themeColor: '#f59e0b',
    },
]

export default certificatesData
