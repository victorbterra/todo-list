'use client';
import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

/**
 * Componente que lista todas as tarefas do usuario logado.
 *
 * Recebe o token de autenticação do usuario logado e faz uma requisição
 * para a API para obter todas as tarefas.
 *
 * Caso o token seja invalido, o usuario será redirecionado para a tela de login.
 *
 * @returns {React.ReactElement} Um componente que lista todas as tarefas do usuario logado.
 */
const tasklist = () => {
    const [tasks, setTasks] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/auth");
            return;
        }

        const fetchTasks = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/tasks", {
                    headers: {
                        "x-auth-token": token
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }

                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, [router]);
    //função para excluir as tarefas
    const handleDeleteTask = async (id) => {
        try {
          if (!id) {
            console.error("Erro: ID inválido ou não fornecido.");
            return;
          }
    
          const token = localStorage.getItem("token");
          if (!token) {
            console.warn("Usuário não autenticado. Redirecionando para login.");
            router.push("/");
            return;
          }
    
          const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
          });
    
          if (!response.ok) {
            console.error(`Erro ao excluir a tarefa. Status: ${response.status}`);
            throw new Error("Falha ao excluir a tarefa.");
          }
    
          // Atualiza a lista de tarefas sem a que foi excluída
          setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    
          console.log("Tarefa excluída com sucesso!");
        } catch (error) {
          console.error("Erro ao excluir a tarefa:", error);
        }
      };

    const taskList = tasks.length > 0 ? tasks.map(task => (
        <div key={task._id} className="flex justify-between items-center bg-sky-600 text-white p-3 mx-2 rounded">
            <p className="text-sm">{task.title}</p>
            <div className="flex gap-2">
                <button className="text-sm hover:text-green-500 cursor-pointer"><FaEdit /></button>
                <button className="text-sm hover:text-red-500 cursor-pointer"><FaRegTrashAlt onClick={() => handleDeleteTask(task._id)} /></button>
            </div>
        </div>
    )) : <p className="flex justify-center items-center h-full text-2xl font-semibold">Nenhuma tarefa cadastrada</p>;

    return (
        <div className="w-full flex flex-col items-center justify-between lg:max-w-3xl lg:mx-auto">
            <div className="w-full items-center py-2 px-3">
                <div className="flex justify-between items-center mb-3">
                    <p className="text-sm">criadas <span className="font-medium ml-2">{tasks.length}</span></p>
                    <p className="text-sm">Concluídas <span className="font-medium ml-2">0 </span>de {tasks.length}</p>
                </div>
            </div>
            <hr className="mx-4 mt-1 text-neutral-300" />
            <div className="h-[430px] flex flex-col w-full gap-3 overscroll-x-none overflow-y-auto">
                {taskList}
            </div>
        </div>
    );
}


export default tasklist;