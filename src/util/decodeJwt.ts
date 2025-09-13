import { jwtDecode } from "jwt-decode";

export const decodeJwt = (token: string): any => {
    try {
        const decoded = jwtDecode(token);
        return decoded;
    } catch (error) {
        console.error('Failed to decode JWT', error);
        return null;
    }
}