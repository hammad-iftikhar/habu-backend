import type { Request, Response, NextFunction } from "express";
import SessionRepository from "../repositories/session.js";
import UserRepository from "../repositories/user.js";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const session = await SessionRepository.findByToken(token);

    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (new Date() > session.expiresAt) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await UserRepository.findById(session.userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Attach user to request, excluding sensitive data
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
