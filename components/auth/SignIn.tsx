import { getUserAuth } from "@/lib/auth/utils";
import { cn } from "@/lib/utils";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server";

export default async function SignIn({type}:{type?:string}) {
  const isHome = type === "home"
  const { session } = await getUserAuth();
  if (session) {
    return (
      <div>
        <LogoutLink className="hover:underline">Log out</LogoutLink>
      </div>
    );
  } else {
    return (
      <div className="w-full space-y-2 pt-4 max-w-[120px]">
        <LoginLink className="text-center block hover:bg-neutral-900 bg-neutral-800 text-neutral-50 px-4 py-2 rounded-lg h-[40px] items-center">
          Sign in
        </LoginLink>
        <RegisterLink className={cn("text-center block hover:bg-neutral-200 bg-neutral-100 text-neutral-800 px-4 py-2 h-[40px] rounded-lg ",isHome&&"hidden")}>
          Sign up
        </RegisterLink>
      </div>
    );
  }
};

