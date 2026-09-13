import { createContext, useCallback, useState, useMemo, type PropsWithChildren, useEffect } from "react";
import { type AuthContextType } from "../types/auth";
import type { User } from "../types/user";
import { refreshToken, validateUser } from "../services/userService";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isInitializing, setIsInitializing] = useState<boolean>(true);

    const login = useCallback(async (username: string, pass: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await validateUser(username, pass);
            if (!response?.token) {
                setError("Invalid username or password");
                return;
            }
            setToken(response.token);
            setUser(response.user);
            setIsAuthenticated(true);
        } catch (error: any) {
            if (error.status === 401) {
                setError("Invalid login attempt. Invalid username or password.");
            }
        } finally {
            setIsLoading(false);
        }

    }, []);



    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
    }, []);


    const refreshSession = useCallback(async () => {
        try {
            const response = await refreshToken();
            if (response?.token) {
                setToken(response.token);
                setUser(response.user);
                setIsAuthenticated(true);
            }

        } catch (error) {
        } finally {
            setIsInitializing(false);
        }
    }, []);

    useEffect(() => {
        refreshSession();
    }, []);


    const value = useMemo<AuthContextType>(() => ({
        token,
        user,
        isAuthenticated,
        login,
        logout,
        isLoading,
        error,
        isInitializing
    }), [token, user, isAuthenticated, login, logout, isLoading, error, isInitializing])

    return (
        <AuthContext value={value}>
            {children}
        </AuthContext>
    )
}