import { Request, Response } from "express";
import { AuthService } from "./AuthService";
import { UserRole } from "../entities/User";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async signup(req: Request, res: Response): Promise<void> {
    try {
      const { username, gmail, password, role } = req.body;
      const newUser = await this.authService.signup(
        username,
        gmail,
        password,
        role as UserRole
      );
      res.status(201).json({
        message: "User registered. Please check your email for OTP verification.",
        user: { id: newUser.id, gmail: newUser.gmail },
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async verifyOtp(req: Request, res: Response): Promise<void> {
    try {
      const { gmail, otp } = req.body;
      const verifiedUser = await this.authService.verifyOtp(gmail, otp);
      res.status(200).json({
        message: "Account verified successfully.",
        user: { id: verifiedUser.id, gmail: verifiedUser.gmail, isVerified: verifiedUser.isVerified },
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async signin(req: Request, res: Response): Promise<void> {
    try {
      const { gmail, password } = req.body;
      const token = await this.authService.signin(gmail, password);
      res.status(200).json({ message: "Signed in successfully.", token });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }
}