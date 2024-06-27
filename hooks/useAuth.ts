import * as React from "react";

interface AuthProps {
  loading: boolean;
  loggedIn: boolean;
  isAdmin: boolean;
}

const useAuth = (): AuthProps => {
  return {
    loading: false,
    loggedIn: false,
    isAdmin: false,
  };
};

export default useAuth;
