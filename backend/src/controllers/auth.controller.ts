import { Request, Response } from "express";
import { AppDataSource } from "../../ormconfig";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import { sendOtpMail } from "../services/mail.service";
import { signJwt } from "../utils/jwt.util";

const userRepo = () => AppDataSource.getRepository(User);

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const signup = async (req: Request, res: Response) => {
    try {
    const { username, gmail, password, role } = req.body;
    if (!username || !gmail || !password) {
        return res.status(400).json({ message: "username, gmail and password required" });
    }

    const existing = await userRepo().findOneBy({ gmail });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const otp = generateOtp();

    const user = userRepo().create({
        username,
        gmail,
        password: hashed,
        role: role === "admin" ? "admin" : "user",
        otpCode: otp,
        isVerified: false,
    });

    await userRepo().save(user);

    await sendOtpMail(gmail, otp);

    res.status(201).json({ message: "User created. OTP sent to email." });
    } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
    }
};

export const verifyOtp = async (req: Request, res: Response) => {
    try {
    const { gmail, otp } = req.body;
    if (!gmail || !otp) return res.status(400).json({ message: "gmail and otp required" });

    const user = await userRepo().findOneBy({ gmail });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.isVerified) return res.status(400).json({ message: "Already verified" });

    if (user.otpCode !== otp) return res.status(400).json({ message: "Invalid OTP" });

    user.isVerified = true;
    user.otpCode = null;
    await userRepo().save(user);

    res.json({ message: "Email verified. You can sign in now." });
    } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
    }
};

export const signin = async (req: Request, res: Response) => {
    try {
    const { gmail, password } = req.body;
    if (!gmail || !password) return res.status(400).json({ message: "gmail and password required" });

    const user = await userRepo().findOneBy({ gmail });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isVerified) return res.status(403).json({ message: "Email not verified" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = signJwt({ id: user.id, role: user.role, username: user.username });

    res.json({ token, role: user.role });
    } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
    }
};
