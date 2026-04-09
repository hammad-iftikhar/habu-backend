declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        name: string;
        email: string;
        createdAt: Date | null;
        updatedAt: Date | null;
      };
    }
  }
}

export {};
