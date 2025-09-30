    import jwt from "jsonwebtoken";
    import dotenv from "dotenv";
    dotenv.config();

    const SECRET = process.env.JWT_SECRET || "secret";

    export function signJwt(payload: object, expiresIn = process.env.JWT_EXPIRES_IN || "7d") {
    return jwt.sign(payload, SECRET, { expiresIn });
    }

    export function verifyJwt<T = any>(token: string): T | null {
    try {
        return jwt.verify(token, SECRET) as T;
    } catch (err) {
        return null;
    }
    }
