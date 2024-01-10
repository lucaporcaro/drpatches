"use client";

import { useMustLoggedIn } from "@app/hooks/useMustLoggedIn";
import React from "react";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Hooks
  useMustLoggedIn();
  return children;
}
