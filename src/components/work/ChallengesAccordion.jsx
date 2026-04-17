import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ChallengesAccordion({ challenges, learnings }) {
  if (!challenges && !learnings) return null

  const sections = [
    { id: 'challenges', label: 'Obstacles', title: 'The Challenges', content: challenges },
    { id: 'learnings', label: 'Takeaways', title: 'Core Learnings', content: learnings }
  ].filter(s => s.content)

  return (
    <section className="relative">
      <div className="mb-10 text-center relative">
        <h3 className="text-2xl font-bold text-[var(--accent-1)] tracking-widest uppercase">Retrospective</h3>
      </div>

      <div className="space-y-4">
        {sections.map((section, index) => (
          <AccordionItem key={section.id} section={section} />
        ))}
      </div>
    </section>
  )
}

function AccordionItem({ section }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`glass-card glass-card-hover overflow-hidden transition-all duration-300 ${isOpen ? 'border-white/20 bg-white/5' : ''}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-1)]"
      >
        <span className="text-xl font-bold text-white drop-shadow-md">{section.title}</span>
        <div className={`flex-shrink-0 ml-4 flex items-center justify-center w-8 h-8 rounded-full border transition-colors ${isOpen ? 'border-[var(--accent-1)] text-[var(--accent-1)] bg-[var(--accent-1)]/10' : 'border-white/10 text-white/50 bg-white/5'}`}>
          <span className="text-lg leading-none">{isOpen ? '-' : '+'}</span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-8 border-t border-white/10 mt-2 pt-6 relative">
               <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
               <p className="relative z-10 text-lg text-white/80 leading-relaxed font-light">
                 {section.content}
               </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
