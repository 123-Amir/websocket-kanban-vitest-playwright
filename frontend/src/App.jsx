import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { io } from 'socket.io-client';
import KanbanColumn from './components/KanbanColumn';
import TaskForm from './components/TaskForm';
import './components/Kanban.css';

const socket = io('https://kanban-backend-vzr9.onrender.com');

function App() {
  const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });

  useEffect(() => {
    socket.on('sync:tasks', setTasks);
    socket.on('task:created', setTasks);
    socket.on('task:moved', setTasks);
    // Clean up
    return () => {
      socket.off('sync:tasks');
      socket.off('task:created');
      socket.off('task:moved');
    };
  }, []);

  const handleDropTask = (taskId, from, to) => {
    if (from !== to) socket.emit('task:move', { taskId, from, to });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ padding: 30 }}>
        <TaskForm socket={socket} />
        <div className="kanban-container">
          <KanbanColumn status="todo" tasks={tasks.todo} onDropTask={handleDropTask} />
          <KanbanColumn status="inProgress" tasks={tasks.inProgress} onDropTask={handleDropTask} />
          <KanbanColumn status="done" tasks={tasks.done} onDropTask={handleDropTask} />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
