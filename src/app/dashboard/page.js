"use client";
import React, { useState, useEffect } from "react";
import ClientComponent from "../components/clientcomponent";
import { fetchAccessToken } from "@humeai/voice";
import LoadingSpinner from "../components/loadingSpinner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSessionTimeout from "../hooks/useSessionTimeout";

function DashboardPage() {
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  useSessionTimeout(15 * 60 * 1000); // 15 minutes

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    async function getSession() {
      try {
        const token = await fetchAccessToken({
          apiKey: process.env.NEXT_PUBLIC_HUME_API_KEY,
          secretKey: process.env.NEXT_PUBLIC_HUME_SECRET_KEY,
        });

        if (!token) {
          throw new Error("Failed to fetch access token.");
        }

        setAccessToken(token);
      } catch (err) {
        setError(err.message);
      }
    }

    getSession();
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!accessToken) return <LoadingSpinner />;

  return <ClientComponent accessToken={accessToken} />;
}

export default DashboardPage;
