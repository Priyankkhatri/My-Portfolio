import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useStore from '../store/useStore'

/* ── Typing indicator dots ────────────────────────────────── */
function TypingIndicator() {
    return (
        <div className="flex items-center gap-1.5 px-4 py-3">
            {[0, 1, 2].map((i) => (
                <motion.span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)]"
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    )
}

/* ── Simple markdown-like renderer for bold text ──────────── */
function renderMessage(text) {
    // Split by newlines and render
    return text.split('\n').map((line, i) => {
        // Heading ##
        if (line.startsWith('## ')) {
            return (
                <h4
                    key={i}
                    className="text-sm font-bold text-[var(--text-primary)] mt-2 mb-1"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                    {line.replace('## ', '')}
                </h4>
            )
        }

        // Process inline bold **text** and links [label](url)
        const parts = []
        let remaining = line
        let partKey = 0

        while (remaining.length > 0) {
            // Check for bold
            const boldMatch = remaining.match(/\*\*(.+?)\*\*/)
            // Check for link
            const linkMatch = remaining.match(/\[(.+?)\]\((.+?)\)/)

            // Find which comes first
            const boldIdx = boldMatch ? remaining.indexOf(boldMatch[0]) : Infinity
            const linkIdx = linkMatch ? remaining.indexOf(linkMatch[0]) : Infinity

            if (boldIdx === Infinity && linkIdx === Infinity) {
                // No more special content
                if (remaining) parts.push(<span key={partKey++}>{remaining}</span>)
                break
            }

            if (boldIdx <= linkIdx) {
                // Bold comes first
                if (boldIdx > 0) {
                    parts.push(<span key={partKey++}>{remaining.slice(0, boldIdx)}</span>)
                }
                parts.push(
                    <strong key={partKey++} className="text-[var(--text-primary)] font-semibold">
                        {boldMatch[1]}
                    </strong>
                )
                remaining = remaining.slice(boldIdx + boldMatch[0].length)
            } else {
                // Link comes first
                if (linkIdx > 0) {
                    parts.push(<span key={partKey++}>{remaining.slice(0, linkIdx)}</span>)
                }
                parts.push(
                    <a
                        key={partKey++}
                        href={linkMatch[2]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--accent-1)] hover:text-[var(--accent-2)] underline underline-offset-2 transition-colors"
                    >
                        {linkMatch[1]}
                    </a>
                )
                remaining = remaining.slice(linkIdx + linkMatch[0].length)
            }
        }

        if (line.trim() === '') return <div key={i} className="h-2" />

        return (
            <p key={i} className="text-xs leading-[1.7] text-[var(--text-secondary)]">
                {parts}
            </p>
        )
    })
}

/* ── Suggested queries ────────────────────────────────────── */
const suggestions = [
    'What projects has Priyank built?',
    'Tell me about Priyank',
    'What skills does he know?',
    'Show me certificates',
]

