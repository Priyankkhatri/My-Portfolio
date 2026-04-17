import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function WorkHero({ project }) {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  return (
    <section 
      ref={containerRef}
      className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden flex items-end pb-16 md:pb-24"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={project.heroImage || project.previewImage} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-transparent/20" />
      </motion.div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full relative z-10">
        <motion.div 
            style={{ opacity }}
            className="glass-morphism-premium p-8 md:p-12 lg:p-16 rounded-3xl inline-block max-w-4xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[var(--text-secondary)] text-sm tracking-widest uppercase">
              {project.category || 'Project'} / {project.year}
            </span>
          </div>

          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1] tracking-tight mb-2"
            style={{ fontFamily: 'var(--font-display)', textWrap: 'balance' }}
          >
            {project.title}
          </h1>
        </motion.div>
      </div>
    </section>
  )
}
