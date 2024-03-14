import {
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { getUserByKindeId } from "../api/users/queries";
import { createUser } from "../api/users/mutations";

export type AuthSession = {
  session: {
    user: {
      id: string;
      name?: string;
      email?: string;
      picture?:string
    };
  } | null;
};

export type Session = {
 user:{
  id: string;
  userId: string;
  sessionId: string;
  role: string;
  message: string;
 } 
 }|null;

export const getUserAuth = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (user) {
    return {
      session: {
        user: {
          id: user.id,
          name: `${user.given_name} ${user.family_name}`,
          email: user.email,
          picture: user.picture
        },
      },
    } as AuthSession;
  } else {
    return { session: null };
  }
};

export const checkAuth = async () => {
   const { session } = await getUserAuth();
   if (session === null) redirect("/api/auth/login");
   const kindeId = session.user.id
   if (session && kindeId) {
    try {
      const {user} = await getUserByKindeId(kindeId);
      if (!user) {
        await createUser({
          kindeId: kindeId,
          name: session.user.name as string,
          email: session.user.email as string,
          picture: session.user.picture as string
        })
        return null
      }
    } catch (err) {console.log(err)}
   }
};
