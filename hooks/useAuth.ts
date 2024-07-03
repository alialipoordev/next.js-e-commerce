import { SessionUserProfile } from "@/types";
import { useSession } from "next-auth/react";

interface AuthProps {
  loading: boolean;
  loggedIn: boolean;
  isAdmin: boolean;
  profile?: SessionUserProfile | null;
}

const useAuth = (): AuthProps => {
  const { status, data } = useSession();

  return {
    loading: status === "loading",
    loggedIn: status === "authenticated",
    isAdmin: data?.user.role == "admin",
    profile: data?.user,
  };
};

export default useAuth;
