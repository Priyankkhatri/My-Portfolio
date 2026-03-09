import { create } from 'zustand'

const useStore = create((set, get) => ({
    isLoaded: false,
    cursorVariant: 'default',
    theme: 'dark', // default to dark

    // Theme transition state for the energy wave animation
    themeTransition: { active: false, origin: { x: 0, y: 0 }, oldTheme: 'dark' },

    setIsLoaded: (val) => set({ isLoaded: val }),
    setCursorVariant: (variant) => set({ cursorVariant: variant }),

    // Simple toggle (fallback)
    toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'dark' ? 'light' : 'dark';
        if (typeof document !== 'undefined') {
            document.documentElement.setAttribute('data-theme', newTheme);
        }
        return { theme: newTheme };
    }),

    // Native View Transition Theme Swap
    startThemeTransition: (x, y) => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        if (typeof document === 'undefined' || !document.startViewTransition) {
            if (typeof document !== 'undefined') document.documentElement.setAttribute('data-theme', newTheme);
            set({ theme: newTheme });
            return;
        }

        // Set CSS variables for the ripple origin
        document.documentElement.style.setProperty('--ripple-x', `${x}px`);
        document.documentElement.style.setProperty('--ripple-y', `${y}px`);
        document.documentElement.classList.add('theme-transitioning');

        // Execute View Transition API snapshot
        const transition = document.startViewTransition(() => {
            // Update DOM and React State
            document.documentElement.setAttribute('data-theme', newTheme);
            set({ theme: newTheme });
        });

        // Clean up & trigger UI pulse after animation
        transition.finished.then(() => {
            document.documentElement.classList.remove('theme-transitioning');
            document.documentElement.classList.add('theme-pulse');
            setTimeout(() => {
                document.documentElement.classList.remove('theme-pulse');
            }, 400);
        });
    }
}))

export default useStore
