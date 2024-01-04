"use client";

import { getPrices } from "@app/actions/price";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function PriceProvider({
  children,
}: {
  children?: any;
}): React.ReactElement {
  // States
  const [loaded, setLoaded] = useState<boolean>(false);

  // Queries
  const { data: prices } = useQuery({
    queryKey: ["prices"],
    queryFn: () => getPrices(),
    enabled: loaded,
  });

  useEffect(() => {
    setLoaded(true);
    return () => setLoaded(false);
  }, []);

  useEffect(() => {
    if (window) localStorage.setItem("prices", JSON.stringify(prices));
  }, [prices]);

  return children;
}
