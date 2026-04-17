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
      <div className="mb-10">
        <h3 className="text-xl font-bold text-[var(--text-primary)]">Retrospective</h3>
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
    <div className={`rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-hidden transition-colors ${isOpen ? 'border-[var(--text-muted)]' : ''}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-1)]"
      >
        <span className="text-xl font-bold text-[var(--text-primary)]">{section.title}</span>
        <div className="flex-shrink-0 ml-4 flex items-center justify-center w-8 h-8 rounded-full border border-[var(--border-color)] text-[var(--text-muted)]">
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
            <div className="px-6 pb-8 border-t border-[var(--border-color)] mt-2 pt-6">
               <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                 {section.content}
               </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
