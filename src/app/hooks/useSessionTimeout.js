import { signOut } from "next-auth/react";
import { useEffect } from "react";

function useSessionTimeout(timeout) {
  useEffect(() => {
    const timer = setTimeout(() => {
      signOut();
    }, timeout);

    const resetTimeout = () => {
      clearTimeout(timer);
      setTimeout(() => {
        signOut();
      }, timeout);
    };

    window.addEventListener("mousemove", resetTimeout);
    window.addEventListener("keypress", resetTimeout);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimeout);
      window.removeEventListener("keypress", resetTimeout);
    };
  }, [timeout]);
}

export default useSessionTimeout;
