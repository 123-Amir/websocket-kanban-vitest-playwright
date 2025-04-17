import React, { useState } from 'react';

export default function TaskForm({ socket }) {
  const [title, setTitle] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    socket.emit('task:create', { id: Date.now(), title, status: 'todo' });
    setTitle('');
  };
  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Task title" />
      <button type="submit">Add Task</button>
    </form>
  );
}
