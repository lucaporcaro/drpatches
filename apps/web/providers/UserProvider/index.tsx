"use client";
import { getUser } from "@app/actions/user";
import { persistUser } from "@app/store/slices/user";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function UserProvider({ children }: any) {
  // Cookies
  const jwt = Cookies.get("jwt_token");

  // Hooks
  const dispatch = useDispatch();

  // Queries
  const { data } = useQuery({
    queryKey: ["user", "profile", jwt],
    queryFn: async () => await getUser(),
    enabled: Boolean(jwt),
    refetchInterval: 1000 * 60 * 5,
    refetchIntervalInBackground: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (data) dispatch(persistUser(data));
  }, [data]);

  return children;
}
