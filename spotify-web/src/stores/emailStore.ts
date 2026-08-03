import { create } from 'zustand';

export interface EmailStateType {
    email?: string,
    setEmail: (email: string) => void
}

const useEmailStore = create<EmailStateType>()((set) => ({
    setEmail: (email: string) => set({ email })
}))

export default useEmailStore;
