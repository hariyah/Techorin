import { AppDataSource } from "../../ormconfig";
import { User, UserRole } from "../entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { Repository } from "typeorm";

interface JwtPayload {
  id: string;
  role: UserRole;
}

export class AuthService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private async sendOtpEmail(email: string, otp: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Ensure this is set in your .env
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP Verification for Your Account",
      html: `<p>Your OTP for account verification is: <strong>${otp}</strong></p>`,
    };

    await transporter.sendMail(mailOptions);
  }

  async signup(
    username: string,
    gmail: string,
    password_plain: string,
    role: UserRole = UserRole.USER
  ): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: { gmail } });
    if (existingUser) {
      throw new Error("User with this email already exists.");
    }

    const hashedPassword = await bcrypt.hash(password_plain, 10);
    const otpCode = this.generateOtp();

    const user = this.userRepository.create({
      username,
      gmail,
      password: hashedPassword,
      role,
      otpCode,
      isVerified: false,
    });

    await this.userRepository.save(user);
    await this.sendOtpEmail(gmail, otpCode);

    return user;
  }

  async verifyOtp(gmail: string, otp: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { gmail } });

    if (!user) {
      throw new Error("User not found.");
    }
    if (user.isVerified) {
      throw new Error("User already verified.");
    }
    if (user.otpCode !== otp) {
      throw new Error("Invalid OTP.");
    }

    user.isVerified = true;
    user.otpCode = null; // Clear OTP after successful verification
    await this.userRepository.save(user);

    return user;
  }

  async signin(gmail: string, password_plain: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { gmail } });

    if (!user || !(await bcrypt.compare(password_plain, user.password))) {
      throw new Error("Invalid credentials.");
    }
    if (!user.isVerified) {
      throw new Error("Account not verified. Please verify your OTP.");
    }

    const payload: JwtPayload = { id: user.id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    return token;
  }
}