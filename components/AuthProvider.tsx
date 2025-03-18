"use client"; // Ensures this runs only on the client side

import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
}
