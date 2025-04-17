const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000" }
});

let tasks = { todo: [], inProgress: [], done: [] };

io.on('connection', (socket) => {
  // Send all tasks to new client
  socket.emit('sync:tasks', tasks);

  // Create task
  socket.on('task:create', (task) => {
    tasks.todo.push(task);
    io.emit('task:created', tasks);
  });

  // Move task
  socket.on('task:move', ({ taskId, from, to }) => {
    const idx = tasks[from].findIndex(t => t.id === taskId);
    if (idx > -1) {
      const [task] = tasks[from].splice(idx, 1);
      task.status = to;
      tasks[to].push(task);
      io.emit('task:moved', tasks);
    }
  });
});

server.listen(4000, () => {
  console.log('Server listening on port 4000');
});
