import { create } from 'zustand'

const useStore = create((set) => ({
    isLoaded: false,
    cursorVariant: 'default',
    theme: 'dark', // default to dark
    setIsLoaded: (val) => set({ isLoaded: val }),
    setCursorVariant: (variant) => set({ cursorVariant: variant }),
    toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'dark' ? 'light' : 'dark';
        if (typeof document !== 'undefined') {
            document.documentElement.setAttribute('data-theme', newTheme);
        }
        return { theme: newTheme };
    }),
}))

export default useStore
