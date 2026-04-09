import type { Request, Response } from "express";
import UserRepository from "../repositories/user.js";
import bcrypt from "bcrypt";

class UserController {
  async signup(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: "Email and password are required",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await UserRepository.create({
        name: "Jhon Doe",
        email,
        password: hashedPassword,
      });

      if (!user) {
        return res.status(400).json({
          message: "Failed to signup",
        });
      }

      return res.status(200).json({
        message: "Signup successfull",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: "Email and password are required",
        });
      }

      const user = await UserRepository.findByEmail(email);

      if (!user) {
        return res.status(400).json({
          message: "Invalid email or password",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({
          message: "Invalid email or password",
        });
      }

      return res.status(200).json({
        message: "Login successfull",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default new UserController();
