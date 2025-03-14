'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';


export default function Header() {
  //mensagem de boas vindas com o nome de usuário
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Pega o nome do usuário do localStorage ao carregar o componente
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  // Hook para navegação
  const router = useRouter();
  // Função de logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove o token do localStorage
    router.push("/auth"); // Redireciona para a página de login
  };

  return (
    <>
      <header className="bg-sky-700 text-white h-min-screen w-min-screen py-8 px-4 flex items-center justify-between">
        <div className="w-full flex items-center justify-between lg:max-w-3xl mx-auto">
          <div className="">
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          <div>
            <div className="flex flex-row gap-4 items-center">
              <button
                className="cursor-pointer font-semibold text-white px-3 py-1 hover:bg-sky-500 rounded duration-150"
                onClick={handleLogout}
                >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="lg:max-w-3xl mx-auto my-3">
        <h1 className="text-xl font-medium px-3">Seja bem vindo <span className="font-bold">{userName}</span></h1>
      </div>
    </>
  );
}
