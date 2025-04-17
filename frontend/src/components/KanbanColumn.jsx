import React from 'react';
import { useDrop } from 'react-dnd';
import Task from './Task';

export default function KanbanColumn({ status, tasks, onDropTask }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item) => onDropTask(item.id, item.from, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }));

  return (
    <div ref={drop} className="column" style={{ background: isOver ? '#e0e0e0' : undefined }}>
      <h3>{status.toUpperCase()}</h3>
      {tasks.map(task => <Task key={task.id} task={task} />)}
    </div>
  );
}
