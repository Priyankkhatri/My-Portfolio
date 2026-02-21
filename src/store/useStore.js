import { create } from 'zustand'

const useStore = create((set) => ({
    isLoaded: false,
    cursorVariant: 'default',
    setIsLoaded: (val) => set({ isLoaded: val }),
    setCursorVariant: (variant) => set({ cursorVariant: variant }),
}))

export default useStore
