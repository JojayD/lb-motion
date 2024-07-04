"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSessionTimeout from "../../hooks/useSessionTimeout";

function UserChatsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useSessionTimeout(15 * 60 * 1000); // 15 minutes

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  return (
    <div>
      <h1>UserChats Page</h1>
    </div>
  );
}

export default UserChatsPage;
