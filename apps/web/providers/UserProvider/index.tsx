"use client";
import { getUser } from "@app/actions/user";
import Loading from "@app/components/Loading";
import useJwt from "@app/hooks/useJwt";
import { persistUser } from "@app/store/slices/user";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function UserProvider({ children }: any) {
  // Hooks
  const dispatch = useDispatch();
  const jwt = useJwt();

  // Queries
  const { data, isFetched } = useQuery({
    queryKey: ["user", "profile", jwt],
    queryFn: () => getUser(jwt as string),
    enabled: Boolean(jwt),
  });

  // Effects
  useEffect(() => {
    if (data) dispatch(persistUser(data));
    if (jwt && isFetched && !data) {
      alert("True");
      localStorage.clear();
      window.location.reload();
    }
  }, [data, jwt, isFetched]);

  return children;
}
