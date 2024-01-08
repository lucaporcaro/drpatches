import { useEffect, useState } from "react";

export default function useJwt() {
  // States
  const [jwt, setJwt] = useState<string | null>(null);
  // Effects
  useEffect(() => {
    if (!window) return;
    const jwtS = localStorage.getItem("SESSION_TOKEN");
    if (jwtS) setJwt(jwtS);
    return () => setJwt(null);
  }, []);
  return jwt;
}
