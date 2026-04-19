import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function ConnectPanel() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-40px' })

    return (
        <section ref={ref} className="py-12 sm:py-16 px-6 md:px-12 lg:px-24 pb-20">
            <div className="max-w-4xl mx-auto text-center">
                {/* 
                    Space reserved for future content. 
                    The previous 'Connect' section has been removed but the layout footprint is preserved.
                */}
                <div className="min-h-[400px] flex items-center justify-center">
                    {/* Add new content here */}
                </div>
            </div>
        </section>
    )
}
