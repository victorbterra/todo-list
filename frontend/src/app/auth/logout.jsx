"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("token"); // Remove o token do armazenamento local
    router.push("/auth/login"); // Redireciona para a página de login
  }, []);

  return null;
}