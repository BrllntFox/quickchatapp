import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type UserId, userIdSchema, users } from "@/lib/db/schema/users";
import { deleteUser } from "./mutations";

export const getUsers = async () => {
  const rows = await db.select().from(users);
  const u = rows
  return { users: u };
};

export const getUserById = async (id: UserId) => {
  const { id: userId } = userIdSchema.parse({ id });
  const [row] = await db.select().from(users).where(eq(users.id, userId));
  if (row === undefined) return {};
  const u = row;
  return { user: u };
};

/// create user in database by kinde session
export const getUserByKindeId = async(id: string) => {
  const duplicate= await db.select().from(users).where(eq(users.kindeId, id));
  for (const user of duplicate.slice(1)) {
    if (user.kindeId === id) {
      await deleteUser(user.id)
    }
  }
  const [row] = await db.select().from(users).where(eq(users.kindeId, id));
  if (row === undefined) return {status:"failed"};
  const u = row
  return {user:u}
}

