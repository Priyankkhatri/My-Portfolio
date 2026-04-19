/**
 * Tech Stack Orbital System — Data Configuration
 * 4 rings × 25 technologies, ordered by the PRD specification.
 *
 * Each ring:
 *   category  – label rendered near the orbit path
 *   direction – 1 = clockwise, -1 = counter-clockwise
 *   speed     – seconds per full revolution (lower = faster)
 *   color     – category label accent color
 *   nodes[]   – { name, icon, description, usage }
 *
 * Icon URLs use Devicon CDN for consistent, high-quality tech logos.
 */

const DI = (name, variant = 'original') =>
    `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`

export const techStackRings = [
    /* ── Ring 1 — Core Languages (innermost, fastest) ─────────── */
    {
        category: 'CORE LANGUAGES',
        direction: 1,
        speed: 60,
        color: '#60a5fa',
        nodes: [
            {
                name: 'JavaScript',
                icon: DI('javascript'),
                description: 'Core language for frontend & backend.',
                usage: 'Primary language across all web projects — React UIs, Express APIs, and tooling scripts.',
            },
            {
                name: 'TypeScript',
                icon: DI('typescript'),
                description: 'Typed superset of JavaScript.',
                usage: 'Used in production Next.js apps for type-safe APIs, shared interfaces, and component props.',
            },
            {
                name: 'Python',
                icon: DI('python'),
                description: 'Versatile scripting & backend language.',
                usage: 'Automation scripts, data processing tasks, and DSA practice for competitive programming.',
            },
            {
                name: 'C++',
                icon: DI('cplusplus'),
                description: 'High-performance systems language.',
                usage: 'Competitive programming, algorithm design, and understanding low-level memory management.',
            },
        ],
    },

    /* ── Ring 2 — Frontend (second ring, CCW) ─────────────────── */
    {
        category: 'FRONTEND',
        direction: -1,
        speed: 90,
        color: '#34d399',
        nodes: [
            {
                name: 'React',
                icon: DI('react'),
                description: 'Component-based UI library.',
                usage: 'Primary frontend framework for building interactive, stateful user interfaces in every project.',
            },
            {
                name: 'Next.js',
                icon: DI('nextjs'),
                description: 'React meta-framework for SSR & SSG.',
                usage: 'Production apps with server-side rendering, API routes, and optimized image delivery.',
            },
            {
                name: 'Tailwind CSS',
                icon: DI('tailwindcss'),
                description: 'Utility-first CSS framework.',
                usage: 'Rapid styling across all modern projects — ensures consistent design tokens and responsive layouts.',
            },
            {
                name: 'HTML5',
                icon: DI('html5'),
                description: 'Semantic markup language.',
                usage: 'Foundation of every web project — semantic elements, accessibility landmarks, SEO structure.',
            },
            {
                name: 'CSS3',
                icon: DI('css3'),
                description: 'Styling & layout language.',
                usage: 'Custom animations, glass-morphism effects, grid systems, and premium micro-interactions.',
            },
            {
                name: 'Redux',
                icon: DI('redux'),
                description: 'Predictable state management.',
                usage: 'Complex app state — authentication flows, cart management, and data-heavy dashboards.',
            },
        ],
    },

    /* ── Ring 3 — Backend (third ring, CW) ────────────────────── */
    {
        category: 'BACKEND',
        direction: 1,
        speed: 120,
        color: '#f97316',
        nodes: [
            {
                name: 'Node.js',
                icon: DI('nodejs'),
                description: 'JavaScript runtime for servers.',
                usage: 'Backend runtime for all Express/REST APIs, real-time services, and CLI tools.',
            },
            {
                name: 'Express.js',
                icon: DI('express'),
                description: 'Minimalist Node.js framework.',
                usage: 'RESTful API server — routes, middleware chains, authentication, and error handling.',
            },
            {
                name: 'MongoDB',
                icon: DI('mongodb'),
                description: 'NoSQL document database.',
                usage: 'Primary database for flexible schemas — user profiles, product catalogs, blog content.',
            },
            {
                name: 'PostgreSQL',
                icon: DI('postgresql'),
                description: 'Advanced relational database.',
                usage: 'Structured financial data, relational queries, and production-grade ACID transactions.',
            },
            {
                name: 'Redis',
                icon: DI('redis'),
                description: 'In-memory data store & cache.',
                usage: 'Session caching, rate limiting, and real-time leaderboard data in production services.',
            },
            {
                name: 'JWT',
                icon: 'https://jwt.io/img/pic_logo.svg',
                description: 'Token-based authentication.',
                usage: 'Stateless auth across MERN apps — access/refresh token flows with secure HTTP-only cookies.',
            },
        ],
    },

    /* ── Ring 4 — Tools & Platforms (outermost, slowest, CCW) ── */
    {
        category: 'TOOLS & PLATFORMS',
        direction: -1,
        speed: 180,
        color: '#a78bfa',
        nodes: [
            {
                name: 'Git',
                icon: DI('git'),
                description: 'Distributed version control.',
                usage: 'Every project — branching strategies, commit hygiene, and collaborative code reviews.',
            },
            {
                name: 'GitHub',
                icon: DI('github'),
                description: 'Code hosting & collaboration.',
                usage: 'Repository management, CI/CD via Actions, pull request workflows, and open-source contributions.',
            },
            {
                name: 'Docker',
                icon: DI('docker'),
                description: 'Container platform.',
                usage: 'Containerizing Node.js services and databases for consistent dev/prod environments.',
            },
            {
                name: 'VS Code',
                icon: DI('vscode'),
                description: 'Primary code editor.',
                usage: 'Daily driver — custom keybindings, integrated terminal, extension-powered workflow.',
            },
            {
                name: 'Figma',
                icon: DI('figma'),
                description: 'Collaborative design tool.',
                usage: 'UI/UX wireframing, component design systems, and developer handoff for pixel-perfect builds.',
            },
            {
                name: 'Postman',
                icon: DI('postman'),
                description: 'API testing & documentation.',
                usage: 'API endpoint testing, automated collection runs, and team-shared environment configs.',
            },
            {
                name: 'AWS',
                icon: DI('amazonwebservices', 'plain-wordmark'),
                description: 'Cloud infrastructure provider.',
                usage: 'S3 storage, EC2 instances, and serverless functions for scalable production deployments.',
            },
            {
                name: 'Firebase',
                icon: DI('firebase'),
                description: 'Google backend-as-a-service.',
                usage: 'Auth, Firestore database, and hosting for rapid prototyping and real-time features.',
            },
            {
                name: 'Vercel',
                icon: DI('vercel'),
                description: 'Frontend deployment platform.',
                usage: 'Production hosting for Next.js and React apps with edge functions and instant previews.',
            },
        ],
    },
]
