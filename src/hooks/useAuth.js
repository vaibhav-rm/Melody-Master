// src/useAuth.js
import { useEffect, useState } from "react";
import { checkAuthStatus } from "../Helper/firebaseHelper";

const useAuth = () => {
  const [user, setUser ] = useState(null);

  useEffect(() => {
    const unsubscribe = checkAuthStatus((user) => {
      setUser (user);
    });

    return () => unsubscribe(); // Clean up the subscription
  }, []);

  return user;
};

export default useAuth;