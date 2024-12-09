import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]); // Lista de tareas
  const [newTask, setNewTask] = useState(''); // Nueva tarea a agregar
  const [filter, setFilter] = useState('all'); // Filtro de tareas (all, completed, pending)
  const [darkMode, setDarkMode] = useState(false); // Estado para el tema

  // Cargar tareas del localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  // Guardar tareas en localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Agregar tarea
  const addTask = () => {
    if (newTask.trim() === '') return;
    const newTaskObject = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };
    setTasks([...tasks, newTaskObject]);
    setNewTask('');
  };

  // Marcar tarea como completada
  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Eliminar tarea
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  // Filtrar tareas
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  // Cambiar entre tema claro y oscuro
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="app-container">
        <header>
          <h1>To-Do List</h1>
          <button onClick={toggleDarkMode}>
            {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
          </button>
        </header>

        <div className="task-input">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Agregar tarea"
          />
          <button onClick={addTask}>Agregar</button>
        </div>

        <div className="task-filter">
          <button onClick={() => setFilter('all')}>Todas</button>
          <button onClick={() => setFilter('completed')}>Completadas</button>
          <button onClick={() => setFilter('pending')}>Pendientes</button>
        </div>

        <ul className="task-list">
          {filteredTasks.map((task) => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
              />
              {task.text}
              <button onClick={() => deleteTask(task.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
