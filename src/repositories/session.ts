import db from "../db/index.js";
import { sessionsTable } from "../db/schema/session.js";
import type { InferInsertModel } from "drizzle-orm";
import { eq } from "drizzle-orm";

class SessionRepository {
  private db = db;

  async create(data: InferInsertModel<typeof sessionsTable>) {
    return this.db.insert(sessionsTable).values(data);
  }

  async findByToken(token: string) {
    const sessions = await this.db
      .select()
      .from(sessionsTable)
      .where(eq(sessionsTable.token, token));

    if (sessions.length > 0) {
      return sessions[0];
    }

    return null;
  }
}

export default new SessionRepository();
