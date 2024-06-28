import { useSession } from "next-auth/react";

interface AuthProps {
  loading: boolean;
  loggedIn: boolean;
  isAdmin: boolean;
}

const useAuth = (): AuthProps => {
  const session = useSession()
  console.log(session)
  return {
    loading: session.status === "loading",
    loggedIn: session.status === "authenticated",
    isAdmin: false,
  };
};

export default useAuth;
