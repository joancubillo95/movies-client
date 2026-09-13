import type { User } from "../types/user";
import axios from "axios"

const authClient = axios.create({
    baseURL: "http://localhost:3000/api/v1/auth",
    withCredentials: true
})

export const validateUser = async (username: string, password: string): Promise<{ token: string, user: User } | null> => {
    try {
        const response = await authClient.post("/login",
            {
                username,
                password
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "api-key": "GziGhStWTLdLrRJixGXVo1HOsEwROEsn"
                }
            }
        );
        if (response.status === 200) {
            return { token: response.data.token, user: response.data.user };
        }

    } catch (error: any) {
        throw error;
    }
    return null;
}

export const refreshToken = async (): Promise<{ token: string, user: User } | null> => {
    try {
        const response = await authClient.post("/refresh",
            {},
            {
                headers: {
                    "api-key": "GziGhStWTLdLrRJixGXVo1HOsEwROEsn"
                }
            },
        );
        if (response.status === 200) {
            return { token: response.data.token, user: response.data.user };
        }

    } catch (error: any) {
        throw error;
    }
    return null;
}