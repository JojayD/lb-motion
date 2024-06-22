// ./app/page.js
"use client";
import { useState, useEffect } from 'react';
import ClientComponent from "./components/clientcomponent";
import { fetchAccessToken } from "@humeai/voice";

export default function Page() {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const token = await fetchAccessToken({
          apiKey: process.env.NEXT_PUBLIC_HUME_API_KEY,
          secretKey: process.env.NEXT_PUBLIC_HUME_SECRET_KEY,
        });
        setAccessToken(token);
      } catch (error) {
        console.error("Failed to fetch access token:", error);
      }
    };

    getAccessToken();
  }, []);

  if (!accessToken) {
    return <div>Loading...</div>;
  }

  return <ClientComponent accessToken={accessToken} />;
}
