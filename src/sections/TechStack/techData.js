const DI = (name, variant = 'original') =>
    `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`

export const techRings = [
    {
        id: 'inner',
        radius: 4.8,    // slightly larger to match bigger planet
        speed: 0.38,
        tilt: 20,       // was 12 — increase for visible depth
        items: [
            { id: 'react', label: 'React', icon: DI('react'), color: '#61DAFB' },
            { id: 'typescript', label: 'TypeScript', icon: DI('typescript'), color: '#3178C6' },
            { id: 'nodejs', label: 'Node.js', icon: DI('nodejs'), color: '#68A063' },
            { id: 'nextjs', label: 'Next.js', icon: DI('nextjs'), color: '#FFFFFF' },
        ],
    },
    {
        id: 'middle',
        radius: 7.5,
        speed: 0.22,
        tilt: -18,      // was -10 — increase magnitude
        items: [
            { id: 'tailwind', label: 'Tailwind', icon: DI('tailwindcss'), color: '#38BDF8' },
            { id: 'mongodb', label: 'MongoDB', icon: DI('mongodb'), color: '#47A248' },
            { id: 'postgres', label: 'PostgreSQL', icon: DI('postgresql'), color: '#336791' },
            { id: 'figma', label: 'Figma', icon: DI('figma'), color: '#F24E1E' },
            { id: 'python', label: 'Python', icon: DI('python'), color: '#3776AB' },
        ],
    },
    {
        id: 'outer',
        radius: 10.5,   // larger to orbit bigger planet
        speed: 0.13,
        tilt: 28,       // was 20 — noticeably different from inner ring
        items: [
            { id: 'docker', label: 'Docker', icon: DI('docker'), color: '#2496ED' },
            { id: 'express', label: 'Express', icon: DI('express'), color: '#FFFFFF' },
            { id: 'redis', label: 'Redis', icon: DI('redis'), color: '#DC382D' },
            { id: 'aws', label: 'AWS', icon: DI('amazonwebservices', 'plain-wordmark'), color: '#FF9900' },
            { id: 'vscode', label: 'VS Code', icon: DI('vscode'), color: '#007ACC' },
            { id: 'git', label: 'Git', icon: DI('git'), color: '#F05032' },
        ],
    },
]
