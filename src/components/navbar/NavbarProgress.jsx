import {
    motion,
    useScroll,
    useSpring,
} from 'framer-motion'
import { navConfig } from '../../data/navConfig'

export default function NavbarProgress({ compact = false, mobile = false }) {
    const { scrollYProgress } = useScroll()
    const progress = useSpring(scrollYProgress, navConfig.timing.progressSpring)

    return (
        <div
            className="pointer-events-none absolute inset-x-0 bottom-0"
            aria-hidden="true"
        >
            <motion.div
                className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)]"
                style={{ scaleX: progress }}
            />
        </div>
    )
}
