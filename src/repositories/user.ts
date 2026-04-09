import db from "../db/index.js";
import { usersTable } from "../db/schema/user.js";
import type { InferInsertModel } from "drizzle-orm";
import { eq } from "drizzle-orm";

class UserRepository {
  private db = db;

  async create(data: InferInsertModel<typeof usersTable>) {
    return this.db.insert(usersTable).values(data);
  }

  async findByEmail(email: string) {
    const users = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (users.length > 0) {
      return users[0];
    }

    return false;
  }

  async findById(id: number) {
    const users = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id));

    if (users.length > 0) {
      return users[0];
    }

    return null;
  }
}

export default new UserRepository();
