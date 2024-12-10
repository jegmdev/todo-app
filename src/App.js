import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [theme, setTheme] = useState('light'); // Tema: 'light' o 'dark'
  const [filter, setFilter] = useState('all'); // Filtro de tareas: 'all', 'completed', 'pending'

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) setTasks(savedTasks);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('theme', theme);
  }, [tasks, theme]);

  const addTask = () => {
    if (newTask.trim() === '') return;
    const newTaskObj = { id: Date.now(), text: newTask, completed: false };
    setTasks([...tasks, newTaskObj]);
    setNewTask('');
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className={`app ${theme}`}>
      <div className="todo-container">
        <div className="header">
          <h1>TODO LIST</h1>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>

        <div className="task-input">
          <input
            type="text"
            placeholder="Search or add a task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={addTask}>+</button>
        </div>

        <div className="filters">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            ALL
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            COMPLETED
          </button>
          <button
            className={filter === 'pending' ? 'active' : ''}
            onClick={() => setFilter('pending')}
          >
            PENDING
          </button>
        </div>

        <ul className="task-list">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className={task.completed ? 'completed' : 'pending'}
            >
              <div>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                />
                <span>{task.text}</span>
              </div>
              <button onClick={() => deleteTask(task.id)}>❌</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
