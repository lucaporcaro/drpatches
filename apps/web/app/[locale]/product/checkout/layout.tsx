"use client";

import { useMustLoggedIn } from "@app/hooks/useMustLoggedIn";
import React from "react";

export default function ProductLayout({ children }: any) {
  // Hooks
  useMustLoggedIn(true);
  return children;
}
