import React from 'react';
import { useDrag } from 'react-dnd';

export default function Task({ task }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { id: task.id, from: task.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  return (
    <div ref={drag} className="task" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div>{task.title}</div>
    </div>
  );
}

