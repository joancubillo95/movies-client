import type { User } from "./user";

export interface AuthContextType {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    login: (username: string, pass: string) => void;
    logout: () => void;
    error: string | null;
    isLoading: boolean;
    isInitializing: boolean;
}