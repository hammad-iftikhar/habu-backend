import db from "../db/index.js";
import { sessionsTable } from "../db/schema/session.js";
import type { InferInsertModel } from "drizzle-orm";

class SessionRepository {
  private db = db;

  async create(data: InferInsertModel<typeof sessionsTable>) {
    return this.db.insert(sessionsTable).values(data);
  }
}

export default new SessionRepository();
