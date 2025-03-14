'use client';
// frontend/src/app/page.jsx
import React, { useState } from 'react';
import Header from '@/components/header/header';
import Taskmodal from '@/components/taskmodal/taskModal';
import TaskList from '@/components/tasklist/tasklist';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (task) => {
    if (!task) {
      console.error('handleAddTask: task is null or undefined');
      return;
    }

    setTasks((prevTasks) => {
      if (!prevTasks) {
        console.error('handleAddTask: prevTasks is null or undefined');
        return [task];
      }

      return [...prevTasks, task];
    });

    setIsOpen(false);
  };

  return (
    <>
      <Header />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg absolute bottom-5 right-5 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
      <Taskmodal isOpen={isOpen}onClose={() => setIsOpen(false)} onSubmit={handleAddTask}
      />
      <TaskList />
    </>
  );
};

export default Home;