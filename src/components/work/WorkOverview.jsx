import { motion } from 'framer-motion'

/**
 * WorkOverview — Condensed 'Dossier Entry' summary.
 * High-authority typography and industrial branding.
 */
export default function WorkOverview({ project, hideMetadata = false }) {
    return (
        <section className="py-4 md:py-6">
            <div className="max-w-4xl">
                {/* Industrial Eyebrow */}
                <div className="flex items-center gap-6 mb-6">
                    <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[var(--accent-1)]">
                        Entry // 01
                    </span>
                    <div className="h-px w-12 bg-[var(--border-color)]" />
                </div>

                {/* Narrative Summary */}
                <h2 
                    className="text-2xl md:text-3xl lg:text-4xl text-[var(--text-primary)] leading-[1.3] font-medium tracking-tight mb-8"
                    style={{ textWrap: 'balance' }}
                >
                    {project.fullDescription}
                </h2>


                {!hideMetadata && (
                    /* Fallback metadata grid for mobile if sidebar is hidden (currently handled by parent grid flow) */
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-highlight)]/30 lg:hidden">
                        {[
                            { label: 'Role', value: project.role },
                            { label: 'Year', value: project.year },
                            { label: 'Phase', value: project.status },
                        ].map((item) => (
                            <div key={item.label} className="flex flex-col gap-2">
                                <span className="text-[9px] tracking-[0.3em] uppercase text-[var(--text-muted)] font-mono">
                                    [{item.label}]
                                </span>
                                <span className="text-sm text-[var(--text-primary)] font-bold">
                                    {item.value}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