/* ── Main Chat Panel ─────────────────────────────────────── */
export default function AiChatPanel({ isOpen, onClose }) {
    const setCursorVariant = useStore((s) => s.setCursorVariant)

    const [messages, setMessages] = useState([
        {
            role: 'bot',
            text: `Hey! 👋 I'm Priyank's AI assistant. Ask me anything about his **projects**, **skills**, **certificates**, or **education**!`,
        },
    ])
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)

    const chatEndRef = useRef(null)
    const inputRef = useRef(null)

    /* Auto-scroll to bottom */
    const scrollToBottom = useCallback(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [])

    useEffect(() => {
        scrollToBottom()
    }, [messages, isTyping, scrollToBottom])

    /* Focus input when opened */
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 400)
        }
    }, [isOpen])

    const handleSend = useCallback(
        async (text) => {
            const msg = (text || input).trim()
            if (!msg || isTyping) return

            // Add user message
            setMessages((prev) => [...prev, { role: 'user', text: msg }])
            setInput('')
            setIsTyping(true)

            try {
                const res = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: msg }),
                })

                if (!res.ok) throw new Error('API request failed')

                const data = await res.json()
                setMessages((prev) => [...prev, { role: 'bot', text: data.response }])
            } catch (error) {
                setMessages((prev) => [
                    ...prev,
                    { role: 'bot', text: '⚠️ Sorry, I couldn\'t reach the AI server. Please try again later!' },
                ])
            } finally {
                setIsTyping(false)
            }
        },
        [input, isTyping]
    )

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <style>{`
                        .chat-scrollbar::-webkit-scrollbar { width: 4px; }
                        .chat-scrollbar::-webkit-scrollbar-track { background: rgba(10, 15, 30, 0.5); }
                        .chat-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 255, 200, 0.2); border-radius: 4px; }
                        .chat-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0, 255, 200, 0.5); }
                        @keyframes pulse-cyan {
                            0%, 100% { opacity: 1; box-shadow: 0 0 10px rgba(0, 255, 200, 0.6); transform: scale(1); }
                            50% { opacity: 0.6; box-shadow: 0 0 2px rgba(0, 255, 200, 0.2); transform: scale(0.95); }
                        }
                        .animate-pulse-cyan {
                            animation: pulse-cyan 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                            background-color: rgba(0, 255, 200, 1);
                        }
                    `}</style>
                    {/* Backdrop on mobile */}
                    <motion.div
                        className="fixed inset-0 bg-[#0a0f1e]/80 backdrop-blur-sm z-[9998] sm:hidden"
                        style={{ cursor: 'auto' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Chat Panel */}
                    <motion.div
                        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-10 md:right-10 z-[9999] w-[calc(100%-2rem)] sm:w-[380px] h-[520px] max-h-[80vh] flex flex-col rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(0,255,200,0.05)] border border-[#00ffc8]/15"
                        style={{
                            background: 'rgba(10, 15, 30, 0.85)',
                            backdropFilter: 'blur(24px)',
                            WebkitBackdropFilter: 'blur(24px)',
                        }}
                        initial={{ opacity: 0, scale: 0.95, y: 20, transformOrigin: 'right bottom' }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    >
                        {/* Top gradient accent line */}
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#00ffc8]/40 to-transparent shrink-0" />

                        {/* Header */}
                        <div className="px-5 py-4 flex items-center justify-between border-b border-[#00ffc8]/10 bg-gradient-to-r from-[#00ffc8]/5 to-transparent shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full border border-[#00ffc8]/30 flex items-center justify-center shadow-[0_0_10px_rgba(0,255,200,0.1)]">
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        className="text-[#00ffc8]"
                                    >
                                        <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3
                                        className="text-sm font-semibold font-mono tracking-tight text-[#e2e8f0]"
                                    >
                                        AI Assistant
                                    </h3>
                                    <span className="flex items-center gap-1.5 mt-0.5">
                                        <span className="w-1.5 h-1.5 rounded-full animate-pulse-cyan" />
                                        <span className="text-[10px] text-[var(--text-muted)] font-mono">ONLINE</span>
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={onClose}
                                onMouseEnter={() => setCursorVariant('hover')}
                                onMouseLeave={() => setCursorVariant('default')}
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#00ffc8]/40 hover:text-[#00ffc8] hover:bg-[#00ffc8]/10 hover:border-[#00ffc8]/30 transition-colors"
                                aria-label="Close chat"
                            >
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="text-[var(--text-secondary)]"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 chat-scrollbar">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: i === messages.length - 1 ? 0.1 : 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] px-4 py-3 ${
                                            msg.role === 'user'
                                                ? 'bg-[#00ffc8]/10 border border-[#00ffc8]/20 rounded-t-xl rounded-bl-xl rounded-br-sm shadow-[0_0_15px_rgba(0,255,200,0.02)]'
                                                : 'bg-[#111827]/80 border-l-[3px] border-l-[#00ffc8] border-y border-y-[#00ffc8]/10 border-r border-r-[#00ffc8]/10 rounded-r-xl rounded-tl-xl rounded-bl-sm shadow-[0_0_15px_rgba(0,255,200,0.02)]'
                                        }`}
                                    >
                                        {msg.role === 'user' ? (
                                            <p className="text-xs leading-[1.7] text-[#e2e8f0]">
                                                {msg.text}
                                            </p>
                                        ) : (
                                            <div className="ai-message-content text-slate-300">{renderMessage(msg.text)}</div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-[#111827]/80 border-l-[3px] border-l-[#00ffc8] border-y border-y-[#00ffc8]/10 border-r border-r-[#00ffc8]/10 rounded-r-xl rounded-tl-xl rounded-bl-sm shadow-[0_0_15px_rgba(0,255,200,0.02)]">
                                        <TypingIndicator />
                                    </div>
                                </motion.div>
                            )}

                            {/* Suggestions (show only initially) */}
                            {messages.length === 1 && !isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="flex flex-wrap gap-2 pt-2"
                                >
                                    {suggestions.map((s, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleSend(s)}
                                            onMouseEnter={() => setCursorVariant('hover')}
                                            onMouseLeave={() => setCursorVariant('default')}
                                            className="px-3 py-1.5 text-[10px] tracking-wide rounded-full border border-[#00ffc8]/30 bg-transparent text-[#94a3b8] hover:text-[#00ffc8] hover:bg-[#00ffc8]/10 hover:shadow-[0_0_10px_rgba(0,255,200,0.15)] transition-all duration-200"
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </motion.div>
                            )}

                            <div ref={chatEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="px-4 py-3 shrink-0 bg-transparent">
                            <div className="flex items-center gap-2 rounded-none bg-black/20 border-b border-[#00ffc8]/20 px-4 py-3 focus-within:border-[#00ffc8]/60 focus-within:bg-[#00ffc8]/5 transition-all duration-300 shadow-inner group">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ask about projects, skills, education..."
                                    className="flex-1 bg-transparent text-xs text-[#e2e8f0] placeholder:text-[#00ffc8]/40 focus:outline-none focus:ring-0"
                                    disabled={isTyping}
                                />
                                <button
                                    onClick={() => handleSend()}
                                    disabled={!input.trim() || isTyping}
                                    onMouseEnter={() => setCursorVariant('hover')}
                                    onMouseLeave={() => setCursorVariant('default')}
                                    className="w-8 h-8 flex items-center justify-center rounded bg-transparent text-[#00ffc8]/50 hover:text-[#00ffc8] hover:shadow-[0_0_15px_rgba(0,255,200,0.4)] disabled:opacity-30 disabled:hover:shadow-none transition-all duration-200 shrink-0"
                                    aria-label="Send message"
                                >
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <line x1="22" y1="2" x2="11" y2="13" />
                                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                    </svg>
                                </button>
                            </div>
                            <p className="text-[9px] text-[var(--text-muted)] text-center mt-3 font-mono">
                                Powered by portfolio data · ESC to close
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
