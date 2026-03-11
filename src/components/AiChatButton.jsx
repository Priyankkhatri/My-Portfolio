import { useEffect } from 'react'
import useStore from '../store/useStore'
import AiChatPanel from './AiChatPanel'

/**
 * AiChatButton — now just renders the chat panel.
 * The actual button lives in Navbar.jsx.
 * ESC-to-close is handled here.
 */
export default function AiChatButton() {
    const isChatOpen = useStore((s) => s.isChatOpen)
    const setChatOpen = useStore((s) => s.setChatOpen)

    /* ESC to close */
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') setChatOpen(false)
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [setChatOpen])

    return <AiChatPanel isOpen={isChatOpen} onClose={() => setChatOpen(false)} />
}
