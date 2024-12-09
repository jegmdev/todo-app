import React, { useState, useEffect } from 'react';
import './App.css'; // Puedes seguir usando un archivo CSS personalizado si lo necesitas

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [theme, setTheme] = useState('light'); // Tema: 'light' o 'dark'
  const [filter, setFilter] = useState('all'); // Filtro de tareas: 'all', 'completed', 'pending'

  // Cargar las tareas desde LocalStorage al inicio
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) setTasks(savedTasks);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // Guardar las tareas y el tema en LocalStorage cuando se actualicen
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('theme', theme);
  }, [tasks, theme]);

  // Función para agregar una nueva tarea
  const addTask = () => {
    if (newTask.trim() === '') return;
    const newTaskObj = { id: Date.now(), text: newTask, completed: false };
    setTasks([...tasks, newTaskObj]);
    setNewTask('');
  };

  // Función para marcar una tarea como completada
  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Función para eliminar una tarea
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Función para cambiar el tema (oscuro/claro)
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // Filtrar las tareas según el estado (todas, completadas, pendientes)
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true; // 'all' - Mostrar todas las tareas
  });

  return (
    <div className={`min-h-screen content-center ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} transition-colors duration-300`}>
      <div className="container mx-auto p-4">
        {/* Botón de cambio de tema */}
        <button
          className="mb-4 p-2 bg-blue-500 text-white rounded-md"
          onClick={toggleTheme}
        >
          Cambiar a {theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
        </button>

        {/* Título */}
        <h1 className={`text-3xl font-bold text-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          Lista de Tareas
        </h1>

        {/* Input para agregar nuevas tareas */}
        <div className="flex mb-4">
          <input
            type="text"
            className="p-2 flex-1 border border-gray-300 rounded-l-md"
            placeholder="Nueva tarea"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            className="p-2 bg-blue-500 text-white rounded-r-md"
            onClick={addTask}
          >
            Agregar
          </button>
        </div>

        {/* Filtros */}
        <div className="mb-4 text-center">
          <button
            className="mx-2 p-2 bg-gray-200 rounded-md"
            onClick={() => setFilter('all')}
          >
            Todas
          </button>
          <button
            className="mx-2 p-2 bg-gray-200 rounded-md"
            onClick={() => setFilter('completed')}
          >
            Completadas
          </button>
          <button
            className="mx-2 p-2 bg-gray-200 rounded-md"
            onClick={() => setFilter('pending')}
          >
            Pendientes
          </button>
        </div>

        {/* Lista de tareas */}
        <ul>
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className={`flex items-center justify-between p-3 mb-2 rounded-md ${
                task.completed
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                  className="mr-3"
                />
                <span className={task.completed ? 'line-through' : ''}>
                  {task.text}
                </span>
              </div>
              <button
                className="text-red-500"
                onClick={() => deleteTask(task.id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
