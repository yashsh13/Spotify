import { create } from "zustand";

export enum Plan {
    FREE = 'FREE',
    PRO = 'PRO'
}

export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export interface AuthStateType {
    accessToken?: string,
    userId?: string,
    plan?: Plan,
    role?: Role,
    setAccessToken: (token: string) => void,
    emptyStore: () => void,
    setUser: (userId: string, plan: Plan, role: Role) => void
}

const useAuthStore = create<AuthStateType>()((set) => ({
    setAccessToken: (token) => set({ accessToken: token }),
    emptyStore: () => set({ accessToken: undefined, userId: undefined, plan: undefined, role: undefined }),
    setUser: (userId, plan, role) => set({ userId, plan, role})
 }))

export default useAuthStore;